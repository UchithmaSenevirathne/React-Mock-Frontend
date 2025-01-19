import React from 'react';
import { InputFieldProps } from '../Types.ts';

export const FormField: React.FC<InputFieldProps> = ({
                                                         label,
                                                         type,
                                                         value,
                                                         onChange,
                                                         placeholder,
                                                         options,
                                                         accept,
                                                         className
                                                     }) => {
    const baseClassName = "bg-white rounded-3xl py-2 px-3 text-gray-600 text-[14px] border border-gray-300 mt-5";
    const inputClassName = `${baseClassName} ${className || ''}`;

    return (
        <div className="mb-4">
            <label className="block font-medium text-sm">{label}</label>
            {type === 'select' ? (
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={inputClassName}
                >
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : type === 'file' ? (
                <input
                    type="file"
                    accept={accept}
                    onChange={(e) => onChange(e.target.files?.[0]?.name || '')}
                    className="block w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-[#086568] hover:file:bg-green-200 mt-5"
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={inputClassName}
                />
            )}
        </div>
    );
};