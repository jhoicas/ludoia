/**
 * @jest-environment node
 */
import { POST } from '@/app/api/quote/route';
import { QuoteRequestSchema } from '@/app/api/quote/schema';

jest.mock('@anthropic-ai/sdk', () => {
  return jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({
        content: [{ type: 'text', text: '{"estimatedUsd": "$10,000", "complexity": "Alta"}' }]
      })
    }
  }));
});

describe('Quote API Schema (AI Textarea)', () => {
  it('should validate correct input', () => {
    const valid = {
      email: 'test@example.com',
      projectDescription: 'Necesito un CRM avanzado para gestión hospitalaria.'
    };
    const result = QuoteRequestSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('should reject short descriptions', () => {
    const invalid = {
      email: 'test@example.com',
      projectDescription: 'CRM'
    };
    const result = QuoteRequestSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should sanitize HTML from description', () => {
    const malicious = {
      email: 'test@example.com',
      projectDescription: 'Necesito un CRM <script>alert(1)</script> muy bueno.'
    };
    const result = QuoteRequestSchema.safeParse(malicious);
    expect(result.success).toBe(true);
    expect(result.data?.projectDescription).toBe('Necesito un CRM alert(1) muy bueno.');
  });
  
  it('should reject dangerous characters in email', () => {
    const result = QuoteRequestSchema.safeParse({ email: 'test<script>@example.com', projectDescription: 'Largo y valido' });
    expect(result.success).toBe(false);
  });
});

describe('Quote API Endpoint', () => {
  let mockIpCounter = 0;
  it('should return 200 and a dummy AI estimate when key is not present or mocked', async () => {
    mockIpCounter++;
    const req = {
      headers: { get: () => 'ip-quote-' + mockIpCounter },
      json: async () => ({ email: 'test@example.com', projectDescription: 'Quiero una aplicación tipo Uber pero para drones de entrega en la ciudad.' })
    } as any;

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.estimate).toHaveProperty('estimatedUsd');
    expect(json.estimate).toHaveProperty('complexity');
  });
});
