import { prisma } from "../utils/prisma"
import { getPublicUrl } from "../utils/url";

export const findTweet = async (id: number) => {
    const tweet = await prisma.tweet.findFirst({
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
        where: {
            id
        }
    });

    if(tweet){
        tweet.user.avatar = getPublicUrl(tweet.user.avatar);
        return tweet;
    }

    return null;
}

export const findAnswerFromTweet = async (id: number) => {
    const tweets = await prisma.tweet.findMany({
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
        where: {
            answerOf: id
        }
    });

    for(let tweetIndex in tweets){
        tweets[tweetIndex].user.avatar = getPublicUrl(tweets[tweetIndex].user.avatar);
    }
    
    return tweets;
}

export const createTweet = async (slug: string, body: string, answer?: number) => {
    const newTweet = await prisma.tweet.create({
        data: {
            body,
            userSlug: slug,
            answerOf: answer ?? 0
        }
    })

    return newTweet;
}

export const checkIfTweetIsLikedByUser = async (slug: string, id: number) => {
    const isLiked = await prisma.tweetLike.findFirst({
        where:{
            userSlug: slug,
            tweetId: id
        }
    });

    return isLiked ? true : false;
}

export const unlikeTweet = async (slug: string, id: number) => {
    await prisma.tweetLike.deleteMany({
        where: {
            userSlug: slug,
            tweetId: id
        }
    })
}


export const likeTweet = async (slug: string, id: number) => {
    await prisma.tweetLike.create({
        data: {
            userSlug: slug,
            tweetId: id
        }
    })
}

export const getUserFollowCount = async (slug: string) => {
    const count = await prisma.follow.count({
        where: { user1Slug: slug }
    });

    return count;
}

export const getUserFollowersCount = async (slug: string) => {
    const count = await prisma.follow.count({
        where: { user2Slug: slug }
    });

    return count;
}

export const getUserTweetCount = async (slug: string) => {
    const count = await prisma.tweet.count({
        where: { userSlug: slug }
    });

    return count;
}

export const findTweetsByUser = async (slug: string, currentPage: number, perPage: number) => {
    const tweets = await prisma.tweet.findMany({
        include: {
            likes: {
                select: {
                    userSlug: true
                }
            }
        },
        where: { userSlug: slug, answerOf: 0 },
        orderBy: { createdAt: 'desc' },
        skip: currentPage * perPage,
        take: perPage
    });

    return tweets;
}

export const findTweetsBySearch = async (search: string, currentPage: number, perPage: number) => {
    const tweets = await prisma.tweet.findMany({
        where: {
            body: {
                contains: search,
                mode: 'insensitive'
            }
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
        skip: currentPage * perPage,
        take: perPage
    });


    for(let tweetIndex in tweets){
        tweets[tweetIndex].user.avatar = getPublicUrl(tweets[tweetIndex].user.avatar);
    }

    return tweets;
}