"use client"

import CategoryForm from "@/features/Content/Category/CategoryForm";

export default function NewCategoryPage() {
    const handleSuccess = () => {
        // Redirect or perform any action on success
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add New Category</h1>
            <CategoryForm onSuccess={handleSuccess} />
        </div>
    );
}