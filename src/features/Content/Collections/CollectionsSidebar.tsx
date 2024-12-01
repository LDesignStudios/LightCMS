import Link from 'next/link';
import { getTableNames } from './actions';
import { isTableVisible } from './config';

export default async function CollectionsNavbar() { 
  const tableNames = await getTableNames(); 
  const visibleTables = tableNames.filter(isTableVisible);

  return (
    <div className="w-full bg-white">
      <div className="flex items-center gap-x-4">        
        <nav className="flex items-center gap-x-1 h-full border-b border-neutral-200 w-full">
          {visibleTables.map((table) => (
            <Link
              key={table}
              href={`/admin/collections/${table}`}
              className="px-2 py-1 h-full flex items-center hover:bg-neutral-50 text-sm text-neutral-600 hover:text-neutral-900 border-b-2 border-transparent hover:border-neutral-300 transition-colors"
            >
              {table}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
