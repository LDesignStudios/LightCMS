import { getTableData } from '@/features/Content/Collections/actions';
import TableView from '@/features/Content/Collections/TableView';
import CollectionsNavbar from '@/features/Content/Collections/CollectionsSidebar';

export default async function TablePage() {
    const tableName  = "User";
    const tableData = await getTableData(tableName);

    return (
        <div className='flex flex-col max-w-full'>
            <CollectionsNavbar />
            <div className='flex-1 max-w-7xl'>
                <TableView table={tableData} tableName={tableName} />
            </div>
        </div>
    );
} 