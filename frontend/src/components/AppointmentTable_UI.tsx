import { useEffect, useState } from "react";
import { AppointmentsInterface } from "../models/Appointment/IAppointment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";


function AppointmentTable_UI() {
  const [appointment, setAppointment] = useState<AppointmentsInterface[]>([]);

  useEffect(() => {
    getAppointment();
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const getAppointment = async () => {                                                              //7.ดึงข้อมูลผู้ป๋วย                                   
    const apiUrl = "http://localhost:8080/appointment";
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
                setAppointment(res.data);
            }
        });
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 70 },
    {
      field: "Employee",
      headerName: "ชื่อแพทย์",
      width: 250,
      valueGetter: (params) => params.value.First_Name + " " + params.value.Last_Name,
    },
    {
      field: "Patient",
      headerName: "ชื่อ ผู้ป๋วย",
      width: 250,
      valueGetter: (params) => params.value.Patient_Firstname + " " + params.value.Patient_Lastname,
    },
    { field: "App_Out", headerName: "วันที่ออกใบนัด", width: 250 },
    { field: "App_In", headerName: "วันที่นัด", width: 250 },
    {
      field: "App_Note",
      headerName: "โน๊ต",
      width: 250,
    },
    {
      field: "Department",
      headerName: "แผนก",
      width: 150,
      valueGetter: (params) => params.value.Department_Name,
    },
  ];

  return (
    <div>
      <Container maxWidth="xl">
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={appointment}
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
export default AppointmentTable_UI;