import Container from "@/components/UI/container";
import Heading from "@/components/UI/heading";
import Link from "next/link";

import data from "@/translations/cz/cz.json";

export default function System() {
  const links = [
    { href: "/admin/settings/users", label: data.system.links.users },
    { href: "/admin/settings/roles", label: data.system.links.roles },
    { href: "/admin/settings/permissions", label: data.system.links.permissions },
  ];

  return (
    <Container className="p-4">
      <Heading className="text-2xl flex flex-row mb-4 border-b border-black/15 pb-3">
        {data.system.title}
      </Heading>
      <Container className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="bg-white border border-black/10 rounded-lg p-4 text-blue-600 hover:bg-blue-100/35 transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
      </Container>
    </Container>
  );
}
