import { z } from "zod";

export const signupSchema = z.object({
    name: z.string({
        message: 'O nome é obrigatório'
    }).min(2, 'Precisa no mínimo 2 letras'),
    email: z.string({
        message: 'O E-mail é obrigatório'
    }).email('E-mail inválido'),
    password: z.string({ message: 'Senha é obrigatória' }).min(4, 'Precisa ter 4 ou mais caracteres')
})