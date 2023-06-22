export type User = {
    id?: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    sex: string,
    email?: string,
    password: string,
    roleId: string,
    createdAt?: Date,
    updatedAt: Date,
    // role?: Role,
    // class?:Class,
    // instructor?:User,
    // payment?:Payment,
}

export type Role = {
    id?: string,
    name: string,
    createdAt?: Date,
    updatedAt?: Date,
    // user?: User
}

export type Membership = {
    id?:string,
    startDate:Date,
    endDate:Date,
    status:string,

    createdAt?: Date,
    updatedAt?: Date,
}
export type Class={
    id?:string,
    className:string,
    description?:string,
    startDate:Date,
    endDate:Date,
    userId:string;
    instructorId:string,
    
    createdAt?: Date,
    updatedAt?: Date,
    // attendance?:Attendance
}
export type Attendance={
    id?:string,
    date:Date,
    checkInTime?:string,
    checkOutTime?:string,
    status:string,
    classId:string,
    userId:string,
    createdAt?: Date,
    updatedAt?: Date,
}



export type Payment = {
    id?: string,
    amount: number,
    trx_ref: string,
    status: string,
    membershipPlanId: string,
    userId: string,

    createdAt?: Date,
    updatedAt: Date,

    // user?: User
}

export type MembershipPlan = {
    id?: string,
    planName: string,
    description:string,
    price:number,
    createdAt?: Date,
    updatedAt?: Date,
    // user: User,
    // payment:Payment[],
}

export type EquipmentCategory = {
    id?: string,
    name: string,
    createdAt?: Date,
    updatedAt?: Date,
    // equipment?: Equipment[],
}

export type Equipment = {
    id?: string,
    equipmentName: string,
    brand?: string,
    price?: number,
    model?: string,
    status?: string,
    purchaseDate?: Date,
    warrantyExpiryDate?: Date,
    equipmentCategoryId: string,
    description?: string,
    createdAt?: Date,
    updatedAt?: Date,

    // inventory?: Inventory[]

}

export type Inventory = {
    id?: string,
    equipmentId: string,
    quantity: number,
    createdAt?: Date,
    updatedAt?: Date,
    // equipment?:Equipment,
}