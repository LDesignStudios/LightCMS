import Link from "next/link";

export default function System() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">System</h1>
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/system/users"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Users
        </Link>
        <Link
          href="/admin/system/roles"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Roles
        </Link>
        <Link
          href="/admin/system/permissions"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Permissions
        </Link>
      </div>
    </div>
  );
}
