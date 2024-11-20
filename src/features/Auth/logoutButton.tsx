'use client'

import { logout } from "@/features/Auth/actions"
import data from '@/translations/en/en.json'; 

export function LogoutButton() {
  return (
    <button 
      onClick={() => logout()}
      className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-100 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-150 ease-in-out"
    >
      {data.navigation.generic.logout}
    </button>
  )
} 