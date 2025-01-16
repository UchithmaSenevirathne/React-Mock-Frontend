import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Vehicle} from "../models/Vehicle.ts";
import {addVehicle, deleteVehicle, updateVehicle, setAlertType} from "../reducers/VehicleSlice.ts";

const VehiclePage: React.FC = ()=> {
    const [licensePlateNo, setLicensePlateNo] = useState("");
    const [category, setCategory] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("");
    const [assignedStaff, setAssignedStaff] = useState("");
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

    const dispatch = useDispatch();
    const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);

    const handleFormSubmit = () => {
        if (!licensePlateNo || !category || !fuelType || !status || !remarks || !assignedStaff) {
            // Check if all fields are filled
            alert("Please fill in all fields.");
            return;
        }

        const newVehicle = new Vehicle(
            editingVehicle ? editingVehicle.vehicleID : Math.random().toString(),
            licensePlateNo,
            category,
            fuelType,
            status,
            remarks,
            assignedStaff
        );

        if (editingVehicle) {
            // Update the field if we are in editing mode
            dispatch(updateVehicle(newVehicle));
            dispatch(setAlertType('Vehicle updated successfully!'));
        } else {
            // Add a new field if not editing
            dispatch(addVehicle(newVehicle));
            dispatch(setAlertType('Vehicle saved successfully!'));
        }

        // Reset form fields after saving
        setLicensePlateNo('');
        setCategory('');
        setFuelType('');
        setStatus('');
        setRemarks('');
        setAssignedStaff('');
        setEditingVehicle(null);
    };

    const handleEdit = (vehicle: Vehicle) => {
        setLicensePlateNo(vehicle.licensePlateNo);
        setCategory(vehicle.category);
        setFuelType(vehicle.fuelType);
        setStatus(vehicle.status);
        setRemarks(vehicle.remarks);
        setAssignedStaff(vehicle.assignedStaff);
        setEditingVehicle(vehicle);
    };

    const handleDelete = (vehicleID: string) => {
        dispatch(deleteVehicle(vehicleID)); // Dispatch delete action
        dispatch(setAlertType('Vehicle deleted successfully!'));
    };

    return (
        <div className="container mx-auto">
            {/* vehicle Form */}
            <div className="bg-white p-6 mb-6 flex flex-col gap-5">
                <div className="flex gap-12 items-center">
                    <div className="mb-4">
                        <label className="block font-medium text-sm">License Plate No</label>
                        <input
                            type="text"
                            name="licensePlateNo"
                            placeholder="License Plate No"
                            value={licensePlateNo}
                            onChange={(e) => setLicensePlateNo(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-56 text-[14px] border border-gray-300 mt-5"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-sm">Category</label>
                        <select
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-48 text-[14px] border border-gray-300 mt-5"
                        >
                            <option value="">Select Category</option>
                            <option value="landmaster">Land Master</option>
                            <option value="tractor">Tractor</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <div className="flex flex-col gap-3 justify-start">
                            <h1 className="font-medium px-3">Fuel Type</h1>
                            <div className="flex items-center gap-5">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="fuelType"
                                        value="petrol"
                                        onChange={(e) => setFuelType(e.target.value)}
                                        className="h-4 w-4 text-[#086568] border-gray-300 focus:ring-[#086568]"
                                    />
                                    <span className="text-gray-700">Petrol</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="fuelType"
                                        value="diesel"
                                        onChange={(e) => setFuelType(e.target.value)}
                                        className="h-4 w-4 text-[#086568] border-gray-300 focus:ring-[#086568]"
                                    />
                                    <span className="text-gray-700">Diesel</span>
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
                        <label className="block font-medium text-sm">Remarks</label>
                        <textarea
                            name="remarks"
                            placeholder="Reamarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-[230px] text-[14px] border border-gray-300 mt-5">
                        </textarea>
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
                        {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
                    <table className="table-auto w-full border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">License Plate No</th>
                            <th className="border px-4 py-2">Category</th>
                            <th className="border px-4 py-2">Fuel Type</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Remarks</th>
                            <th className="border px-4 py-2">Assigned Staff</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {vehicles.map((vehicle, index) => (
                            <tr key={vehicle.vehicleID} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                                <td className="px-4 py-2 text-gray-700">{vehicle.licensePlateNo}</td>
                                <td className="px-4 py-2 text-gray-700">{vehicle.category}</td>
                                <td className="px-4 py-2 text-gray-700">{vehicle.fuelType}</td>
                                <td className="px-4 py-2 text-gray-700">{vehicle.status}</td>
                                <td className="px-4 py-2 text-gray-700">{vehicle.remarks}</td>
                                <td className="px-4 py-2 text-gray-700">{vehicle.assignedStaff}</td>
                                <td className="px-4 py-2 text-center">
                                    <button className="text-blue-500 hover:text-blue-700 mx-2"
                                            onClick={() => handleEdit(vehicle)}>
                                        <FontAwesomeIcon icon={faEdit} className=""/>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 mx-2"
                                            onClick={() => handleDelete(vehicle.vehicleID)}>
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

export default VehiclePage;