import { checkUserPermissions } from '@/lib/permissions';
import TableViewClient from './TableViewClient';
import { getUser } from '@/utils/getUser';

type TableData = {
    id: number;    
};

type TableProps<T extends TableData> = {
    table: T[];
    tableName?: string;
};

export default async function TableView<T extends TableData>({ 
    table, 
    tableName = 'Table' 
}: TableProps<T>) {
    const user = await getUser();
    const { canEditDatabase } =  await checkUserPermissions(user.id)

    return <TableViewClient initialData={table} tableName={tableName} canEdit={canEditDatabase} />;
}