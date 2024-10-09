import { prisma } from "../utils/prisma"
import { getPublicUrl } from "../utils/url";

export const getFeedBySlug = async (following: string[], perPage: number, currentPage: number) => {
    const tweets = await prisma.tweet.findMany({
        where: {
            userSlug: { in: following },
            answerOf: 0
        }, 
        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                    slug: true
                }
            },
            likes: {
                select: {
                    userSlug: true
                }
            }
        },
        orderBy: { createdAt: 'desc' },
        skip: currentPage * perPage
    });

    for(let tweetIndex in tweets){
        tweets[tweetIndex].user.avatar = getPublicUrl(tweets[tweetIndex].user.avatar);
    }

    return tweets;
}