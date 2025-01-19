export interface InputFieldProps {
    label: string;
    type: 'text' | 'number' | 'file' | 'select' | 'date';
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    options?: { value: string; label: string }[];
    accept?: string;
    className?: string;
}

export interface TableProps<T> {
    data: T[];
    columns: {
        header: string;
        key: keyof T | 'actions';
        render?: (item: T) => React.ReactNode;
    }[];
    onEdit?: (item: T) => void;
    onDelete?: (id: string) => void;
    idField: keyof T;
}
