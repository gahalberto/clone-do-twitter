import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { addTweetSchema } from "../schemas/add-tweet";
import { checkIfTweetIsLikedByUser, createTweet, findAnswerFromTweet, findTweet, likeTweet, unlikeTweet } from "../services/tweet";
import { addHashtag } from "../services/trend";

export const addTweet = async (req: ExtendedRequest, res: Response) => {
    // validar os dados enviados
    const safeData = addTweetSchema.safeParse(req.body);
    if (!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors })
        return;
    }

    // verifica se é resposta

    if(safeData.data.answer){
        const hasAnswerTweet = await findTweet(parseInt(safeData.data.answer));
        if(!hasAnswerTweet){
            res.json({ error: 'Tweet Original Inexistente' })
            return;
        }
    }
    // cria o tweet

    const newTweet = await createTweet(
        req.userSlug as string,
        safeData.data.body,
        safeData.data.answer ? parseInt(safeData.data.answer) : 0
    )

    // adicionar o hashtag ao trend

    const hashtags = safeData.data.body.match(/#[a-zA-A-Z0-9_]+/g)
    if(hashtags){
        for(let hashtag of hashtags){
            if(hashtag.length >= 2) {
                await addHashtag(hashtag);
            }
        }
    }
    res.json({ tweet: newTweet })
}

export const getTweet = async (req: ExtendedRequest, res: Response) => {
    const { id } = req.params;

    const tweet = await findTweet(parseInt(id));
    if(!tweet) {
        res.json({ error: 'Tweet inexistente' });
        return;
    }

    res.json({ tweet })
    return;
}

export const getAnwers = async (req: ExtendedRequest, res: Response) => {
    const { id } = req.params;

    const answers = await findAnswerFromTweet(parseInt(id));
    if(!answers) {
        res.json({ error: 'Respostas inexistente' });
        return;
    }

    res.json({ answers })
    return;
}

export const likeToggle = async (req: ExtendedRequest, res: Response) => {
    const { id } = req.params;
    const liked = await checkIfTweetIsLikedByUser(
        req.userSlug as string,
        parseInt(id)
    );

    if(liked){
        // unlike
        unlikeTweet(
            req.userSlug as string,
            parseInt(id)
        )
    } else {
        likeTweet(
            req.userSlug as string,
            parseInt(id)
        )
    }

    res.json({})
}