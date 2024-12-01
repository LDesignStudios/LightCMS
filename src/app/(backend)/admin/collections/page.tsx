import React from 'react';
import TableView from '@/features/Content/Collections/TableView';
import CollectionsSidebar from '@/features/Content/Collections/CollectionsSidebar';

// Import types from types.ts
import { ProductTable, UserTable } from '@/features/Content/Collections/types';

// Sample product data (with more columns and fewer rows)
const productData: ProductTable[] = [
    {
        id: 1,
        name: 'Product A',
        price: 100,
        category: 'Electronics',
        stock: 50,
        rating: 4.5,
        description: 'A great product.',
        sku: 'A123',
        manufacturer: 'Company A',
        weight: 1.5,
        color: 'Black',
        dimensions: '10x5x5',
    },
    {
        id: 2,
        name: 'Product B',
        price: 150,
        category: 'Home Appliance',
        stock: 30,
        rating: 4.7,
        description: 'Another great product.',
        sku: 'B456',
        manufacturer: 'Company B',
        weight: 2.0,
        color: 'White',
        dimensions: '12x6x6',
    },
    {
        id: 3,
        name: 'Product C',
        price: 120,
        category: 'Furniture',
        stock: 20,
        rating: 4.2,
        description: 'A comfortable chair.',
        sku: 'C789',
        manufacturer: 'Company C',
        weight: 3.5,
        color: 'Brown',
        dimensions: '15x10x10',
    },
];

// Sample user data (with fewer columns and more rows)
const userData: UserTable[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', status: 'Active' },
    { id: 2, name: 'Bob', email: 'bob@example.com', status: 'Inactive' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', status: 'Active' },
    { id: 4, name: 'David', email: 'david@example.com', status: 'Active' },
    { id: 5, name: 'Eve', email: 'eve@example.com', status: 'Inactive' },
    { id: 6, name: 'Frank', email: 'frank@example.com', status: 'Active' },
    { id: 7, name: 'Grace', email: 'grace@example.com', status: 'Inactive' },
    { id: 8, name: 'Hannah', email: 'hannah@example.com', status: 'Active' },
    { id: 9, name: 'Ivan', email: 'ivan@example.com', status: 'Inactive' },
    { id: 10, name: 'Jack', email: 'jack@example.com', status: 'Active' },
];

export default function CollectionsScreen() {
    return (
        <div className='flex flex-row gap-x-4 w-full'>
            <CollectionsSidebar />
            <div className='flex flex-col space-y-4'>

            
            <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">Product Table</h2>
                <TableView table={productData} />
            </div>
            <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">User Table</h2>
                <TableView table={userData} />
            </div>
            </div>
        </div>
    );
}
