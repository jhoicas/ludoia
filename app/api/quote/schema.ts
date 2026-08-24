import { z } from 'zod';

const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

export const QuoteRequestSchema = z.object({
  email: z.string().email("Debe ser un email válido").max(100),
  projectDescription: z.string().min(10, "Descripción muy corta").max(2000, "Descripción muy larga"),
}).transform((data) => ({
  ...data,
  email: stripHtml(data.email),
  projectDescription: stripHtml(data.projectDescription)
})).refine((data) => !/[<>{}\\]/.test(data.email), {
  message: "Caracteres no permitidos en el email",
  path: ["email"]
});

export type QuoteRequest = z.infer<typeof QuoteRequestSchema>;
