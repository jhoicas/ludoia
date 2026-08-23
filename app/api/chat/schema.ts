import { z } from 'zod';

// Función básica para eliminar tags HTML
const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

export const ChatRequestSchema = z.object({
  message: z.string()
    .min(1, "El mensaje no puede estar vacío")
    .max(500, "El mensaje es demasiado largo")
    .transform((val) => stripHtml(val)) // Sanea HTML
    .refine((val) => !/[<>{}\\]/.test(val), {
      message: "Caracteres no permitidos",
    }),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;
