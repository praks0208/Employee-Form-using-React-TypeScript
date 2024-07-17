// types.ts
export interface EmployeeFormState {
    firstName: string;
    lastName: string;
    employeeCode: string;
    contact: string;
    dob: string;
    address: string;
  }
  
  export interface EmployeeFormErrors {
    firstName?: string;
    lastName?: string;
    employeeCode?: string;
    contact?: string;
    dob?: string;
    address?: string;
  }
  