import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { UserMenu } from "@/features/Auth/userMenu/userMenu";
import { getUser } from "@/utils/getUser";

import { IoIosNotificationsOutline } from "react-icons/io";
// import { IoSearch } from "react-icons/io5";
// import Input from "../UI/input";

async function Navbar() {
  const user = await getUser();
  return (
    <nav className="bg-neutral-50 border-b-[0.5px] border-black/30 py-2 px-4 flex justify-between items-center">
      <div className="flex-grow">
        <Breadcrumb />
      </div>
      <div className="flex items-center gap-x-4">
        {/* 
        <Input
              inputSize="sm"
              leftIcon={<IoSearch />}               
              placeholder="Search..." 
            />
*/}
        <span>
          <IoIosNotificationsOutline size={20} />
        </span>
        <UserMenu
          user={{
            ...user,
            role: user.role.name,
            profilePicture: user.profilePicture ?? null,
            profileColor: user.profileColor ?? null,
          }}
          showText
        />
      </div>
    </nav>
  );
}

export default Navbar;
