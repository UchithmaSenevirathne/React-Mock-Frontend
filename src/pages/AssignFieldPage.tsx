import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {AssignField} from "../models/AssignField.ts";
import {addAssign, deleteAssign, updateAssign, setAlertType} from "../reducers/AssignFieldSlice.ts";

const AssignFieldPage: React.FC = ()=> {
    const [assignedDate, setAssignedDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [assignedField, setAssignedField] = useState("");
    const [assignedStaffs, setAssignedStaffs] = useState<string[]>([]);
    const [editingAssigns, setEditingAssigns] = useState<AssignField | null>(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const staffList = [
        { value: "C-1 Uchithma Senevirathne", label: "Uchithma Senevirathne (C-1)" },
        { value: "C-2 Iman Adithya", label: "Iman Adithya (C-2)" },
        { value: "C-3 John Doe", label: "John Doe (C-3)" },
        { value: "C-4 Jane Doe", label: "Jane Doe (C-4)" },
        { value: "C-5 July Doe", label: "July Doe (C-5)" },
        { value: "C-6 Saman Pereira", label: "Saman Pereira (C-6)" },
    ];

    const dispatch = useDispatch();
    const assigns = useSelector((state: RootState) => state.assignField.assigns)

    const handleFormSubmit = () => {
        if (!assignedDate || !dueDate || !assignedField || !assignedStaffs) {
            // Check if all fields are filled
            alert("Please fill in all fields.");
            return;
        }

        const newAssigns = new AssignField(
            editingAssigns ? editingAssigns.assignCode : Math.random().toString(),
            assignedDate,
            dueDate,
            assignedField,
            assignedStaffs
        );

        if (editingAssigns) {
            // Update the field if we are in editing mode
            dispatch(updateAssign(newAssigns));
            dispatch(setAlertType('Assign updated successfully!'));
        } else {
            // Add a new field if not editing
            dispatch(addAssign(newAssigns));
            dispatch(setAlertType('Field Assigned successfully!'));
        }

        // Reset form fields after saving
        setAssignedDate('');
        setDueDate('');
        setAssignedField('');
        setAssignedStaffs([]);
        setEditingAssigns(null);
    };

    const handleEdit = (assignField: AssignField) => {
        setAssignedDate(assignField.assignedDate);
        setDueDate(assignField.dueDate);
        setAssignedField(assignField.assignedField);
        setAssignedStaffs(assignField.assignedStaffs);
        setEditingAssigns(assignField);
    };

    const handleDelete = (assignCode: string) => {
        dispatch(deleteAssign(assignCode)); // Dispatch delete action
        dispatch(setAlertType('Assign deleted successfully!'));
    };

    return (
        <div className="container mx-auto">
            {/* assign Form */}
            <div className="bg-white p-6 mb-6 flex flex-col gap-5">
                <div className="flex gap-12 items-center">
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Assigned Date</label>
                        <input
                            type="date"
                            name="assignedDate"
                            placeholder="Assigned Date"
                            value={assignedDate}
                            onChange={(e) => setAssignedDate(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-56 text-[14px] border border-gray-300 mt-5"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            placeholder="Due Date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-56 text-[14px] border border-gray-300 mt-5"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Assign Field</label>
                        <select
                            name="assignedField"
                            value={assignedField}
                            onChange={(e) => setAssignedField(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-56 text-[14px] border border-gray-300 mt-5"
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
                    <div className="relative mb-4">
                        <label className="block font-medium text-sm mb-2">Assign Staffs</label>
                        {/* Dropdown Button */}
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="bg-white w-96 border border-gray-300 rounded-3xl py-2 px-3 text-gray-600 text-[14px] flex justify-between items-center mt-5"
                        >
                            {assignedStaffs.length > 0
                                ? assignedStaffs.map((staff) => staff.split(" ")[1]).join(", ")
                                : "Select Staffs"}
                            <svg
                                className={`w-5 h-5 transition-transform ${
                                    isDropdownOpen ? "rotate-180" : ""
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div
                                className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto">
                                <div className="p-2">
                                    {staffList.map((staff) => (
                                        <label
                                            key={staff.value}
                                            className="flex items-center space-x-2 px-3 py-1 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                value={staff.value}
                                                checked={assignedStaffs.includes(staff.value)}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (e.target.checked) {
                                                        setAssignedStaffs([...assignedStaffs, value]); // Add to the state
                                                    } else {
                                                        setAssignedStaffs(
                                                            assignedStaffs.filter((item) => item !== value)
                                                        ); // Remove from the state
                                                    }
                                                }}
                                                className="form-checkbox text-blue-500"
                                            />
                                            <span className="text-gray-600">{staff.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
                <div>
                    <button
                        onClick={handleFormSubmit}
                        className="bg-[#086568] text-white rounded-3xl py-2 px-5"
                    >
                        {editingAssigns ? 'Update Assign' : 'Assign Field'}
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
                    <table className="table-auto w-full border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-gray-600">#</th>
                            <th className="border px-4 py-2 text-gray-600">Assigned Date</th>
                            <th className="border px-4 py-2 text-gray-600">Due Date</th>
                            <th className="border px-4 py-2 text-gray-600">Assigned Field</th>
                            <th className="border px-4 py-2 text-gray-600">Assigned Staffs</th>
                            <th className="border px-4 py-2 text-gray-600">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {assigns.length > 0 ? (
                            assigns.map((assign, index) => (
                                <tr key={assign.assignCode} className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-2 text-gray-700">A-{index + 1}</td>
                                    <td className="px-4 py-2 text-gray-700">{assign.assignedDate}</td>
                                    <td className="px-4 py-2 text-gray-700">{assign.dueDate}</td>
                                    <td className="px-4 py-2 text-gray-700">{assign.assignedField}</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {assign.assignedStaffs.map((staff, index) => (
                                            <div key={index}>{staff}</div>
                                        ))}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button className="text-blue-500 hover:text-blue-700 mx-2"
                                                onClick={() => handleEdit(assign)}>
                                            <FontAwesomeIcon icon={faEdit} className=""/>
                                        </button>
                                        <button className="text-red-500 hover:text-red-700 mx-2"
                                                onClick={() => handleDelete(assign.assignCode)}>
                                            <FontAwesomeIcon icon={faTrashAlt} className=""/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="text-center text-gray-500 py-5">
                                    No Assigns available
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

export default AssignFieldPage;