/**
 * @jest-environment node
 */
import { POST } from '@/app/api/quote/route';
import { QuoteRequestSchema } from '@/app/api/quote/schema';

jest.mock('@anthropic-ai/sdk', () => {
  return jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({
        content: [{ type: 'text', text: '{"reasoning": "Reasoning text", "architecture": "Tech Stack", "estimatedPriceUSD": 12000, "estimatedPriceCOP": 48000000, "estimatedTimeWeeks": 8, "projectedDate": "2026-11-01", "businessModels": {"saas": "SaaS model", "fullOwnership": "Full ownership"}, "disclaimer": "Disclaimer"}' }]
      })
    }
  }));
});

describe('Quote API Schema (AI Textarea)', () => {
  it('should validate correct input', () => {
    const valid = {
      projectDescription: 'Necesito un CRM avanzado para gestión hospitalaria.'
    };
    const result = QuoteRequestSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('should reject short descriptions', () => {
    const invalid = {
      projectDescription: 'CRM'
    };
    const result = QuoteRequestSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should sanitize HTML from description', () => {
    const malicious = {
      projectDescription: 'Necesito un CRM <script>alert(1)</script> muy bueno.'
    };
    const result = QuoteRequestSchema.safeParse(malicious);
    expect(result.success).toBe(true);
    expect(result.data?.projectDescription).toBe('Necesito un CRM alert(1) muy bueno.');
  });
});

describe('Quote API Endpoint', () => {
  let mockIpCounter = 0;
  it('should return 200 and a dummy AI estimate when key is not present or mocked', async () => {
    mockIpCounter++;
    const req = {
      headers: { get: () => 'ip-quote-' + mockIpCounter },
      json: async () => ({ projectDescription: 'Quiero una aplicación tipo Uber pero para drones de entrega en la ciudad.' })
    } as any;

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.estimate).toHaveProperty('estimatedPriceUSD');
  });
});
