import { Diagnostic_TypesInterface } from "./IDiagnostic_Type"
import { DiseasesInterface } from "./IDisease"
import { EmployeesInterface } from "../employee/IEmployee"
import { PatientsInterface } from "../patient/IPatient"

export interface DiagnosticsInterface {

    ID: number,

    Employee_ID:        number,

	Employee:           EmployeesInterface,

	Symptom:            string,

	Diagnostic_TypeID:  number,

	Diagnostic_Type:    Diagnostic_TypesInterface,

	Disease_ID:         number,

	Disease:            DiseasesInterface,

	Patient_ID:         number,
    
	Patient:            PatientsInterface,
  }
  