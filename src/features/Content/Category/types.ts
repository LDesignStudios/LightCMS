export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCategoryInput {
    name: string;
    slug: string;
    description?: string | undefined;
} 