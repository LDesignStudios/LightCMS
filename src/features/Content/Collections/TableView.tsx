import { checkUserPermissions } from '@/lib/permissions';
import TableViewClient from './TableViewClient';
import { getUser } from '@/utils/getUser';

type TableProps<T extends Record<string, unknown>> = {
    table: T[];
    tableName?: string;
};

export default async function TableView<T extends Record<string, unknown>>({ 
    table, 
    tableName = 'Table' 
}: TableProps<T>) {
    const user = await getUser();
    const { canEditDatabase } =  await checkUserPermissions(user.id)

    return <TableViewClient initialData={table} tableName={tableName} canEdit={canEditDatabase} />;
}