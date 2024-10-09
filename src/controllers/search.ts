import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { searchSchema } from "../schemas/search";
import { findTweetsBySearch } from "../services/tweet";

export const searchTweed = async (req: ExtendedRequest, res: Response) => {
    const safeData = searchSchema.safeParse(req.query);
    if (!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors })
        return;
    }

    let perPage = 2;
    let currentPage = safeData.data.page ?? 0;

    const tweets = await findTweetsBySearch(safeData.data.q, currentPage, perPage )
    res.json({ tweets, currentPage, perPage });
    return;
}