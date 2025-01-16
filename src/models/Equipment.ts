export class Equipment {
    equipmentID: string;
    equipmentName: string;
    equipmentType: string;
    status: string;
    assignedField: string;
    assignedStaff: string;


    constructor(equipmentID: string, equipmentName: string, equipmentType: string, status: string, assignedField: string, assignedStaff: string) {
        this.equipmentID = equipmentID;
        this.equipmentName = equipmentName;
        this.equipmentType = equipmentType;
        this.status = status;
        this.assignedField = assignedField;
        this.assignedStaff = assignedStaff;
    }
}