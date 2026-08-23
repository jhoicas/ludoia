import { z } from 'zod';

export const ChatRequestSchema = z.object({
  message: z.string().min(1).max(500),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;
