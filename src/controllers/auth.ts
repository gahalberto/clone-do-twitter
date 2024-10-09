import { RequestHandler } from "express";
import { signupSchema } from "../schemas/signup";
import { createUser, findUserByEmail, findUserBySlug } from "../services/user";
import slug from "slug";
import { compare, hash } from "bcrypt-ts";
import { createJWT } from "../utils/jwt";
import { signinSchema } from "../schemas/signin";

export const signup: RequestHandler = async (req, res) => {
    const safeData = signupSchema.safeParse(req.body);
    if (!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors })
        return;
    }

    // verifica se user já existe

    const hasEmail = await findUserByEmail(safeData.data.email);
    if (hasEmail) {
        res.json({
            error: 'E-mail já  existe'
        });
        return;
    }

    // verifica o slug 
    let genSlug = true;
    let userSlug = slug(safeData.data.name);

    while (genSlug) {
        const hasSlug = await findUserBySlug(userSlug);
        if (hasSlug) {
            let slugSuffix = Math.floor(Math.random() * 9999999).toString();
            userSlug = slug(safeData.data.name + slugSuffix);
        } else {
            genSlug = false;
        }
    }

    // Gerar hash de senha

    const hashPassword = await hash(safeData.data.password, 10);

    // Criar o usuário

    const newUser = await createUser({
        slug: userSlug,
        name: safeData.data.name,
        email: safeData.data.email,
        password: hashPassword
    })

    const token = createJWT(userSlug);

    res.status(201).json({
        token,
        user: {
            name: newUser.name,
            slug: newUser.slug,
            avatar: newUser.avatar
        }
    })
}

export const signin: RequestHandler = async (req, res) => {
    const safeData = signinSchema.safeParse(req.body);
    if(!safeData.success){
        res.json({ error: safeData.error.flatten().fieldErrors })
        return;
    }

    const user = await findUserByEmail(safeData.data?.email);
    if(!user) {
        res.status(401).json({ error: 'Acesso negado!' });
        return;
    } 
    
    const verifyPass = await compare(safeData.data.password, user.password);
    if(!verifyPass){
        res.status(401).json({ error: 'Acesso negado!' });
        return;
    }

    const token = createJWT(user.slug);

    res.json({
        token,
        user: {
            name: user.name,
            slug: user.slug,
            avatar: user.avatar
        }
    })
}