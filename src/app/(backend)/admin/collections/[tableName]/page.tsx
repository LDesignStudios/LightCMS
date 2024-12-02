import { getTableData } from '@/features/Content/Collections/actions';
import { TableData } from '@/features/Content/Collections/types';
import TableView from '@/features/Content/Collections/TableView';
import CollectionsNavbar from '@/features/Content/Collections/CollectionsSidebar';

interface Props {
    params: {
        tableName: string;
    };
}

export default async function TablePage({ params }: Props) {
    const { tableName } = params;
    const tableData: TableData[] = await getTableData(tableName);

    return (
        <div className='flex flex-col max-w-full'>
            <CollectionsNavbar />
            <div className='flex-1 max-w-7xl'>
                <TableView table={tableData} tableName={tableName} />
            </div>
        </div>
    );
} 