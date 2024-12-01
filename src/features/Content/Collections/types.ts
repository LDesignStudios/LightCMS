// types.ts

// Define the Product table type with more columns
export type ProductTable = {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
    rating: number;
    description: string;
    sku: string;
    manufacturer: string;
    weight: number;
    color: string;
    dimensions: string;
};

// Define the User table type with fewer columns
export type UserTable = {
    id: number;
    name: string;
    email: string;
    status: string;
};
