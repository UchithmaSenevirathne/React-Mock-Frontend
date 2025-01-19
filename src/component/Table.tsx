// components/Table.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TableProps } from '../Types.ts';

export function Table<T extends { [key: string]: any }>({
                                                            data,
                                                            columns,
                                                            onEdit,
                                                            onDelete,
                                                            idField
                                                        }: TableProps<T>) {
    return (
        <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
            <table className="table-auto w-full border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className="px-4 py-2 text-left text-gray-600">
                            {column.header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.length > 0 ? (
                    data.map((item, rowIndex) => (
                        <tr key={item[idField]} className="border-t border-gray-200 hover:bg-gray-50">
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="px-4 py-2 text-gray-700">
                                    {column.key === 'actions' ? (
                                        <div className="flex justify-center gap-2">
                                            {onEdit && (
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => onEdit(item)}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => onDelete(item[idField])}
                                                >
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            )}
                                        </div>
                                    ) : column.render ? (
                                        column.render(item)
                                    ) : (
                                        item[column.key]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length} className="text-center text-gray-500 py-5">
                            No data available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};