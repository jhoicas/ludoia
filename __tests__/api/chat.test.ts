import { z } from 'zod';
import { POST } from '@/app/api/chat/route';
import { ChatRequestSchema } from '@/app/api/chat/schema';

// Mock de next/server para evitar problemas con Request en Jest
jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: jest.fn((body, init) => {
        return {
          json: async () => body,
          status: init?.status || 200,
        };
      }),
    },
  };
});

// Mock de Anthropic para evitar llamadas reales en el test
jest.mock('@anthropic-ai/sdk', () => {
  return jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({
        content: [{ type: 'text', text: '{"action":"redirect","url":"https://wa.me/573225525998"}' }]
      })
    }
  }));
});

describe('Chat API Schema', () => {
  it('should validate correct input', () => {
    const result = ChatRequestSchema.safeParse({ message: 'Hola' });
    expect(result.success).toBe(true);
  });

  it('should reject malformed input (empty message)', () => {
    const result = ChatRequestSchema.safeParse({ message: '' });
    expect(result.success).toBe(false);
  });

  it('should reject malformed input (too long message)', () => {
    const result = ChatRequestSchema.safeParse({ message: 'a'.repeat(501) });
    expect(result.success).toBe(false);
  });

  it('should reject malicious missing fields', () => {
    const result = ChatRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe('Chat API Endpoint Integration', () => {
  it('should return redirect command when user asks to talk to a human', async () => {
    // Usar un objeto simple en lugar de new Request()
    const req = {
      json: async () => ({ message: 'Quiero hablar con un asesor' })
    } as any;

    const response = await POST(req);
    const json = await response.json();
    
    expect(json).toEqual({
      action: 'redirect',
      url: 'https://wa.me/573225525998'
    });
  });
});
