import { getUser } from "@/utils/getUser";

export async function getUsersPostsCount () {
    const user = await getUser();

    return user.posts.length
}