import { getUser } from "@/utils/getUser";
import { EditUserProfileForm } from "@/features/Auth/EditUserForm";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await getUser();


  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/admin"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          ← Back to Dashboard
        </Link>
      </div>
      
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <EditUserProfileForm user={{ ...user, role: { ...user.role, description: user.role.description || null } }} />
      </div>
    </div>
  );
}