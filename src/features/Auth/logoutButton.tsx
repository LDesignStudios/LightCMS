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
      className="w-full px-4 py-2 text-sm font-medium text-gray-700 border border-black/20 hover:border-black/60 bg-gray-100 transition-colors duration-200 ease-in-out flex rounded-md items-center justify-center"
    >
      <FaSignOutAlt className={`text-neutral-600 ${showText ? "mr-2":""}`} size={18} />
      {showText && <span>{data.navigation.generic.logout}</span>}
    </button>
  );
}
