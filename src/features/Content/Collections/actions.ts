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
export async function getTableData(tableName: string) {
  // Ensure that the table name is sanitized (optional, for extra safety)
  const result = await prisma.$queryRawUnsafe(
    `SELECT * FROM ${tableName}`
  );

  return result;
}