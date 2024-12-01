import { getTableNames } from './actions';

export default async function CollectionsSidebar() { 
  const tableNames = await getTableNames(); 

  return (
    <div className="p-4 bg-neutral-50 rounded-md border border-black/5 shadow-sm">
      <h1 className="text-xl font-semibold mb-4">Tables</h1>
      <ul className="flex flex-col gap-y-2">
        {tableNames.map((table) => (
          <li key={table}>
            <a
              href={`#${table}`}
              className="block py-2 px-4 rounded-lg hover:bg-gray-200/50 transition-colors"
            >
              {table}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
