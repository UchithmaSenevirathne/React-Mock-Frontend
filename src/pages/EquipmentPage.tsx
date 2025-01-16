import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Equipment} from "../models/Equipment.ts";
import {addEquipment, deleteEquipment, updateEquipment, setAlertType} from "../reducers/EquipmentSlice.ts";

const EquipmentPage: React.FC = ()=> {
    const [equipmentName, setEquipmentName] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [status, setStatus] = useState("");
    const [assignedField, setAssignedField] = useState("");
    const [assignedStaff, setAssignedStaff] = useState("");
    const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

    const dispatch = useDispatch();
    const equipments = useSelector((state: RootState) => state.equipment.equipments);

    const handleFormSubmit = () => {
        if (!equipmentName || !equipmentType || !status || !assignedField || !assignedStaff) {
            // Check if all fields are filled
            alert("Please fill in all fields.");
            return;
        }

        const newEquipment = new Equipment(
            editingEquipment ? editingEquipment.equipmentID : Math.random().toString(),
            equipmentName,
            equipmentType,
            status,
            assignedField,
            assignedStaff
        );

        if (editingEquipment) {
            // Update the field if we are in editing mode
            dispatch(updateEquipment(newEquipment));
            dispatch(setAlertType('Equipment updated successfully!'));
        } else {
            // Add a new field if not editing
            dispatch(addEquipment(newEquipment));
            dispatch(setAlertType('Equipment saved successfully!'));
        }

        // Reset form fields after saving
        setEquipmentName('');
        setEquipmentType('');
        setStatus('');
        setAssignedField('');
        setAssignedStaff('');
        setEditingEquipment(null);
    };

    const handleEdit = (equipment: Equipment) => {
        setEquipmentName(equipment.equipmentName);
        setEquipmentType(equipment.equipmentType);
        setStatus(equipment.status);
        setAssignedField(equipment.assignedField);
        setAssignedStaff(equipment.assignedStaff);
        setEditingEquipment(equipment);
    };

    const handleDelete = (equipmentID: string) => {
        dispatch(deleteEquipment(equipmentID)); // Dispatch delete action
        dispatch(setAlertType('Equipment deleted successfully!'));
    };

    return (
        <div className="container mx-auto">
            {/* Crop Form */}
            <div className="bg-white p-6 mb-6 flex flex-col gap-5">
                <div className="flex gap-12 items-center">
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Equipment Name</label>
                        <input
                            type="text"
                            name="equipmentName"
                            placeholder="Equipment Name"
                            value={equipmentName}
                            onChange={(e) => setEquipmentName(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-56 text-[14px] border border-gray-300 mt-5"
                        />
                    </div>
                    <div className="mb-4">
                        <div className="flex flex-col gap-3 justify-start">
                            <h1 className="font-medium px-3">Equipment Type</h1>
                            <div className="flex items-center gap-5">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="equipmentType"
                                        value="electrical"
                                        onChange={(e) => setEquipmentType(e.target.value)}
                                        className="h-4 w-4 text-[#086568] border-gray-300 focus:ring-[#086568]"
                                    />
                                    <span className="text-gray-700">Electrical</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="equipmentType"
                                        value="mechanical"
                                        onChange={(e) => setEquipmentType(e.target.value)}
                                        className="h-4 w-4 text-[#086568] border-gray-300 focus:ring-[#086568]"
                                    />
                                    <span className="text-gray-700">Mechanical</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Status</label>
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-48 text-[14px] border border-gray-300 mt-5"
                        >
                            <option value="">Select Status</option>
                            <option value="available">Available</option>
                            <option value="outOfService">Out of Service</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Assigned Field</label>
                        <input
                            type="text"
                            name="assignedField"
                            placeholder="Assigned Field"
                            value={assignedField}
                            onChange={(e) => setAssignedField(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-[230px] text-[14px] border border-gray-300 mt-5"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Assigned Staff</label>
                        <input
                            type="text"
                            name="assignedStaff"
                            placeholder="Assigned Staff"
                            value={assignedStaff}
                            onChange={(e) => setAssignedStaff(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-52 text-[14px] border border-gray-300 mt-5"
                        />
                    </div>
                </div>
                <div>
                    <button
                        onClick={handleFormSubmit}
                        className="bg-[#086568] text-white rounded-3xl py-2 px-5"
                    >
                        {editingEquipment ? 'Update Equipment' : 'Add Equipment'}
                    </button>
                </div>
            </div>

            {/* equip List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Equipment List</h2>
                <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
                    <table className="table-auto w-full border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Equipment Name</th>
                            <th className="border px-4 py-2">Equipment Type</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Assigned Field</th>
                            <th className="border px-4 py-2">Assigned Staff</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {equipments.map((equipment, index) => (
                            <tr key={equipment.equipmentID} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                                <td className="px-4 py-2 text-gray-700">{equipment.equipmentName}</td>
                                <td className="px-4 py-2 text-gray-700">{equipment.equipmentType}</td>
                                <td className="px-4 py-2 text-gray-700">{equipment.status}</td>
                                <td className="px-4 py-2 text-gray-700">{equipment.assignedField}</td>
                                <td className="px-4 py-2 text-gray-700">{equipment.assignedStaff}</td>
                                <td className="px-4 py-2 text-center">
                                    <button className="text-blue-500 hover:text-blue-700 mx-2"
                                            onClick={() => handleEdit(equipment)}>
                                        <FontAwesomeIcon icon={faEdit} className=""/>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 mx-2"
                                            onClick={() => handleDelete(equipment.equipmentID)}>
                                        <FontAwesomeIcon icon={faTrashAlt} className=""/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EquipmentPage;