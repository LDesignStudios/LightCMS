"use client";

import { useState, useRef, useEffect } from 'react';
import { ProfileAvatar } from "@/components/Layout/ProfileAvatar";
import Link from 'next/link';

interface UserMenuProps {
  user?: {
    name: string | null;
    email: string;
    role: string;
    profilePicture: string | null;
    profileColor: string | null;
  };
  showText?: boolean;
}

export function UserMenu({ user, showText }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <Link 
        href="/login" 
        className="flex items-center  hover:bg-blue-600 bg-blue-500 text-white duration-150 p-2 px-4 rounded-lg transition-colors"
      >
        <span className="font-semibold">Sign in</span>
      </Link>
    );
  }

  return (
    <div className="" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="flex items-center gap-x-2 hover:bg-gray-300 py-2 px-4 duration-150 rounded-lg transition-colors"
      >
        <ProfileAvatar 
          profilePicture={user.profilePicture}
          profileColor={user.profileColor}
          name={user.name || user.email}
          size="sm"
        />

        <div className="text-left">
          {showText && (
            <>
              <p className="font-semibold text-sm">{user.name || user.email}</p>             
            </>
          )}
        </div>
      </button>

      {isOpen && (
        <div className=" absolute right-4 top-14 border border-black/20 bg-neutral-200 rounded-lg shadow-lg py-1 z-10" onClick={(e) => e.stopPropagation()}>
          <div className="px-4 py-2 border-b border-black/10">
            <p className="text-sm font-semibold">{user.name || user.email}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <div className="px-4 py-2 border-b">
            <Link href="/admin">
              <p className="text-sm font-medium">Dashboard</p>
            </Link>
          </div>
          <div className="px-4 py-2 border-b">
            <Link href="/admin/profile">
              <p className="text-sm font-medium">Profile</p>
            </Link>
          </div>
          <div className="px-4 py-2 border-b">
            <Link href="/">
              <p className="text-sm font-medium">Homepage</p>
            </Link>
          </div>         
        </div>
      )}
    </div>
  );
} 