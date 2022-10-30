import { EmployeesInterface } from "../employee/IEmployee";
import { PatientsInterface } from "../patient/IPatient";

export interface DispensationsInterface {
    ID: number,
    Patient_ID: number;
    Patient: PatientsInterface;
    Employee_ID: number;
    Employee: EmployeesInterface;
}