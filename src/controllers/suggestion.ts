import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { getAllUsers, getFollowing } from "../services/user";

export const getSuggestions = async (req:ExtendedRequest, res: Response) => {
    const users = await getAllUsers();
    const following = await getFollowing(req.userSlug as string);

        // Filtra os usuários que não estão na lista de "following"
        const notFollowing = users.filter(user => 
            !following.includes(user.slug) // Verifica se o `slug` do usuário não está na lista de `following`
        );
        res.status(200).json({ suggestions: notFollowing });
}