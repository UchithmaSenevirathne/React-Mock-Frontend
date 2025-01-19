import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Vehicle} from "../models/Vehicle.ts";
import {addVehicle, deleteVehicle, updateVehicle, setAlertType} from "../reducers/VehicleSlice.ts";
import {FormField} from "../component/FormField.tsx";
import {Button} from "../component/Button.tsx";

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
            dispatch(updateVehicle(newVehicle));
            dispatch(setAlertType('Vehicle updated successfully!'));
        } else {
            dispatch(addVehicle(newVehicle));
            dispatch(setAlertType('Vehicle saved successfully!'));
        }

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
        dispatch(deleteVehicle(vehicleID));
        dispatch(setAlertType('Vehicle deleted successfully!'));
    };

    return (
        <div className="container mx-auto">
            {/* vehicle Form */}
            <div className="bg-white p-6 mb-6 flex flex-col gap-5">
                <div className="flex gap-12 items-center">
                    <FormField
                        label="License Plate No"
                        type="text"
                        value={licensePlateNo}
                        onChange={setLicensePlateNo}
                        placeholder="License Plate No"
                        className="w-56"
                    />
                    <FormField
                        label="Category"
                        type="select"
                        value={category}
                        onChange={setCategory}
                        options={[
                            { value: 'Land Master', label: 'Land Master' },
                            { value: 'Tractor', label: 'Tractor' },
                        ]}
                        className="w-48"
                    />
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
                    <FormField
                        label="Status"
                        type="select"
                        value={status}
                        onChange={setStatus}
                        options={[
                            { value: 'Available', label: 'Available' },
                            { value: 'Out of Service', label: 'Out of Service' },
                        ]}
                        className="w-48"
                    />
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
                    <FormField
                        label="Assigned Staff"
                        type="select"
                        value={assignedStaff}
                        onChange={setAssignedStaff}
                        options={[
                            { value: 'Uchithma Senevirathne (C-1)', label: 'Uchithma Senevirathne (C-1)' },
                            { value: 'Iman Adithya (C-2)', label: 'Iman Adithya (C-2)' },
                            { value: 'John Doe (C-3)', label: 'John Doe (C-3)' },
                            { value: 'Jane Doe (C-4)', label: 'Jane Doe (C-4)' },
                            { value: 'July Doe (C-5)', label: 'July Doe (C-5)' }
                        ]}
                        className="w-60"
                    />
                </div>
                <div>
                    <Button onClick={handleFormSubmit}>
                        {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                    </Button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
                    <table className="table-auto w-full border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-gray-600">#</th>
                            <th className="border px-4 py-2 text-gray-600">License Plate No</th>
                            <th className="border px-4 py-2 text-gray-600">Category</th>
                            <th className="border px-4 py-2 text-gray-600">Fuel Type</th>
                            <th className="border px-4 py-2 text-gray-600">Status</th>
                            <th className="border px-4 py-2 text-gray-600">Remarks</th>
                            <th className="border px-4 py-2 text-gray-600">Assigned Staff</th>
                            <th className="border px-4 py-2 text-gray-600">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {vehicles.length > 0 ? (
                            vehicles.map((vehicle, index) => (
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
                        ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="text-center text-gray-500 py-5">
                                    No Vehicles available
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

export default VehiclePage;

{/*<div className="mb-4">*/}
{/*    <label className="block font-medium text-sm">License Plate No</label>*/}
{/*    <input*/}
{/*        type="text"*/}
{/*        name="licensePlateNo"*/}
{/*        placeholder="License Plate No"*/}
{/*        value={licensePlateNo}*/}
{/*        onChange={(e) => setLicensePlateNo(e.target.value)}*/}
{/*        className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-56 text-[14px] border border-gray-300 mt-5"*/}
{/*    />*/}
{/*</div>*/}

{/*<div className="mb-4">*/}
{/*    <label className="block font-medium text-sm">Category</label>*/}
{/*    <select*/}
{/*        name="category"*/}
{/*        value={category}*/}
{/*        onChange={(e) => setCategory(e.target.value)}*/}
{/*        className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-48 text-[14px] border border-gray-300 mt-5"*/}
{/*    >*/}
{/*        <option value="landmaster">Land Master</option>*/}
{/*        <option value="tractor">Tractor</option>*/}
{/*    </select>*/}
{/*</div>*/}

{/*<div className="mb-4">*/}
{/*    <label className="block font-medium text-sm">Status</label>*/}
{/*    <select*/}
{/*        name="status"*/}
{/*        value={status}*/}
{/*        onChange={(e) => setStatus(e.target.value)}*/}
{/*        className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-48 text-[14px] border border-gray-300 mt-5"*/}
{/*    >*/}
{/*        <option value="available">Available</option>*/}
{/*        <option value="outOfService">Out of Service</option>*/}
{/*    </select>*/}
{/*</div>*/}

{/*<div className="mb-4">*/}
{/*    <label className="block font-medium text-sm">Assigned Staff</label>*/}
{/*    <input*/}
{/*        type="text"*/}
{/*        name="assignedStaff"*/}
{/*        placeholder="Assigned Staff"*/}
{/*        value={assignedStaff}*/}
{/*        onChange={(e) => setAssignedStaff(e.target.value)}*/}
{/*        className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-52 text-[14px] border border-gray-300 mt-5"*/}
{/*    />*/}
{/*</div>*/}

{/*<button*/}
{/*    onClick={handleFormSubmit}*/}
{/*    className="bg-[#086568] text-white rounded-3xl py-2 px-5"*/}
{/*>*/}
{/*    {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}*/}
{/*</button>*/}