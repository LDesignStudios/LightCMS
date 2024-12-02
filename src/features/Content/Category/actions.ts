'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateCategoryInput } from "./types";

export async function getCategories() {
    return await prisma.category.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
}

export async function createCategory(data: CreateCategoryInput) {
    const category = await prisma.category.create({
        data: {
            name: data.name,
            slug: data.slug ?? '',
            description: data.description ?? '',
        }
    });

    revalidatePath('/admin/posts');
    return category;
}

export async function deleteCategory(id: string) {
    await prisma.category.delete({
        where: { id }
    });

    revalidatePath('/admin/posts');
}

export async function updateCategory(id: string, data: CreateCategoryInput) {
    const category = await prisma.category.update({
        where: { id },
        data: {
            name: data.name,
            slug: data.slug ?? '',
            description: data.description ?? '',
        }
    });

    revalidatePath('/admin/posts');
    return category;
} 