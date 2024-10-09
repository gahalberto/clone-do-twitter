import { z } from "zod";

export const updateUserSchema = z.object({
    name: z.string().min(2, 'Precisa ter 2 ou mais caracteres.').optional(),
    bio: z.string().optional(),
    link: z.string().url('Precisa de uma URL valida').optional(),
});