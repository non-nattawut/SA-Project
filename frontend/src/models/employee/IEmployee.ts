import { BloodGroupsInterface } from "./IBloodGroups";
import { DepartmentsInterface } from "./IDepartment";
import { GendersInterface } from "./IGender";
import { PositionsInterface } from "./IPosition";

export interface EmployeesInterface {
    [x: string]: any;
    ID: number,

    Personal_ID:    string,

	First_Name:     string,

	Last_Name:      string,

	GenderID:       number,

	Gender:			GendersInterface,

	BloodGroupsID:  number,

	BloodGroups:	BloodGroupsInterface,

	DepartmentID:   number,

	Department: 	DepartmentsInterface,

	PositionID:     number,

	Position:		PositionsInterface,
	
	Password:       string,
  }
  