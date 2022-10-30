import { useEffect, useState } from "react";
import { DispensationsInterface } from "../models/dispensation/IDispensation";
import { DispensationMedicinesInterface } from "../models/dispensation/IDispensationMedicines";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid } from "@mui/material";

function DispensationTable_UI() {
  const [dispensations, setDispensations] = useState<DispensationsInterface[]>([]);
  const [dispensation_medicines, setDispensation_medicines] = useState<DispensationMedicinesInterface[]>([]);

  //** 5: ดึงข้อมูลทั้งหมด() */
  const getDispensations = async () => {
    const apiUrl = "http://localhost:8080/dispensations_table";
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
            setDispensations(res.data);
          }
        });
  };

  //** 8: ดึงข้อมูลทั้งหมด() */
  const getDispensationMedicines = async () => {
    const apiUrl = "http://localhost:8080/dispensation_medicines";
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
            setDispensation_medicines(res.data);
          }
        });
  };

  useEffect(() => {
    getDispensations();
    getDispensationMedicines();
  }, []);

  const dispensation_columns: GridColDef[] = [
    { field: "ID", headerName: "เลขที่", width: 70 },
    {
      field: "Patient",
      headerName: "ชื่อผู้ป่วย",
      width: 235,
      valueGetter:(params) => params.value.Patient_Firstname + " " + params.value.Patient_Lastname,
    },
    {
      field: "Employee",
      headerName: "ชื่อแพทย์",
      width: 235,
      valueGetter: (params) => params.value.First_Name +" "+ params.value.Last_Name,
    },
  ];

  const dispensation_medicine_columns: GridColDef[] = [
    { field: "Dispensation_ID", headerName: "เลขที่", width: 70 },
    { field: "Medicine",
      headerName: "ชื่อยา",
      width: 350,
      valueGetter: (params) => params.value.Medicine_Name,
    },
    {
      field: "Medicine_Amount",
      headerName: "จำนวน",
      width: 70,
    },
    { field: "Time_Stamp",
      headerName: "เวลาที่บันทึก",
      width: 250,
    },
  ]

  return (
    <Grid container spacing={2} sx={{ height: 420 ,marginY: "20px"}} justifyContent="center">
      <Grid container spacing={2} sx={{marginX:10}}>
        <Grid item xs = {5}>
          <DataGrid
            rows={dispensations}
            getRowId={(row) => row.ID}
            columns={dispensation_columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
        <Grid item xs = {7}>
          <DataGrid
            rows={dispensation_medicines}
            getRowId={(row) => row.ID}
            columns={dispensation_medicine_columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default DispensationTable_UI;