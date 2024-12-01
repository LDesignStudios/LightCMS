export default function CollectionsSettingsForm() {
  const tables = [
    { id: 1, name: "Users" },
    { id: 2, name: "Pages" },
    { id: 3, name: "Posts" },
    { id: 4, name: "Comments" },
    { id: 5, name: "Likes" },
    { id: 6, name: "Logs" },
    { id: 7, name: "Roles" },
    { id: 8, name: "Permissions" },
  ];

  return (
    <div className="p-4">
      <label className="inline-flex items-center mb-4 w-full border-b pb-4 border-black/15">
        <input type="checkbox" className="mr-2" />
        <span> Show collections tab </span>
      </label>

      <h2 className="text-xl font-semibold pb-4"> Load individual tables </h2>
      <div className="space-y-4">
        {tables.map((table) => (
          <div key={table.id}>
            <label className="inline-flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked/>
              <span>{table.name}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
