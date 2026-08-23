/**
 * @jest-environment node
 */
import { POST } from '@/app/api/quote/route';
import { QuoteRequestSchema } from '@/app/api/quote/schema';

describe('Quote API Schema', () => {
  it('should validate correct input', () => {
    const valid = {
      email: 'test@example.com',
      hours: 100,
      model: 'saas',
      currency: 'USD'
    };
    const result = QuoteRequestSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('should reject invalid emails', () => {
    const invalid = {
      email: 'not-an-email',
      hours: 100,
      model: 'saas',
      currency: 'USD'
    };
    const result = QuoteRequestSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should reject hours out of bounds', () => {
    const result = QuoteRequestSchema.safeParse({ email: 'a@b.com', hours: 10, model: 'saas', currency: 'USD' });
    expect(result.success).toBe(false); // min 40
  });
  
  it('should reject dangerous characters in email', () => {
    const result = QuoteRequestSchema.safeParse({ email: 'test<script>@example.com', hours: 100, model: 'saas', currency: 'USD' });
    expect(result.success).toBe(false);
  });
});

describe('Quote API Endpoint', () => {
  let mockIpCounter = 0;
  it('should return 200 on success', async () => {
    mockIpCounter++;
    const req = {
      headers: { get: () => 'ip-quote-' + mockIpCounter },
      json: async () => ({ email: 'test@example.com', hours: 100, model: 'saas', currency: 'USD' })
    } as any;

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });
});
