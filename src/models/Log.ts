export class Log{
    logCode: string;
    logDate: string;
    logDetails: string;
    observedImage: string;
    assignedCrop: string;
    assignedField: string;
    assignedStaff: string;
    cropStatus: string;


    constructor(logCode: string, logDate: string, logDetails: string, observedImage: string, assignedCrop: string, assignedField: string, assignedStaff: string, cropStatus: string) {
        this.logCode = logCode;
        this.logDate = logDate;
        this.logDetails = logDetails;
        this.observedImage = observedImage;
        this.assignedCrop = assignedCrop;
        this.assignedField = assignedField;
        this.assignedStaff = assignedStaff;
        this.cropStatus = cropStatus;
    }
}