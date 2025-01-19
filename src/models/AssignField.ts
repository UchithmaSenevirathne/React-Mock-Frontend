export class AssignField{
    assignCode: string;
    assignedDate: string;
    dueDate: string;
    assignedField: string;
    assignedStaffs: string[];


    constructor(assignCode: string, assignedDate: string, dueDate: string, assignedField: string, assignedStaffs: string[]) {
        this.assignCode = assignCode;
        this.assignedDate = assignedDate;
        this.dueDate = dueDate;
        this.assignedField = assignedField;
        this.assignedStaffs = assignedStaffs;
    }
}