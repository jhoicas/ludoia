import { z } from 'zod';

const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

export const QuoteRequestSchema = z.object({
  email: z.string().email("Debe ser un email válido").max(100),
  hours: z.number().min(40).max(1000),
  model: z.enum(["saas", "source"]),
  currency: z.enum(["USD", "COP"]),
}).transform((data) => ({
  ...data,
  email: stripHtml(data.email)
})).refine((data) => !/[<>{}\\]/.test(data.email), {
  message: "Caracteres no permitidos en el email",
  path: ["email"]
});

export type QuoteRequest = z.infer<typeof QuoteRequestSchema>;
