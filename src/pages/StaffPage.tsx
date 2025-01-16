import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Staff} from "../models/Staff.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {addStaff, updateStaff, setAlertType, deleteStaff} from "../reducers/StaffSlice.ts";

const StaffPage: React.FC = ()=> {
    const [fullName, setFullName] = useState("");
    const [designation, setDesignation] = useState("");
    const [gender, setGender] = useState("");
    const [joinedDate, setJoinedDate] = useState("");
    const [dob,setDob] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

    const dispatch = useDispatch();
    const staffs = useSelector((state: RootState) => state.staff.staffs)

    const handleStaffSave = () => {
        if (!fullName || !designation || !gender || !joinedDate || !dob || !address || !phone || !email || !role) {
            // Check if all fields are filled
            alert("Please fill in all fields.");
            return;
        }

        const newStaff = new Staff(
            editingStaff ? editingStaff.staffId : Math.random().toString(),
            fullName,
            designation,
            gender,
            joinedDate,
            dob,
            address,
            phone,
            email,
            role
        );

        if (editingStaff) {
            // Update the field if we are in editing mode
            dispatch(updateStaff(newStaff));
            dispatch(setAlertType('Staff updated successfully!'));
        } else {
            // Add a new field if not editing
            dispatch(addStaff(newStaff));
            dispatch(setAlertType('Staff saved successfully!'));
        }

        // Reset form fields after saving
        setFullName('');
        setDesignation('');
        setGender('');
        setJoinedDate('');
        setDob('');
        setAddress('');
        setPhone('');
        setEmail('');
        setRole('');
        setEditingStaff(null);
    };

    const handleUpdate = (staff: Staff) => {
        setFullName(staff.fullName);
        setDesignation(staff.designation);
        setGender(staff.gender);
        setJoinedDate(staff.joinedDate);
        setDob(staff.dob);
        setAddress(staff.address);
        setPhone(staff.phone);
        setEmail(staff.email);
        setRole(staff.role);
        setEditingStaff(staff);
    };

    const handleDelete = (staffId: string) => {
        dispatch(deleteStaff(staffId)); // Dispatch delete action
        dispatch(setAlertType('Staff deleted successfully!'));
    };

    return (
        <div className="container mx-auto">
            {/* Staff Form */}
            <div className="bg-white p-6 mb-6 flex flex-col gap-5">
                <div className="flex flex-col gap-5 justify-center">
                    <div className="flex gap-12 items-center">
                        <div className="mb-4">
                            <label className="block font-medium text-sm">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-60 text-[14px] border border-gray-300 mt-5"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-sm">Designation</label>
                            <select
                                name="designation"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-60 text-[14px] border border-gray-300 mt-5"
                            >
                                <option value="">Select Designation</option>
                                <option value="Manager">Manager</option>
                                <option value="HR">HR</option>
                                <option value="Driver">Driver</option>
                                <option value="Labour">Labour</option>
                                <option value="Scientist">Scientist</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-col gap-3 justify-start">
                                <h1 className="font-medium px-3">Gender</h1>
                                <div className="flex items-center gap-5">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            onChange={(e) => setGender(e.target.value)}
                                            className="h-4 w-4 text-[#086568] border-gray-300 focus:ring-[#086568]"
                                        />
                                        <span className="text-gray-700">Male</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            onChange={(e) => setGender(e.target.value)}
                                            className="h-4 w-4 text-[#086568] border-gray-300 focus:ring-[#086568]"
                                        />
                                        <span className="text-gray-700">Female</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-sm">Joined Date</label>
                            <input
                                type="date"
                                name="joinedDate"
                                placeholder="Joined Date"
                                value={joinedDate}
                                onChange={(e) => setJoinedDate(e.target.value)}
                                className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-60 text-[14px] border border-gray-300 mt-5"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-sm">DOB</label>
                            <input
                                type="date"
                                name="dob"
                                placeholder="DOB"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-60 text-[14px] border border-gray-300 mt-5"
                            />
                        </div>
                    </div>
                    <div className="flex gap-10 items-center">
                        <div className="mb-4">
                            <label className="block font-medium text-sm">Address</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-96 text-[14px] border border-gray-300 mt-5"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-sm">Contact No</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Contact No"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-56 text-[14px] border border-gray-300 mt-5"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-sm">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-96 text-[14px] border border-gray-300 mt-5"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-sm">Role</label>
                            <select
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-48 text-[14px] border border-gray-300 mt-5"
                            >
                                <option value="">Select Role</option>
                                <option value="Manager">Manager</option>
                                <option value="Administrative">Administrative</option>
                                <option value="Scientist">Scientist</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    </div>
                    <div>
                        <button
                            onClick={handleStaffSave}
                            className="bg-[#086568] text-white rounded-3xl py-2 px-5"
                        >
                            {editingStaff ? 'Update Staff' : 'Add Staff'}
                        </button>
                    </div>
                </div>

                {/* Staff List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Staff List</h2>
                <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
                    <table className="table-auto w-full border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Full Name</th>
                            <th className="border px-4 py-2">Designation</th>
                            <th className="border px-4 py-2">Gender</th>
                            <th className="border px-4 py-2">Joined Date</th>
                            <th className="border px-4 py-2">DOB</th>
                            <th className="border px-4 py-2">Address</th>
                            <th className="border px-4 py-2">Phone</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Role</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {staffs.map((staff, index) => (
                            <tr key={staff.staffId} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                                <td className="px-4 py-2 text-gray-700">{staff.fullName}</td>
                                <td className="px-4 py-2 text-gray-700">{staff.designation}</td>
                                <td className="px-4 py-2 text-gray-700">{staff.gender}</td>
                                <td className="px-4 py-2 text-gray-700">{staff.joinedDate}</td>
                                <td className="px-4 py-2 text-gray-700">{staff.dob}</td>
                                <td className="px-4 py-2 text-gray-700">{staff.address}</td>
                                <td className="px-4 py-2 text-gray-700">{staff.phone}</td>
                                <td className="px-4 py-2 text-gray-700">{staff.email}</td>
                                <td className="px-4 py-2 text-gray-700">{staff.role}</td>
                                <td className="px-4 py-2 text-center">
                                    <button className="text-blue-500 hover:text-blue-700 mx-2"
                                            onClick={() => handleUpdate(staff)}>
                                        <FontAwesomeIcon icon={faEdit} className=""/>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 mx-2"
                                            onClick={() => handleDelete(staff.staffId)}>
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

export default StaffPage;