import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Autocomplete, Button } from "@mui/material";
import { Container } from "@mui/system";
import { Snackbar, Alert } from "@mui/material";
import TextField from '@mui/material/TextField';

import SaveIcon from "@mui/icons-material/Save";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs ,{ Dayjs } from "dayjs";

import { PatientsInterface } from "../models/patient/IPatient";
import { MedicinesInterface } from "../models/dispensation/IMedicine";
import { DispensationMedicinesInterface } from "../models/dispensation/IDispensationMedicines";
import { DispensationsInterface } from "../models/dispensation/IDispensation";

import DispensationTable_UI from "./DispensationTable_UI";

function Dispensation(){
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());
    const [Medicine_Amount, SetMedicine_Amount] = React.useState<number | null>(null);
    const [NOWdispensationID, SetNOWdispensationID] = React.useState<number | null>(null);
    
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [noAccess, setNoAccess] = React.useState(false);

//============================================== HANDLE SECTION ==============================================

    // บันทึกค่าลง dispensation medicine
    const handleChangeMedicine_Name = (event: any, value: any) => {
        setDispensation_medicines({ ...dispensation_medicines, Medicine_ID: value?.ID }); // บันทึกค่าลง interface
    };

    const handleClose = ( // AlertBar
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
        setNoAccess(false);
    };

//============================================== START step 9 บันทึกใบสั่งยา() ==============================================

    /* Insert */
    async function submit() {
        if(localStorage.getItem("positionid") == "1"){ // เป็นหมอจริง จะบันทึกได้
            let data_dispensation = {
                Patient_ID: dispensations.Patient_ID,
                Employee_ID: Number(localStorage.getItem("uid")),
            };

            let data_dispensation_medicine = {
                Dispensation_ID: dispensationID,
                Medicine_ID: dispensation_medicines.Medicine_ID,
                Medicine_Amount: Medicine_Amount,
                Time_Stamp: date,
            };

            const apiUrl = "http://localhost:8080";

            const requestOptions_dispensation = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data_dispensation),
            };

            const requestOptions_dispensation_medicine = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data_dispensation_medicine),
            };

            // ต้องใช้ await ไม่งั้นมันจะไปทำคำสั่งต่อไปเลยโดยไม่รอคำสั่งนี้ทำเสร็จ แล้วมันจะแจ้งว่าหา dispensationID ไม่เจอ */
            if(dispensationID != NOWdispensationID){ // หากค่าเท่ากันจะไม่บันทึกซ้ำอีกรอบ
                // ตรวจสอบว่า Medicine ID และ Amount ได้ถูกกรอกร/เลือก หรือไม่ ถ้าไม่ถูกกรอกจะไม่ทำการ fetch และ
                // พอ fetch dsiepnsation medicine ก็จะแจ้ง error เพราะหา dispensation ไม่เจอ เนื่องจากมันไม่ถุก create จากตรงนี้
                if(data_dispensation_medicine.Medicine_Amount && data_dispensation_medicine.Medicine_ID){ // หากเป็น null จะเป็นเท็จ
                    await fetch(`${apiUrl}/dispensations`, requestOptions_dispensation)
                        .then((response) => response.json())
                        .then((res) => {
                        if (res.data) {
                            SetNOWdispensationID(dispensationID)
                            setSuccess(true)
                        } else {
                            setError(true)
                        }
                        });
                    }
            }

            await fetch(`${apiUrl}/dispensation_medicines`, requestOptions_dispensation_medicine)
                .then((response) => response.json())
                .then((res) => {
                    if (res.data) { 
                        setSuccess(true)
                    } else {
                        setError(true)
                    }
                });

        } else {
            setNoAccess(true)  // alert คุณไม่มีสิทธิการเข้าถึง
        }

    }

//============================================== END step 9 บันทึกใบสั่งยา() ==============================================

//============================================== START step 4 เตรียมข้อมูลให้หน้าจอ() ==============================================

    const [dispensation_medicines, setDispensation_medicines] = React.useState<Partial<DispensationMedicinesInterface>>({});
    const [dispensations, setDispensations] = React.useState<Partial<DispensationsInterface>>({});
    const [dispensationID, SetDispensationID] = React.useState<number | null>(null);
    const [medicines, setMedicines] = React.useState<MedicinesInterface[]>([]);
    const [patients, setPatients] = React.useState<PatientsInterface[]>([]);

    //** 5: ดึงข้อมูลทั้งหมด() */
    const getDispensations = async () => {
        const apiUrl = "http://localhost:8080/dispensations";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
       
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    SetDispensationID((res.data.at(-1).ID)+1); // ตรวจสอบเอาเฉพาะ dispensationID ล่าสุด
                }else{
                    SetDispensationID(1);
                }
            });
    };

    //** 6: ดึงข้อมูลทั้งหมด() */
    const getPatients = async () => {
        const apiUrl = "http://localhost:8080/patients";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
       
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setPatients(res.data);
                }
            });
    };

    //** 7: ดึงข้อมูลทั้งหมด() */
    const getMedicines = async () => {
        const apiUrl = "http://localhost:8080/medicines";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
       
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setMedicines(res.data);
                }
            });
    };

    React.useEffect(() => {
        getDispensations();
        getPatients();
        getMedicines();
    }, []);
    var medicineUnitArray = medicines.map((item: MedicinesInterface) => (item.Medicine_Unit));

//============================================== END step 4 เตรียมข้อมูลให้หน้าจอ() ==============================================

    return(
        <Box sx={{ flexGrow: 1 }}>
            <Snackbar // บันทึกสำเร็จ
                open={success}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="success">              
                    บันทึกข้อมูลสำเร็จ
                </Alert>
            </Snackbar>

            <Snackbar // บันทึกไม่สำเร็จ
                open={error} 
                autoHideDuration={3000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="error">
                    บันทึกข้อมูลไม่สำเร็จ
                </Alert>
            </Snackbar>

            <Snackbar // คุณไม่มีสิทธิการเข้าถึง
                open={noAccess} 
                autoHideDuration={3000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="error">
                    คุณไม่มีสิทธิการเข้าถึง
                </Alert>
            </Snackbar>
            <Container maxWidth="xl" > {/* input UI */}
                <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 45}}>
                    <Grid container spacing={2}>
                        
                        {/* Dispensation header */}
                        <Grid container justifyContent="center">
                            <Grid>
                                <h1> Dispensation </h1>
                            </Grid>
                        </Grid>
                        
                        {/* Dispensation ID */}
                        <Grid container justifyContent="center">
                            <Grid item xs={4}>
                                <h2> Dispensation ID </h2>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField
                                    fullWidth
                                    disabled
                                    id="dispensation-id"
                                    label= {dispensationID}
                                    variant="outlined"
                                    />
                            </Grid>
                        </Grid>

                        {/* Patient Personal ID */}
                        <Grid container justifyContent="center">
                            <Grid item xs={4}>
                                <h2> Patient Personal ID </h2>
                            </Grid>
                            <Grid item xs={7}>
                                <Autocomplete
                                    id="patients-autocomplete"
                                    options={patients}
                                    fullWidth
                                    size="medium"
                                    onChange={(event: any, value) => {
                                        setDispensations({ ...dispensations, Patient_ID: value?.ID }); // บันทึกค่าลง interface
                                        getDispensations();  // get ใหม่เพื่อเวลาจะจ่ายยาให้คนไข้คนต่อไป dispensation ID จะได้ update โดยไม่ต้อง refresh page
                                    }}
                                    getOptionLabel={(option: any) => // option ในการ search สามารถ search ด้วยตามรายการที่เราใส่
                                        `${option.Patient_Personal_ID} ${option.Patient_Firstname} ${option.Patient_Lastname}`
                                    } //filter value // เว้นวรรคระว่าง } กับ $ มีผลกับการแสดงผล
                                    renderInput={(params) => <TextField {...params} label="Patient Personal ID" />}
                                    renderOption={(props: any, option: any) => {
                                    return (
                                        <li
                                        {...props}
                                        value={`${option.ID}`}
                                        key={`${option.ID}`}
                                        >{`${option.Patient_Personal_ID}`}</li>
                                    ); //การแสดงผล อันนี้เราเลือกแสดงผลเฉพาะ personal id แต่คืนค่าค่าเป็น id 
                                    }}
                                />
                            </Grid>
                        </Grid>

                        {/* Medicine Name */}
                        <Grid container justifyContent="center">
                            <Grid item xs={4}>
                                <h2> Medicine Name </h2>
                            </Grid>
                            <Grid item xs={7}>
                                <Autocomplete
                                    id="medicines-autocomplete"
                                    options={medicines}
                                    fullWidth
                                    size="medium"
                                    onChange={handleChangeMedicine_Name}
                                    getOptionLabel={(option: any) => // option ในการ search สามารถ search ด้วยตามรายการที่เราใส่
                                        `${option.Medicine_Name}`
                                    } //filter value
                                    renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                    renderOption={(props: any, option: any) => {
                                    return (
                                        <li
                                        {...props}
                                        value={`${option.ID}`}
                                        key={`${option.ID}`}
                                        >{`${option.Medicine_Name}`}</li>
                                    ); //การแสดงผล อันนี้เราเลือกแสดงผลเฉพาะ personal id แต่คืนค่าค่าเป็น id 
                                    }}
                                />
                            </Grid>
                        </Grid>

                        {/* Medicine Amount */}
                        <Grid container justifyContent={"center"}>
                            <Grid item xs={4}>
                                <h2> Medicine Amount </h2>
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    id="medicine-amount"
                                    label="Medicine Amount"
                                    variant="outlined"
                                    onChange={(event) => SetMedicine_Amount(Number(event.target.value))}/>
                            </Grid>
                            <Grid item xs={2}>
                                <h4> x {medicineUnitArray[Number(dispensation_medicines.Medicine_ID) - 1]} </h4>
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="center">
                            <Grid item xs={4}>
                                <h2> Insert Date </h2>
                            </Grid>
                            <Grid item xs={7}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="DateTimePicker"
                                        value={date}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        renderInput={(props) => <TextField {...props} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>

                        {/* Insert Button */}
                        <Grid container justifyContent="center">
                            <Grid>
                                <Button variant="contained" color="success" onClick={submit} endIcon={<SaveIcon />}>
                                    submit
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>
            </Container >
            <DispensationTable_UI />
        </Box>
    );
}

export default Dispensation;