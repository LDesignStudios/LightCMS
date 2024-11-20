import Container from "@/components/UI/container";
import Heading from "@/components/UI/heading";
import Link from "next/link";

import data from "@/translations/en/en.json";

export default function System() {
  return (
    <Container className="p-4">
      <Heading className="text-2xl flex flex-row mb-4 border-b border-black/15 pb-3 ">
        {data.system.title}
      </Heading>
      <Container className="flex flex-col gap-4">
        <Link
          href="/admin/system/users"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          {data.system.links.users}
        </Link>
        <Link
          href="/admin/system/roles"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          {data.system.links.roles}
        </Link>
        <Link
          href="/admin/system/permissions"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          {data.system.links.permissions}
        </Link>
      </Container>
    </Container>
  );
}
