import { DiagnosticsInterface } from "../diagnostic/IDiagnostic"
import { DispensationsInterface } from "../dispensation/IDispensation"
import { EmployeesInterface } from "../employee/IEmployee"
import { Payment_typesInterface } from "./IPayment_type"

export interface BillsInterface {

    ID:                 number,

    Diagnostic_ID:      number,

	Diagnostic:         DiagnosticsInterface,

	Dispensation_ID:    number,

	Dispensation:       DispensationsInterface,

	Employee_ID:        number,

	Employee:           EmployeesInterface,

	Payment_type_ID:    number,
    
	Payment_type:       Payment_typesInterface,

	Time_Stamp:         Date,    
  }