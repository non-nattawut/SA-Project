import { useEffect, useState } from "react";
import { EmployeesInterface } from "../models/employee/IEmployee";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";

function EmployeeTable_UI() {
  const [employee, setEmployee] = useState<EmployeesInterface[]>([]);

  const getEmployee = async () => {
    //ดึงข้อมูลบุคลากร
    const apiUrl = "http://localhost:8080/employees";
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
          setEmployee(res.data);
        }
      });
  };

  useEffect(() => {
    if(localStorage.getItem("positionid") == "4"){
      getEmployee();
    }
  }, []);

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 70 },
    {
      field: "Personal_ID",
      headerName: "เลขประจำตัวประชาชน",
      width: 250,
    },
    {
      field: "First_Name",
      headerName: "ชื่อ",
      width: 250,
    },
    {
      field: "Last_Name",
      headerName: "สกุล",
      width: 250,
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
    {
      field: "Position",
      headerName: "ตำแหน่ง",
      width: 150,
      valueFormatter: (params) => params.value.Position_Name,
    },
    {
      field: "Department",
      headerName: "แผนก",
      width: 150,
      valueFormatter: (params) => params.value.Department_Name,
    },
  ];

  return (
    <div>
      <Box paddingX={2}>
        <h1>ข้อมูลบุคลากร</h1>
      </Box>
      <Grid container justifyContent={"flex-end"}>
        <Grid padding={5}>
          <Button
            variant="contained"
            color="primary"
            sx={{ alignItems: "flex-end" }}
            component={RouterLink}
            to="/employee/create"
          >
            Create Employee
          </Button>
        </Grid>
      </Grid>
      <Container maxWidth="xl">
        <div style={{ height: 640, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={employee}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </div>
      </Container>
    </div>
  );
}
export default EmployeeTable_UI;
