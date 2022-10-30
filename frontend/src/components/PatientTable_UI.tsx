import { useEffect, useState } from "react";
import { PatientsInterface } from "../models/patient/IPatient";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";


function PatientTable_UI() {
  const [patients, setPatients] = useState<PatientsInterface[]>([]);

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {                                 
    const apiUrl = "http://localhost:8080/patient_table";
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


  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 70 },
    // {
    //   field: "Employee_ID",
    //   headerName: "ผู้บันทึก",
    //   width: 250,
    //   valueFormatter: (params) => params.value.Personal_ID,
    // },
    {
      field: "Patient_Personal_ID",
      headerName: "เลขบัตรประชาชน",
      width: 250,
      valueFormatter: (params) => params.value.Patient_Personal_ID,
    },
    {
      field: "Patient_Firstname",
      headerName: "ชื่อ",
      width: 250,
      valueFormatter: (params) => params.value.Patient_Firstname,
    },
    {
      field: "Patient_Lastname",
      headerName: "นามสกุล",
      width: 250,
      valueFormatter: (params) => params.value.Patient_Lastname,
    },
    {
      field: "Patient_Rights",
      headerName: "สิทธิการรักษา",
      width: 150,
      valueFormatter: (params) => params.value.Right_Name,
    },
    {
      field: "Gender",
      headerName: "เพศ",
      width: 150,
      valueFormatter: (params) => params.value.Gender_Name,
    },
    {
      field: "BloodGroups",
      headerName: "กรุ๊ปเลือด",
      width: 150,
      valueFormatter: (params) => params.value.Blood_Groups_Name,
    },
  ];

  return (
    <div>
      <Container maxWidth="xl">
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={patients}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}
export default PatientTable_UI;