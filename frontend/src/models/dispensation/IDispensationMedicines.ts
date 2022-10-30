import { MedicinesInterface } from "./IMedicine";
import { DispensationsInterface } from "./IDispensation";

export interface DispensationMedicinesInterface {
    ID: number,
    Dispensation_ID: number;
    Dispensation: DispensationsInterface;
    Medicine_ID: number;
    Medicine: MedicinesInterface;
    Medicine_Amount: number;
    Time_Stamp: Date | null;
}