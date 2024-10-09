import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { feedSchema } from "../schemas/feed";
import { getFollowing } from "../services/user";
import { getFeedBySlug } from "../services/feed";

export const getFeed = async (req: ExtendedRequest, res: Response) => {
    const safeData = feedSchema.safeParse(req.body);
    if (!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors })
        return;
    }

    let perPage = 2;
    let currentPage = safeData.data.page ?? 0;

    const following = await getFollowing(req.userSlug as string)

    const feed = await getFeedBySlug(following, perPage, currentPage);

    res.json({ feed, perPage, currentPage })
}