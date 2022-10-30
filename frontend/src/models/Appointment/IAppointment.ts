import { DepartmentsInterface } from "../employee/IDepartment";
import { PatientsInterface } from "../patient/IPatient";

export interface AppointmentsInterface {
    [x: string]: any;
    ID: number,

    Employee_ID: number,

    Patient_ID: number,

    Patient:  PatientsInterface,
 
    APP_OUT: Date,
 
    APP_IN: Date,
 
    APP_NOTE: string,
 
    DepartmentID: number,

    Department:  DepartmentsInterface,
  }
  