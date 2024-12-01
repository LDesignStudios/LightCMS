// Tables that should be hidden from the navigation
export const HIDDEN_TABLES = [
    '_prisma_migrations',
    'sqlite_sequence',
    '_PostCategories',
    '_PermissionToRole'    
];

// Function to check if a table should be visible
export const isTableVisible = (tableName: string): boolean => {
    return !HIDDEN_TABLES.includes(tableName);
}; 