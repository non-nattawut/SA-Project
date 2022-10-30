import { BloodGroupsInterface } from "../employee/IBloodGroups";
import { EmployeesInterface } from "../employee/IEmployee";
import { GendersInterface } from "../employee/IGender";
import { Patient_RightsInterface } from "./IPatient_Rights";

export interface PatientsInterface {
  ID: number;
  Patient_Personal_ID: string;
  Employee_ID: number;
  Employee: EmployeesInterface;
  Patient_Firstname: string;
  Patient_Lastname: string;
  Patient_RightsID: number;
  Patient_Rights: Patient_RightsInterface;
  BloodGroupsID: number;
  BloodGroups: BloodGroupsInterface;
  GenderID: number,
  Gender: GendersInterface;
}
