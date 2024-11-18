import Link from "next/link";
import languageData from './sys-lan.json'; 
import GetCurrentUser from "@/components/GetCurrentUser";

export default function Admin() {

  return (
    <div>
      <div className="p-8 ">
        <h1 className="text-2xl flex flex-row font-bold mb-6">
          {languageData.welcomeMessage} 👋, <GetCurrentUser/>
        </h1>

        <div className="flex flex-col gap-4">         
          {[
            { href: "/admin/user-profile", text: languageData.profile },
            { href: "/admin/posts", text: languageData.posts },
            { href: "/admin/comments", text: languageData.comments },
            { href: "/admin/pages", text: languageData.pages },
            { href: "/admin/media", text: languageData.media },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
