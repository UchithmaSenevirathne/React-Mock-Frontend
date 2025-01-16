export class Staff {
    staffId: string;
    fullName: string;
    designation: string;
    gender: string;
    joinedDate: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
    role: string;


    constructor(staffId: string, fullName: string, designation: string, gender: string, joinedDate: string, dob: string, address: string, phone: string, email: string, role: string) {
        this.staffId = staffId;
        this.fullName = fullName;
        this.designation = designation;
        this.gender = gender;
        this.joinedDate = joinedDate;
        this.dob = dob;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.role = role;
    }
}