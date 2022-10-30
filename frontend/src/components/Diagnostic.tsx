import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DiagnosticsInterface } from "../models/diagnostic/IDiagnostic";
import Paper from "@mui/material/Paper/Paper";
import NoteAddIcon from '@mui/icons-material/NoteAdd';

function Diagnostic_Table() {
  const [diagnostic, SetDiagnostic] = useState<DiagnosticsInterface[]>([]);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    getDiagnostic();
  }, []);

  const getDiagnostic = async () => {
    fetch(`${apiUrl}/diagnostics`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          SetDiagnostic(res.data);
          //console.log(res.data)
        } else {
          console.log("else");
        }
      });
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 50 },
    {
      field: "Patient",
      headerName: "Patient",
      width: 150,
      valueGetter: (params) => params.value.Patient_Personal_ID,
      //***valueFormatter*** value will remain same (Object object) and add it to DataGrid
      //***valueGetter*** will got value + type (ex. String value) before adding to DataGrid
    },
    {
      field: "Symptom",
      headerName: "Symptom",
      width: 300,
    },
    {
      field: "Diagnostic_Type",
      headerName: "DiagnosticType",
      width: 120,
      valueGetter: (params) => params.value.DT_Name,
    },
    {
      field: "Disease",
      headerName: "Disease",
      width: 100,
      valueGetter: (params) => params.value.Disease_Name,
    },
    {
      field: "CreatedAt",
      headerName: "Diagnosis At",
      width: 300,
      valueGetter: (params) => params.value,
    },
  ];

  return (
    <div>
      <Container sx={{width: 1070}}>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              <b>Diagnostic Entry</b>
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/diagnostic/create"
              variant="contained"
              color="primary"
              endIcon={<NoteAddIcon/>}
            >
              New Diagnostic
            </Button>
          </Box>
        </Box>
        <Paper elevation={5} sx={{ bgcolor: "#FEE5B5" }}>
          <div style={{ height: 550, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={diagnostic}
              getRowId={(row) => row.ID}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[8]}
              //   localeText={{
              //     toolbarDensity: "ขนาด",
              //     toolbarDensityLabel: "Size",
              //     toolbarDensityCompact: "เล็ก",
              //     toolbarDensityStandard: "Medium",
              //     toolbarDensityComfortable: "ใหญ่",
              //   }}
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default Diagnostic_Table;
