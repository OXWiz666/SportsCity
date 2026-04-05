interface Column<T> {
    key: string;
    label: string;
    render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyField?: string;
}

export default function DataTable<T extends Record<string, any>>({ columns, data, keyField = 'id' }: DataTableProps<T>) {
    return (
        <div className="overflow-x-auto border-2 border-zinc-800">
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-zinc-800 bg-black">
                        {columns.map((col) => (
                            <th key={col.key} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-4 py-12 text-center text-xs font-bold uppercase tracking-widest text-zinc-600">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item[keyField]} className="hover:bg-zinc-900/50 transition-colors">
                                {columns.map((col) => (
                                    <td key={col.key} className="px-4 py-3 text-sm text-zinc-300">
                                        {col.render ? col.render(item) : item[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
