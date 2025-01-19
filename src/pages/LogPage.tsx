import React, {useState} from "react";
import {Log} from "../models/Log.ts";
import {addLog, deleteLog, setAlertType, updateLog} from "../reducers/LogSlice.ts";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {FormField} from "../component/FormField.tsx";
import {Button} from "../component/Button.tsx";


const LogPage: React.FC = ()=> {
   const [logDate, setLogDate] = useState("");
    const [logDetails, setLogDetails] = useState("");
    const [observedImage, setObservedImage] = useState<File | null>(null)
    const [assignedCrop, setAssignedCrop] = useState("");
    const [assignedField, setAssignedField] = useState("");
    const [assignedStaff, setAssignedStaff] = useState("");
    const [cropStatus, setCropStatus] = useState("");
    const [editingLog, setEditingLog] = useState<Log | null>(null);

    const dispatch = useDispatch();
    const logs = useSelector((state: RootState) => state.log.logs);

    const handleImageChange = (file: File | null, setObservedImage: React.Dispatch<React.SetStateAction<File | null>>) => {
        if (file) {
            setObservedImage(file);
        }
    };

    const handleFormSubmit = () => {
        if (!logDate || !logDetails || !observedImage || !assignedCrop || !assignedField || !assignedStaff || !cropStatus) {
            alert("Please fill in all fields and upload images.");
            return;
        }

        const newLog = new Log(
            editingLog ? editingLog.logCode : Math.random().toString(),
            logDate,
            logDetails,
            observedImage ? URL.createObjectURL(observedImage) : '',
            assignedCrop,
            assignedField,
            assignedStaff,
            cropStatus
        );

        if (editingLog) {
            dispatch(updateLog(newLog));
            dispatch(setAlertType('Log updated successfully!'));
        } else {
            dispatch(addLog(newLog));
            dispatch(setAlertType('Log saved successfully!'));
        }

        setLogDate('');
        setLogDetails('');
        setObservedImage(null);
        setAssignedCrop('');
        setAssignedField('');
        setAssignedStaff('');
        setEditingLog(null);
    };

    const handleEdit = (log: Log) => {
        setLogDate(log.logDate);
        setLogDetails(log.logDetails);
        setObservedImage(log.observedImage ? new File([log.observedImage], "image") : null);
        setAssignedCrop(log.assignedCrop);
        setAssignedField(log.assignedField);
        setAssignedStaff(log.assignedStaff);
        setEditingLog(log);
    };

    const handleDelete = (logCode: string) => {
        dispatch(deleteLog(logCode));
        dispatch(setAlertType('Log deleted successfully!'));
    };

    return (
        <div className="container mx-auto">
            {/* log Form */}
            <div className="bg-white p-6 mb-6 flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <div className="flex gap-12 items-center">
                        <FormField
                            label="Log Date"
                            type="date"
                            value={logDate}
                            onChange={setLogDate}
                            placeholder="Log Date"
                            className="w-56"
                        />
                        <div className="mb-4">
                            <label className="block font-medium text-sm">Log Details</label>
                            <textarea
                                name="logDetails"
                                placeholder="Log Details"
                                value={logDetails}
                                onChange={(e) => setLogDetails(e.target.value)}
                                className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-96 text-[14px] border border-gray-300 mt-5">
                        </textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-sm">Log Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e.target.files?.[0] ?? null, setObservedImage)}
                                className="block w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-[#086568] hover:file:bg-green-200 mt-5"
                            />
                        </div>
                    </div>
                    <div className="flex gap-12 items-center">
                        <FormField
                            label="Assign Crop<"
                            type="select"
                            value={assignedCrop}
                            onChange={setAssignedCrop}
                            options={[
                                { value: 'BG-24', label: 'BG-24' },
                                { value: 'CP-23', label: 'CP-23' },
                                { value: 'CN-34', label: 'CN-34' },
                                { value: 'CA-45', label: 'CA-45' },
                                { value: 'GM-12', label: 'GM-12' }
                            ]}
                            className="w-56"
                        />
                        <FormField
                            label="Assign Field"
                            type="select"
                            value={assignedField}
                            onChange={setAssignedField}
                            options={[
                                { value: 'Rice Palate A', label: 'Rice Palate A' },
                                { value: 'Rice Palate B', label: 'Rice Palate B' },
                                { value: 'Rice Palate C', label: 'Rice Palate C' },
                                { value: 'Cowpea Palate A', label: 'Cowpea Palate A' },
                                { value: 'Cowpea Palate B', label: 'Cowpea Palate B' },
                                { value: 'Corn Palate', label: 'Corn Palate' },
                                { value: 'Mix Palate A', label: 'Mix Palate A' },
                                { value: 'Mix Palate B', label: 'Mix Palate B' }
                            ]}
                            className="w-56"
                        />
                        <FormField
                            label="Assign Staff"
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
                            className="w-96"
                        />
                        <div className="mb-4">
                            <div className="flex flex-col gap-3 justify-start">
                                <h1 className="font-medium px-3">Crop Status</h1>
                                <div className="flex items-center gap-5">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="cropStatus"
                                            value="good"
                                            onChange={(e) => setCropStatus(e.target.value)}
                                            className="h-4 w-4 text-[#086568] border-gray-300 focus:ring-[#086568]"
                                        />
                                        <span className="text-gray-700">Good</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="cropStatus"
                                            value="normal"
                                            onChange={(e) => setCropStatus(e.target.value)}
                                            className="h-4 w-4 text-[#086568] border-gray-300 focus:ring-[#086568]"
                                        />
                                        <span className="text-gray-700">Normal</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="cropStatus"
                                            value="poor"
                                            onChange={(e) => setCropStatus(e.target.value)}
                                            className="h-4 w-4 text-[#086568] border-gray-300 focus:ring-[#086568]"
                                        />
                                        <span className="text-gray-700">Poor</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Button onClick={handleFormSubmit}>
                        {editingLog ? 'Update Log' : 'Add Log'}
                    </Button>
                </div>
            </div>

            {/* Crop List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
                    <table className="table-auto w-full border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-gray-600">#</th>
                            <th className="border px-4 py-2 text-gray-600">Log Date</th>
                            <th className="border px-4 py-2 text-gray-600">Log Details</th>
                            <th className="border px-4 py-2 text-gray-600">Crop Status</th>
                            <th className="border px-4 py-2 text-gray-600">Assign Crop</th>
                            <th className="border px-4 py-2 text-gray-600">Assign Field</th>
                            <th className="border px-4 py-2 text-gray-600">Assign Staff</th>
                            <th className="border px-4 py-2 text-gray-600">Observed Image</th>
                            <th className="border px-4 py-2 text-gray-600">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            logs.length > 0 ? (
                                logs.map((log, index) => (
                            <tr key={log.logCode} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                                <td className="px-4 py-2 text-gray-700">{log.logDate}</td>
                                <td className="px-4 py-2 text-gray-700">{log.logDetails}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span className="inline-block px-2 py-1 text-xs text-green-700 bg-green-200 rounded-full">{log.cropStatus}</span>
                                </td>
                                <td className="px-4 py-2 text-gray-700">{log.assignedCrop}</td>
                                <td className="px-4 py-2 text-gray-700">{log.assignedField}</td>
                                <td className="px-4 py-2 text-gray-700">{log.assignedStaff}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    {log.observedImage && (
                                        <img
                                            src={log.observedImage}
                                            alt="Log Observed Image"
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button className="text-blue-500 hover:text-blue-700 mx-2"
                                            onClick={() => handleEdit(log)}>
                                        <FontAwesomeIcon icon={faEdit} className=""/>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 mx-2"
                                            onClick={() => handleDelete(log.logCode)}>
                                        <FontAwesomeIcon icon={faTrashAlt} className=""/>
                                    </button>
                                </td>
                            </tr>
                        ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center text-gray-500 py-5">
                                        No Logs available
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

export default LogPage;

{/*<div className="mb-4">*/}
{/*    <label className="block font-medium text-sm">Log Date</label>*/}
{/*    <input*/}
{/*        type="date"*/}
{/*        name="logDate"*/}
{/*        placeholder="Log Date"*/}
{/*        value={logDate}*/}
{/*        onChange={(e) => setLogDate(e.target.value)}*/}
{/*        className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-56 text-[14px] border border-gray-300 mt-5"*/}
{/*    />*/}
{/*</div>*/}

{/*<div className="mb-4">*/}
{/*    <label className="block font-medium text-sm">Assign Crop</label>*/}
{/*    <select*/}
{/*        name="assignedCrop"*/}
{/*        value={assignedCrop}*/}
{/*        onChange={(e) => setAssignedCrop(e.target.value)}*/}
{/*        className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-56 text-[14px] border border-gray-300 mt-5"*/}
{/*    >*/}
{/*        <option value="bg-24">BG-24</option>*/}
{/*        <option value="cp-23">CP-23</option>*/}
{/*        <option value="cn-34">CN-34</option>*/}
{/*        <option value="ca-45">CA-45</option>*/}
{/*        <option value="gm-12">GM-12</option>*/}
{/*    </select>*/}
{/*</div>*/}

{/*<div className="mb-4">*/}
{/*    <label className="block font-medium text-sm">Assign Field</label>*/}
{/*    <select*/}
{/*        name="assignedField"*/}
{/*        value={assignedField}*/}
{/*        onChange={(e) => setAssignedField(e.target.value)}*/}
{/*        className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-56 text-[14px] border border-gray-300 mt-5"*/}
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
{/*    <label className="block font-medium text-sm">Assign Staff</label>*/}
{/*    <select*/}
{/*        name="assignedStaff"*/}
{/*        value={assignedStaff}*/}
{/*        onChange={(e) => setAssignedStaff(e.target.value)}*/}
{/*        className="bg-white rounded-3xl py-2 px-3 text-gray-600 w-96 text-[14px] border border-gray-300 mt-5"*/}
{/*    >*/}
{/*        <option value="C-1">Uchithma Senevirathne (C-1)</option>*/}
{/*        <option value="C-2">Iman Adithya (C-2)</option>*/}
{/*        <option value="C-3">John Doe (C-3)</option>*/}
{/*        <option value="C-4">Jane Doe (C-4)</option>*/}
{/*        <option value="C-5">July Doe (C-5)</option>*/}
{/*        <option value="C-6">Saman Pereira (C-6)</option>*/}
{/*    </select>*/}
{/*</div>*/}

{/*<button*/}
{/*    onClick={handleFormSubmit}*/}
{/*    className="bg-[#086568] text-white rounded-3xl py-2 px-5"*/}
{/*>*/}
{/*    {editingLog ? 'Update Log' : 'Add Log'}*/}
{/*</button>*/}