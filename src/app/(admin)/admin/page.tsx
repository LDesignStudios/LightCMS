import { getUser } from "@/utils/getUser";
import Link from "next/link";

import { checkUserPermissions } from "@/lib/permissions";

export default async function Admin() {
  const user = await getUser();

  const { canManageSystem } = await checkUserPermissions(user.id);

  return (
    <div>
      <div className="p-8 ">
        <h1 className="text-2xl font-bold mb-6">
          Welcome 👋, {user.name || user.email}!
        </h1>

        <div className="flex flex-col gap-4">
          {canManageSystem && (
            <div className="flex flex-col gap-4">
              <Link
                href="/admin/system/permissions"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Permissions Management
              </Link>
              <Link
                href="/admin/system/roles"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Roles Management
              </Link>
              <Link
                href="/admin/system/users"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Users Management
              </Link>
            </div>
          )}
          <Link
            href="/admin/user-profile"
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

/*
<div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>

          <div className="grid gap-4">
            <div className="mb-4">
              <ProfileAvatar
                profilePicture={user.profilePicture}
                profileColor={user.profileColor}
                name={user.name || user.email}
                size="lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 text-sm">ID</label>
                <p className="font-mono">{user.id}</p>
              </div>

              <div>
                <label className="text-gray-600 text-sm">Email</label>
                <p>{user.email}</p>
              </div>

              <div>
                <label className="text-gray-600 text-sm">Name</label>
                <p>{user.name || "Not set"}</p>
              </div>

              <div>
                <label className="text-gray-600 text-sm">Role</label>
                <p className="capitalize">{user.role.name.toLowerCase()}</p>
              </div>

              <div>
                <label className="text-gray-600 text-sm">Created At</label>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>

              <div>
                <label className="text-gray-600 text-sm">Last Updated</label>
                <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-4">
              <Link
                href="/admin/profile"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>


import { getUser } from "@/utils/getUser"
import { checkUserPermissions } from "@/lib/permissions";
import { ProfileAvatar } from "@/components/Layout/ProfileAvatar";
import Link from "next/link";

export default async function Admin() {
  const user = await getUser();
  const { canViewUsers, canManageRoles, canCreateUser, canManagePermissions } = await checkUserPermissions(user.id);

  return (
    <div>
      <div className="p-8 bg-neutral-100">
        <h1 className="text-2xl font-bold mb-6">
          Welcome 👋, {user.name || user.email}!
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>

          <div className="grid gap-4">
            <div className="mb-4">
              <ProfileAvatar
                profilePicture={user.profilePicture}
                profileColor={user.profileColor}
                name={user.name || user.email}
                size="lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 text-sm">ID</label>
                <p className="font-mono">{user.id}</p>
              </div>

              <div>
                <label className="text-gray-600 text-sm">Email</label>
                <p>{user.email}</p>
              </div>

              <div>
                <label className="text-gray-600 text-sm">Name</label>
                <p>{user.name || "Not set"}</p>
              </div>

              <div>
                <label className="text-gray-600 text-sm">Role</label>
                <p className="capitalize">{user.role.name.toLowerCase()}</p>
              </div>

              <div>
                <label className="text-gray-600 text-sm">Created At</label>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>

              <div>
                <label className="text-gray-600 text-sm">Last Updated</label>
                <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-4">
              <Link
                href="/admin/profile"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}
*/
