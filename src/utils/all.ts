import { prisma } from "@/lib/prisma";

export function getAllUsersNumber() {
  return prisma.user.count();
}

export function getAllRolesNumber() {
  return prisma.role.count();
}

export function getAllPermissionsNumber() {
  return prisma.permission.count();
}

export function getAllUserPostsNumber(userId: number) {
  return prisma.post.count({
    where: {
      authorId: userId.toString()
    }
  });
}

export function getAllUserPublishedPostsNumber(userId: string) {
  return prisma.post.count({
    where: {
      authorId: userId.toString(),
      published: true
    }
  });
}

export function getAllUserDraftPostsNumber(userId: string) {
  return prisma.post.count({
    where: {
      authorId: userId.toString(),
      published: false
    }
  });
}

export function getAllUserLikesNumber(userId: string) {
  return prisma.like.count({
    where: {
      userId: userId
    }
  });
}

export function getAllUserCommentsNumber(userId: string) {
  return prisma.comment.count({
    where: {
      authorId: userId
    }
  });
}

export async function getAllUserCategoriesNumber() {
  return prisma.category.count();
}