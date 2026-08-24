import { z } from 'zod';

const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

export const QuoteRequestSchema = z.object({
  projectDescription: z.string().min(10, "Descripción muy corta").max(2000, "Descripción muy larga"),
}).transform((data) => ({
  ...data,
  projectDescription: stripHtml(data.projectDescription)
}));

export type QuoteRequest = z.infer<typeof QuoteRequestSchema>;
