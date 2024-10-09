import { z } from "zod";

export const addTweetSchema = z.object({
    body: z.string({ message: 'Precisa enviar um corpo de mensagem' }),
    answer: z.string().optional() 
})