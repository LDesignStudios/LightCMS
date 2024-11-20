import Container from "@/components/UI/container";

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container className="flex-1 p-4">{children}</Container>;
}
