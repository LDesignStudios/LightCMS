import Link from "next/link";
import data from '@/translations/en/en.json'; 
import GetCurrentUser from "@/components/GetCurrentUser";
import Container from "@/components/UI/container";
import Heading from "@/components/UI/heading";

export default function Admin() {

  return (
      <Container className="p-8 ">
        <Heading className="text-2xl flex flex-row mb-4 border-b border-black/15 pb-3 ">
          {data.dashboard.welcomeMessage} 👋, <GetCurrentUser/>
        </Heading>

        <Container className="flex flex-col gap-4">         
          {[
            { href: "/admin/user-profile", text: data.dashboard.profile },
            { href: "/admin/posts", text: data.dashboard.posts },
            { href: "/admin/comments", text: data.dashboard.comments },
            { href: "/admin/pages", text: data.dashboard.pages },
            { href: "/admin/media", text: data.dashboard.media },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              {link.text}
            </Link>
          ))}
        </Container>
      </Container>
  );
}
