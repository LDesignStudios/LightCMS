import { getUser } from "@/utils/getUser";
import { Permission } from "@/utils/types";
import { hasPermission } from "@/lib/permissions";
import { AuditLogsList } from "@/features/Logs/AuditLogsList";
import { prisma } from "@/lib/prisma";


import Container from "@/components/UI/container";
import Heading from "@/components/UI/heading";

async function getAuditLogs() {
  return prisma.auditLog.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 3
  });
}

export default async function LogsPage() {
  const user = await getUser();
  const canViewLogs = await hasPermission(user.id, Permission.VIEW_AUDIT_LOGS);

  if (!canViewLogs) {
    return null;
  }

  const logs = await getAuditLogs();

  return (
    <Container>      
      <Container className="w-full">
        <Heading className="text-2xl font-bold mb-6">Audit Logs</Heading>
        <AuditLogsList logs={logs} />
      </Container>
    </Container>
  );
} 