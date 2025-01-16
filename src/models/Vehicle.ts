export class Vehicle{
    vehicleID: string;
    licensePlateNo: string;
    category: string;
    fuelType: string;
    status: string;
    remarks: string;
    assignedStaff: string;


    constructor(vehicleID: string, licensePlateNo: string, category: string, fuelType: string, status: string, remarks: string, assignedStaff: string) {
        this.vehicleID = vehicleID;
        this.licensePlateNo = licensePlateNo;
        this.category = category;
        this.fuelType = fuelType;
        this.status = status;
        this.remarks = remarks;
        this.assignedStaff = assignedStaff;
    }
}