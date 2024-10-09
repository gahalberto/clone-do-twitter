import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { checkIfFollows, findUserBySlug, follow, unfollow, updateUserInfo } from "../services/user";
import { findTweetsByUser, getUserFollowCount, getUserFollowersCount, getUserTweetCount } from "../services/tweet";
import { userTweetsSchema } from "../schemas/user-tweets";
import { updateUserSchema } from "../schemas/update-user";

export const getUser = async (req: ExtendedRequest, res: Response) => {
    const { slug } = req.params;

    const user = await findUserBySlug(slug);

    if(!user){
        res.json({ error: 'Usuário inexistente' });
        return;
    }

    const followingCount = await getUserFollowCount(slug);
    const followersCount = await getUserFollowersCount(slug);
    const tweetCount = await getUserTweetCount(slug);


    res.json({ user, followingCount, followersCount, tweetCount});
}

export const getUserTweet = async (req: ExtendedRequest, res: Response) => {
    const { slug } = req.params;
    const safeData = userTweetsSchema.safeParse(req.query);
    if (!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors })
        return;
    }

    let perPage = 2;
    let currentPage = safeData.data.page ?? 0;

    const tweets = await findTweetsByUser(
        slug,
        currentPage,
        perPage
    )

    res.json({ tweets, page: currentPage })
}

export const followToggle = async (req: ExtendedRequest, res: Response) => {
    const { slug } = req.params;

    const me = req.userSlug as string;

    const hasUserToBeFollowed = await findUserBySlug(slug);
    if(!hasUserToBeFollowed){
        res.json({ error: 'Usuário inexistente' });
        return;
    }

    const follows = await checkIfFollows(me, slug);
    if(!follows){
        await follow(me, slug);
        res.json({ following: true });
        return;
    } else {
        await unfollow(me, slug);
        res.json({ following: false });
        return;
    }

     res.json({});
}

export const updateUser = async (req: ExtendedRequest, res: Response) => {
    const safeData = updateUserSchema.safeParse(req.body);
    if (!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors })
        return;
    }
    await updateUserInfo(
        req.userSlug as string,
        safeData.data
    )

    res.json({ message: 'User Info Updated Sucessfully'});
}