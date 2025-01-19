import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addField, deleteField, setAlertType, updateField} from '../reducers/FieldSlice.ts'; // Assuming the slice is named fieldSlice
import { RootState } from '../store/Store.ts';
import {Field} from "../models/Field.ts";
import {FormField} from "../component/FormField.tsx";
import {Table} from "../component/Table.tsx";
import {Button} from "../component/Button.tsx"; // Your Redux store file

const FieldPage: React.FC = () => {
    const [fieldName, setFieldName] = useState('');
    const [fieldLocation, setFieldLocation] = useState('');
    const [extentSize, setExtentSize] = useState('');
    const [fieldImage1, setFieldImage1] = useState<File | null>(null);
    const [fieldImage2, setFieldImage2] = useState<File | null>(null);
    const [editingField, setEditingField] = useState<Field | null>(null);

    const dispatch = useDispatch();
    const fields = useSelector((state: RootState) => state.field.fields);

    const handleImageUpload = (file: File | null, setFieldImage: React.Dispatch<React.SetStateAction<File | null>>) => {
        if (file) {
            setFieldImage(file); // Set the file directly in state
        }
    };

    const handleSaveOrUpdateField = () => {
        if (!fieldName || !fieldLocation || !extentSize || !fieldImage1 || !fieldImage2) {
            // Check if all fields are filled
            alert("Please fill in all fields and upload images.");
            return;
        }

        const newField = new Field(
            editingField ? editingField.fieldCode : Math.random().toString(),
            fieldName,
            fieldLocation,
            extentSize,
            fieldImage1 ? URL.createObjectURL(fieldImage1) : '',
            fieldImage2 ? URL.createObjectURL(fieldImage2) : ''
        );

        if (editingField) {
            // Update the field if we are in editing mode
            dispatch(updateField(newField));
            dispatch(setAlertType('Field updated successfully!'));
        } else {
            // Add a new field if not editing
            dispatch(addField(newField));
            dispatch(setAlertType('Field saved successfully!'));
        }

        // Reset form fields after saving
        setFieldName('');
        setFieldLocation('');
        setExtentSize('');
        setFieldImage1(null);
        setFieldImage2(null);
        setEditingField(null);
    };

    const handleEdit = (field: Field) => {
        setFieldName(field.fieldName);
        setFieldLocation(field.fieldLocation);
        setExtentSize(field.extentSize);
        setFieldImage1(field.fieldImage1 ? new File([field.fieldImage1], "image1") : null);
        setFieldImage2(field.fieldImage2 ? new File([field.fieldImage2], "image2") : null);
        setEditingField(field); // Set the field to be edited
    };

    const handleDelete = (fieldCode: string) => {
        dispatch(deleteField(fieldCode)); // Dispatch delete action
        dispatch(setAlertType('Field deleted successfully!'));
    };

    return (
        <div className="container mx-auto">
            {/* Field Form */}
            <div className="bg-white p-6 mb-6 flex flex-col gap-5">
                <div className="flex gap-10 items-center">
                    <FormField
                        label="Field Name"
                        type="select"
                        value={fieldName}
                        onChange={setFieldName}
                        options={[
                            { value: 'Rice Palate A', label: 'Rice Palate A' },
                            { value: 'Rice Palate B', label: 'Rice Palate B' },
                            { value: 'Rice Palate C', label: 'Rice Palate C' },
                            { value: 'Cowpea Palate A', label: 'Cowpea Palate A' },
                            { value: 'Cowpea Palate B', label: 'Cowpea Palate B' },
                            { value: 'Corn Palate', label: 'Corn Palate' },
                            { value: 'Mix Palate A', label: 'Mix Palate A' },
                            { value: 'Mix Palate B', label: 'Mix Palate B' }
                            // ... other options
                        ]}
                        className="w-[230px]"
                    />
                    <FormField
                        label="Field Location"
                        type="text"
                        value={fieldLocation}
                        onChange={setFieldLocation}
                        placeholder="Colombo, Sri Lanka"
                        className="w-80"
                    />
                    <FormField
                        label="Extent Size"
                        type="number"
                        value={extentSize}
                        onChange={setExtentSize}
                        placeholder="2000 sq.mt"
                        className="w-52"
                    />
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Field Image 1</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e.target.files?.[0] ?? null, setFieldImage1)}
                            className="block w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-[#086568] hover:file:bg-green-200 mt-5"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-sm">Field Image 2</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e.target.files?.[0] ?? null, setFieldImage2)}
                            className="block w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-[#086568] hover:file:bg-green-200 mt-5"
                        />
                    </div>
                </div>
                <div>
                    <Button onClick={handleSaveOrUpdateField}>
                        {editingField ? 'Update Field' : 'Add Field'}
                    </Button>
                </div>
            </div>

            {/* Field Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <Table
                    data={fields}
                    columns={[
                        { header: '#', key: 'index', render: (_, index) => index + 1 },
                        { header: 'Field Name', key: 'fieldName' },
                        { header: 'Field Location', key: 'fieldLocation' },
                        { header: 'Extent Size', key: 'extentSize' },
                        {
                            header: 'Image 1',
                            key: 'fieldImage1',
                            render: (item) => item.fieldImage1 && (
                                <img src={item.fieldImage1} className="w-16 h-16 rounded" alt="Field Image 1" />
                            )
                        },
                        {
                            header: 'Image 2',
                            key: 'fieldImage2',
                            render: (item) => item.fieldImage2 && (
                                <img src={item.fieldImage2} className="w-16 h-16 rounded" alt="Field Image 2" />
                            )
                        },
                        // ... other columns ...
                        { header: 'Actions', key: 'actions' }
                    ]}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    idField="fieldCode"
                />
            </div>
        </div>
    );
};

export default FieldPage;

{/*<div className="mb-4">*/}
{/*    <label className="block font-medium text-sm">Field Name</label>*/}
{/*    <select*/}
{/*        name="fieldName"*/}
{/*        value={fieldName}*/}
{/*        onChange={(e) => setFieldName(e.target.value)}*/}
{/*        className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-[230px] text-[14px] border border-gray-300 mt-5"*/}
{/*    >*/}
{/*        <option value="ricePalateA">Rice Palate A</option>*/}
{/*        <option value="ricePalateB">Rice Palate B</option>*/}
{/*        <option value="ricePalateC">Rice Palate C</option>*/}
{/*        <option value="cowpeaPalateA">Cowpea Palate A</option>*/}
{/*        <option value="cowpeaPalateB">Cowpea Palate B</option>*/}
{/*        <option value="cornPalate">Corn Palate</option>*/}
{/*        <option value="mixPalateA">Mix Palate A</option>*/}
{/*        <option value="mixPalateB">Mix Palate B</option>*/}
{/*    </select>*/}
{/*</div>*/}

{/*<div className="mb-4">*/}
{/*    <label className="block font-medium text-sm">Field Location</label>*/}
{/*    <input*/}
{/*        type="text"*/}
{/*        value={fieldLocation}*/}
{/*        onChange={(e) => setFieldLocation(e.target.value)}*/}
{/*        placeholder="Colombo, Sri Lanka"*/}
{/*        className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-80 text-[14px] border border-gray-300 mt-5"*/}
{/*    />*/}
{/*</div>*/}

{/*<div className="mb-4">*/}
{/*    <label className="block font-medium text-sm">Extent Size</label>*/}
{/*    <input*/}
{/*        type="number"*/}
{/*        value={extentSize}*/}
{/*        onChange={(e) => setExtentSize(e.target.value)}*/}
{/*        placeholder="Colombo, Sri Lanka"*/}
{/*        className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-52 text-[14px] border border-gray-300 mt-5"*/}
{/*    />*/}
{/*</div>*/}

{/*<button*/}
{/*    onClick={handleSaveOrUpdateField}*/}
{/*    className="bg-[#086568] text-white rounded-3xl py-2 px-5"*/}
{/*>*/}
{/*    {editingField ? 'Update Field' : 'Add Field'}*/}
{/*</button>*/}


{/*<div className="overflow-x-auto max-h-[350px] overflow-y-auto">*/}
{/*    <table className="table-auto w-full border border-gray-200 rounded-lg shadow-md">*/}
{/*        <thead className="bg-gray-100">*/}
{/*        <tr>*/}
{/*            <th className="px-4 py-2 text-left text-gray-600">#</th>*/}
{/*            <th className="px-4 py-2 text-left text-gray-600">Field Name</th>*/}
{/*            <th className="px-4 py-2 text-left text-gray-600">Field Location</th>*/}
{/*            <th className="px-4 py-2 text-left text-gray-600">Extent Size</th>*/}
{/*            <th className="px-4 py-2 text-left text-gray-600">Image 1</th>*/}
{/*            <th className="px-4 py-2 text-left text-gray-600">Image 2</th>*/}
{/*            <th className="px-4 py-2 text-center text-gray-600">Actions</th>*/}
{/*        </tr>*/}
{/*        </thead>*/}
{/*        <tbody>*/}
{/*        {fields.length > 0 ? (*/}
{/*            fields.map((field, index) => (*/}
{/*            <tr key={field.fieldCode} className="border-t border-gray-200 hover:bg-gray-50">*/}
{/*                <td className="px-4 py-2 text-gray-700">{index + 1}</td>*/}
{/*                <td className="px-4 py-2 text-gray-700">{field.fieldName}</td>*/}
{/*                <td className="px-4 py-2 text-gray-700">{field.fieldLocation}</td>*/}
{/*                <td className="px-4 py-2 text-gray-700">{field.extentSize}</td>*/}
{/*                <td className="px-4 py-2 text-gray-700">*/}
{/*                    {field.fieldImage1 && (*/}
{/*                        <img src={field.fieldImage1} className="w-16 h-16 rounded" alt="Field Image 1" />*/}
{/*                    )}*/}
{/*                </td>*/}
{/*                <td className="px-4 py-2 text-gray-700">*/}
{/*                    {field.fieldImage2 && (*/}
{/*                        <img src={field.fieldImage2} className="w-16 h-16 rounded" alt="Field Image 2" />*/}
{/*                    )}*/}
{/*                </td>*/}
{/*                <td className="px-4 py-2 text-center">*/}
{/*                    <button className="text-blue-500 hover:text-blue-700 mx-2"*/}
{/*                            onClick={() => handleEdit(field)}>*/}
{/*                        <FontAwesomeIcon icon={faEdit} className="" />*/}
{/*                    </button>*/}
{/*                    <button className="text-red-500 hover:text-red-700 mx-2"*/}
{/*                            onClick={() => handleDelete(field.fieldCode)}>*/}
{/*                        <FontAwesomeIcon icon={faTrashAlt} className="" />*/}
{/*                    </button>*/}
{/*                </td>*/}
{/*            </tr>*/}
{/*        ))*/}
{/*        ) : (*/}
{/*            <tr>*/}
{/*                <td colSpan={7} className="text-center text-gray-500 py-5">*/}
{/*                    No fields available*/}
{/*                </td>*/}
{/*            </tr>*/}
{/*        )}*/}
{/*        </tbody>*/}
{/*    </table>*/}
{/*</div>*/}