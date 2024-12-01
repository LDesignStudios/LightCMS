"use client";

import React, { useState } from "react";
import { formatTableValue } from "@/utils/formatters";
import EditModal from "./EditModal";
import { updateTableRecord } from "./actions";

type TableProps<T extends Record<string, unknown>> = {
  initialData: T[];
  tableName: string;
  canEdit: boolean;
};

export default function TableViewClient<T extends Record<string, unknown>>({
  initialData,
  canEdit,
  tableName,
}: TableProps<T>) {
  const [editingRow, setEditingRow] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (initialData.length === 0)
    return (
      <div className="p-4 text-neutral-600 bg-neutral-50 rounded-lg">
        No data available in {tableName}.
      </div>
    );

  const columns = Object.keys(initialData[0]);

  const handleEdit = (row: T) => {
    setEditingRow(row);
    setIsModalOpen(true);
  };

  const handleSave = async (data: T) => {
    try {
      await updateTableRecord(tableName, data.id as string | number, data);
      // Refresh the page to show updated data
      window.location.reload();
    } catch {
      alert("Failed to update record. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-auto bg-white">
      <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              {tableName}
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              {initialData.length} records
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              {canEdit && (
                <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider bg-neutral-50 w-20">
                  Actions
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column}
                  className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider bg-neutral-50 w-48 min-w-[12rem]"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {initialData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-neutral-50">
                {canEdit && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    <button
                      onClick={() => handleEdit(row)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  </td>
                )}
                {columns.map((column) => {
                  const value = row[column];
                  return (
                    <td
                      key={column}
                      className="px-6 py-4 text-sm text-neutral-700 truncate"
                      title={String(value)}
                    >
                      {formatTableValue(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingRow && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingRow(null);
          }}
          onSave={handleSave}
          data={editingRow}
          tableName={tableName}
        />
      )}
    </div>
  );
}
