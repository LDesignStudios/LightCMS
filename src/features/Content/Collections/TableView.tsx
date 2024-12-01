import React from 'react';

// Define a generic type that can represent any table's structure
type TableProps<T extends object> = {
    table: T[];
};

// TableView component that uses a generic type to handle different table structures
export default function TableView<T extends object>({ table }: TableProps<T>) {
    if (table.length === 0) return <div>No data available.</div>;

    const columns = Object.keys(table[0]);

    return (
        <div className="text-sm font-semibold">
            <p>Viewing table with {table.length} rows:</p>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column} className="border p-2">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {table.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => (
                                <td key={column} className="border p-2">
                                    {row[column as keyof T] as React.ReactNode}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
