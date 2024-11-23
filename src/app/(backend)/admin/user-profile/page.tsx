import { getUser } from "@/utils/getUser";
import { EditUserProfileForm } from "@/features/Auth/EditUserForm";
import Link from "next/link";
import Container from "@/components/UI/container";
import Heading from "@/components/UI/heading";

export default async function UserPage() {
  const user = await getUser();

  return (
    <Container className="p-6">
      <Container className="mb-6">
        <Link
          href="/admin"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          ← Back to Dashboard
        </Link>
      </Container>

      <Container>
        <Heading className="text-2xl font-bold mb-6">Edit Profile</Heading>
        <EditUserProfileForm
          user={{
            ...user,
            role: { ...user.role, description: user.role.description || null },
          }}
        />
      </Container>
    </Container>
  );
}
