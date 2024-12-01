import { prisma } from "@/lib/prisma";

// Define the type for the query result
interface Table {
  name: string;
}

export async function getTableNames() {
  // Use a raw SQL query to fetch table names
  const result = await prisma.$queryRaw<Table[]>`SELECT name FROM sqlite_master WHERE type='table'`;

  // Extract the table names from the query result
  const tableNames = result.map((row) => row.name);
  
  return tableNames;
}

// Function to fetch all rows from a specific table
export async function getTableData(tableName: string): Promise<Record<string, any>[]> {
  // Ensure that the table name is sanitized (optional, for extra safety)
  const result = await prisma.$queryRawUnsafe(
    `SELECT * FROM ${tableName}`
  );

  return result as Record<string, any>[];
}

// Function to update a record in a table
export async function updateTableRecord(
  tableName: string, 
  id: number | string, 
  data: Record<string, any>
): Promise<void> {
  const setClause = Object.entries(data)
    .filter(([key]) => key !== 'id') // Exclude id from update
    .map(([key]) => `${key} = @${key}`)
    .join(', ');

  await prisma.$executeRawUnsafe(
    `UPDATE ${tableName} SET ${setClause} WHERE id = @id`,
    ...Object.entries(data).map(([key, value]) => value)
  );
}