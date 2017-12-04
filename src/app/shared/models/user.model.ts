
export interface CompanyModel {
    id?:any, 
    title: string,
    ownership: string,
    zkpo: string,
    tax_form:string,
    official_address: string,
    manager_name: string,
    manager_phone: string,
    physical_address: string,
    liable_name: string,
    liable_phone: string,
    additional_info: string,
    phone: string 
}

export interface UserModel {
    id?: any,
    name: string,
    phone: string,
    password: string,
    password_confirmation: string,
    email: string,
    car: string,
    role: string
}
