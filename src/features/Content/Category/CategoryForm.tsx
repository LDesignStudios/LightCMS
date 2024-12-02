'use client';

import { useState } from 'react';
import { CreateCategoryInput } from './types';
import { createCategory, updateCategory } from './actions';
import { Category } from './types';

interface CategoryFormProps {
    onSuccess?: () => void;
    initialData?: Category;
}

export default function CategoryForm({ onSuccess, initialData }: CategoryFormProps) {
    const [formData, setFormData] = useState<CreateCategoryInput>({
        name: initialData?.name || '',
        slug: initialData?.slug || '',
        description: initialData?.description || '',
    });

    const [errors, setErrors] = useState<{ name?: string; slug?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors: { name?: string; slug?: string } = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.slug) newErrors.slug = 'Slug is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            if (initialData) {
                await updateCategory(initialData.id, formData);
            } else {
                await createCategory(formData);
            }
            onSuccess?.();
        } catch (error) {
            console.error('Failed to save category:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.slug && (
                    <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {initialData ? 'Update Category' : 'Create Category'}
                </button>
            </div>
        </form>
    );
} 