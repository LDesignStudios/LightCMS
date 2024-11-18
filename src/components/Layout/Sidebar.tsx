import { UserMenu } from "@/features/Auth/userMenu/userMenu";
import { getUser } from "@/utils/getUser";

export default async function Sidebar() {
  const user = await getUser();

  if (!user) return null;

  return (
    <div className="h-screen bg-gray-800 text-white p-4 flex flex-col shadow-lg">
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-bold">Logo Name</h1>
      </div>
      <div className="flex-grow overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Links</h2>
        <ul className="space-y-2">
          <li><a href="/link1" className="block p-2 hover:bg-gray-700 rounded">Link 1</a></li>
          <li><a href="/link2" className="block p-2 hover:bg-gray-700 rounded">Link 2</a></li>
          <li><a href="/link3" className="block p-2 hover:bg-gray-700 rounded">Link 3</a></li>
        </ul>
      </div>
      <UserMenu
        user={{
          ...user,
          role: user.role.name,
          profilePicture: user.profilePicture ?? null,
          profileColor: user.profileColor ?? null,
        }}
      />
    </div>
  );
}
