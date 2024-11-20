"use client";

import { logout } from "@/features/Auth/actions";
import data from "@/translations/cz/cz.json";
import { FaSignOutAlt } from "react-icons/fa";

interface LogoutButtonProps {
  showText: boolean;
}

export function LogoutButton({ showText }: LogoutButtonProps) {
  return (
    <button
      onClick={() => logout()}
      className="w-full px-4 py-2 text-sm font-medium text-gray-700 border border-black/60 hover:border-black bg-gray-100 dark:text-slate-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-150 ease-in-out flex items-center justify-center"
    >
      <FaSignOutAlt className={`text-black ${showText ? "mr-2":""}`} size={18} />
      {showText && <span>{data.navigation.generic.logout}</span>}
    </button>
  );
}
