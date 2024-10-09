import { Prisma } from "@prisma/client"
import { prisma } from "../utils/prisma"
import { getPublicUrl } from "../utils/url"

export const findUserByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({ where: { email } })

    if (user) {
        return {
            ...user,
            avatar: getPublicUrl(user.avatar),
            cover: getPublicUrl(user.cover)
        }
    }

    return null;
}

export const findUserBySlug = async (slug: string) => {
    const user = await prisma.user.findFirst({
        select: {
            avatar: true,
            cover: true,
            name: true,
            email: true,
            slug: true,
            bio: true,
            link: true
        },
        where: { slug }
    });

    if (user) return user;

    return null;
}

export const createUser = async (data: Prisma.UserCreateInput) => {
    const newUser = await prisma.user.create({
        data
    });
    return {
        ...newUser,
        avatar: getPublicUrl(newUser.avatar),
        cover: getPublicUrl(newUser.cover)
    }
}

export const checkIfFollows = async (user1Slug: string, user2Slug: string) => {
    const follows = await prisma.follow.findFirst({
        where: {
            user1Slug,
            user2Slug
        }
    })

    return follows ? true : false;
}

export const follow = async (user1Slug: string, user2Slug: string) => {
    if (user1Slug === user2Slug) {
        throw new Error('Você não pode seguir a si mesmo');
    } else {
        await prisma.follow.create({
            data: { user1Slug, user2Slug }
        });
        return true;
    }
}

export const unfollow = async (user1Slug: string, user2Slug: string) => {
    await prisma.follow.deleteMany({
        where: { user1Slug, user2Slug }
    });
}

export const updateUserInfo = async (slug: string, data: Prisma.UserUpdateInput) => {
    return await prisma.user.update({
        data,
        where: { slug }
    });

}

export const getFollowing = async (slug: string) => {
    const following = [];
    const reqFollow = await prisma.follow.findMany({
        where: { user1Slug: slug },
        select: {
            user2Slug: true
        }
    });

    for (let reqItem of reqFollow) {
        following.push(reqItem.user2Slug);
    }

    return following;
}

export const notFollowing  = async(slug: string) => {
    return 
}

export const getAllUsers = async () => {
    return await prisma.user.findMany({})
}