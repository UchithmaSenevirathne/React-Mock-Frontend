import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {Crop} from "../models/Crop.ts";
import {addCrop, deleteCrop, updateCrop, setAlertType} from "../reducers/CropSlice.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const CropPage: React.FC = ()=> {
    const [cropCommonName, setCropCommonName] = useState("");
    const [cropScientificName, setCropScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [cropSeason, setCropSeason] = useState("");
    const [fieldCode, setFieldCode] = useState("");
    const [cropImage, setCropImage] = useState<File | null>(null)
    const [editingCrop, setEditingCrop] = useState<Crop | null>(null);

    const dispatch = useDispatch();
    const crops = useSelector((state: RootState) => state.crop.crops);

    const handleImageChange = (file: File | null, setCropImage: React.Dispatch<React.SetStateAction<File | null>>) => {
        if (file) {
            setCropImage(file); // Set the file directly in state
        }
    };

    const handleFormSubmit = () => {
        if (!cropCommonName || !cropScientificName || !category || !cropSeason || !fieldCode || !cropImage) {
            // Check if all fields are filled
            alert("Please fill in all fields and upload images.");
            return;
        }

        const newCrop = new Crop(
            editingCrop ? editingCrop.cropCode : Math.random().toString(),
            cropCommonName,
            cropScientificName,
            category,
            cropSeason,
            fieldCode,
            cropImage ? URL.createObjectURL(cropImage) : ''
        );

        if (editingCrop) {
            // Update the field if we are in editing mode
            dispatch(updateCrop(newCrop));
            dispatch(setAlertType('Crop updated successfully!'));
        } else {
            // Add a new field if not editing
            dispatch(addCrop(newCrop));
            dispatch(setAlertType('Crop saved successfully!'));
        }

        // Reset form fields after saving
        setCropCommonName('');
        setCropScientificName('');
        setCategory('');
        setCropSeason('');
        setFieldCode('');
        setCropImage(null);
        setEditingCrop(null);
    };

    const handleEdit = (crop: Crop) => {
        setCropCommonName(crop.cropCommonName);
        setCropScientificName(crop.cropScientificName);
        setCategory(crop.cropSeason);
        setCropSeason(crop.cropSeason);
        setFieldCode(crop.fieldCode);
        setCropImage(crop.cropImage ? new File([crop.cropImage], "image") : null);
        setEditingCrop(crop);
    };

    const handleDelete = (cropCode: string) => {
        dispatch(deleteCrop(cropCode)); // Dispatch delete action
        dispatch(setAlertType('Crop deleted successfully!'));
    };

    return (
        <div className="container mx-auto">
            {/* Crop Form */}
            <div className="bg-white p-6 mb-6 flex flex-col gap-5">
                <div className="flex gap-10 items-center">
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Crop Common Name</label>
                        <select
                            name="cropCommonName"
                            value={cropCommonName}
                            onChange={(e) => setCropCommonName(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-40 text-[14px] border border-gray-300 mt-5"
                        >
                            <option value="bg-24">BG-24</option>
                            <option value="cp-23">CP-23</option>
                            <option value="cn-34">CN-34</option>
                            <option value="ca-45">CA-45</option>
                            <option value="gm-12">GM-12</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Crop Scientific Name</label>
                        <input
                            type="text"
                            name="cropScientificName"
                            placeholder="Crop Scientific Name"
                            value={cropScientificName}
                            onChange={(e) => setCropScientificName(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-[230px] text-[14px] border border-gray-300 mt-5"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Category</label>
                        <select
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-40 text-[14px] border border-gray-300 mt-5"
                        >
                            <option value="rice">Rice</option>
                            <option value="cowpea">Cowpea</option>
                            <option value="corn">Corn</option>
                            <option value="cassava">Cassava</option>
                            <option value="greengram">Green Gram</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Field Name</label>
                        <select
                            name="fieldCode"
                            value={fieldCode}
                            onChange={(e) => setFieldCode(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-[230px] text-[14px] border border-gray-300 mt-5"
                        >
                            <option value="ricePalateA">Rice Palate A</option>
                            <option value="ricePalateB">Rice Palate B</option>
                            <option value="ricePalateC">Rice Palate C</option>
                            <option value="cowpeaPalateA">Cowpea Palate A</option>
                            <option value="cowpeaPalateB">Cowpea Palate B</option>
                            <option value="cornPalate">Corn Palate</option>
                            <option value="mixPalateA">Mix Palate A</option>
                            <option value="mixPalateB">Mix Palate B</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Crop Season</label>
                        <select
                            name="cropSeason"
                            value={cropSeason}
                            onChange={(e) => setCropSeason(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-48 text-[14px] border border-gray-300 mt-5"
                        >
                            <option value="Yala">Yala Season</option>
                            <option value="Maha">Maha Season</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Crop Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e.target.files?.[0] ?? null, setCropImage)}
                            className="block w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-[#086568] hover:file:bg-green-200 mt-5"
                        />
                    </div>
                </div>
                <div>
                    <button
                        onClick={handleFormSubmit}
                        className="bg-[#086568] text-white rounded-3xl py-2 px-5"
                    >
                        {editingCrop ? 'Update Crop' : 'Add Crop'}
                    </button>
                </div>
            </div>

            {/* Crop List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
                    <table className="table-auto w-full border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-gray-600">#</th>
                            <th className="border px-4 py-2 text-gray-600">Common Name</th>
                            <th className="border px-4 py-2 text-gray-600">Scientific Name</th>
                            <th className="border px-4 py-2 text-gray-600">Category</th>
                            <th className="border px-4 py-2 text-gray-600">Season</th>
                            <th className="border px-4 py-2 text-gray-600">Field</th>
                            <th className="border px-4 py-2 text-gray-600">Image</th>
                            <th className="border px-4 py-2 text-gray-600">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {crops.length > 0 ? (
                        crops.map((crop, index) => (
                            <tr key={crop.cropCode} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                                <td className="px-4 py-2 text-gray-700">{crop.cropCommonName}</td>
                                <td className="px-4 py-2 text-gray-700">{crop.cropScientificName}</td>
                                <td className="px-4 py-2 text-gray-700">{crop.category}</td>
                                <td className="px-4 py-2 text-gray-700">{crop.cropSeason}</td>
                                <td className="px-4 py-2 text-gray-700">{crop.fieldCode}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    {crop.cropImage && (
                                        <img
                                            src={crop.cropImage}
                                            alt="Crop"
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button className="text-blue-500 hover:text-blue-700 mx-2"
                                            onClick={() => handleEdit(crop)}>
                                        <FontAwesomeIcon icon={faEdit} className=""/>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 mx-2"
                                            onClick={() => handleDelete(crop.cropCode)}>
                                        <FontAwesomeIcon icon={faTrashAlt} className=""/>
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="text-center text-gray-500 py-5">
                                    No Crops available
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            );
            }

            export default CropPage;