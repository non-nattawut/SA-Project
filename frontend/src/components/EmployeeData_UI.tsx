import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Alert, Grid, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { DepartmentsInterface } from "../models/employee/IDepartment";
import { GendersInterface } from "../models/employee/IGender";
import { EmployeesInterface } from "../models/employee/IEmployee";
import { BloodGroupsInterface } from "../models/employee/IBloodGroups";
import { PositionsInterface } from "../models/employee/IPosition";
import { Link as RouterLink } from "react-router-dom";

function Employee_entry() {
  const [employee, setEmployee] = React.useState<Partial<EmployeesInterface>>(
    {}
  );
  const [gender, setGender] = React.useState<GendersInterface[]>([]);
  const [bloodGroups, setBloodGroups] = React.useState<BloodGroupsInterface[]>(
    []
  );
  const [position, setPosition] = React.useState<PositionsInterface[]>([]);
  const [department, setDepartment] = React.useState<DepartmentsInterface[]>(
    []
  );

  const [Personal_ID, SetPersonal_ID] = useState<String>("");
  const [Password, SetPassword] = useState<String>("");
  const [FirstName, SetFirstName] = useState<String>("");
  const [LastName, SetLastName] = useState<String>("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [noAccess, setNoAccess] = React.useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const getGender = async () => {
    //ดึงข้อมูลเพศ
    const apiUrl = "http://localhost:8080/genders";
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
          setGender(res.data);
        }
      });
  };

  const getBloodGrops = async () => {
    //ดึงข้อมูล BloodGroups
    const apiUrl = "http://localhost:8080/bloodgroups";
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
          setBloodGroups(res.data);
        }
      });
  };

  const getPosition = async () => {
    //ดึงข้อมูล Position
    const apiUrl = "http://localhost:8080/positions";
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
          setPosition(res.data);
        }
      });
  };

  const getDepartment = async () => {
    //ดึงข้อมูล Department
    const apiUrl = "http://localhost:8080/departments";
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
          setDepartment(res.data);
        }
      });
  };

  const handleClose = (
    //ป้ายบันทึกเปิดปิด

    event?: React.SyntheticEvent | Event,

    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);

    setError(false);
  };

  const submit = () => {
    if(localStorage.getItem("positionid")=="4"){
    let data = {
      //ประกาศก้อนข้อมูล

      Personal_ID: Personal_ID,

      First_Name: FirstName,

      Last_Name: LastName,

      GenderID: employee.GenderID,

      BloodGroupsID: employee.BloodGroupsID,

      DepartmentID: employee.DepartmentID,

      PositionID: employee.PositionID,

      Password: Password,
    };

    console.log(data);

    const apiUrl = "http://localhost:8080/employees"; //ส่งขอบันทึก

    const requestOptions = {
      method: "POST",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions) //ขอการส่งกลับมาเช็คว่าบันทึกสำเร็จมั้ย
      .then((response) => response.json())

      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
    } else{
      setNoAccess(true)
    }
  };

  React.useEffect(() => {
    //เรียกข้อมูล
    getGender();
    getBloodGrops();
    getPosition();
    getDepartment();
  }, []);

  return (
    <Box>
      <Snackbar //ป้ายบันทึกสำเร็จ
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar //ป้ายบันทึกไม่สำเร็จ
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
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

      <Container maxWidth="md">
        <Paper>
          <Box
            display={"flex"}
            sx={{
              marginTop: 6,
              paddingX: 2,
              paddingY: 2,
            }}
          >
            <h1>บันทึกข้อมูล</h1>
          </Box>
          <Grid container spacing={2}>
            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>Personal ID:</p>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="Personal_ID"
                  type="string"
                  variant="outlined"
                  onChange={(event) => SetPersonal_ID(event.target.value)}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 3,
              }}
            >
              <Grid item xs={2}>
                <p>First Name:</p>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="FirstName"
                  type="string"
                  variant="outlined"
                  onChange={(event) => SetFirstName(event.target.value)}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>Last Name:</p>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="LastName"
                  type="string"
                  variant="outlined"
                  onChange={(event) => SetLastName(event.target.value)}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>Gender:</p>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="gender-autocomplete"
                  options={gender}
                  onChange={(event: any, value) => {
                    setEmployee({ ...employee, GenderID: value?.ID }); //Just Set ID to interface
                  }}
                  getOptionLabel={(option: any) => `${option.Gender_Name}`} //filter value
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Search..."
                      />
                    );
                  }}
                  renderOption={(props: any, option: any) => {
                    return (
                      <li
                        {...props}
                        value={`${option.ID}`}
                        key={`${option.ID}`}
                      >{`${option.Gender_Name}`}</li>
                    ); //display value
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>Blood groups:</p>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="bloodGroups-autocomplete"
                  options={bloodGroups}
                  onChange={(event: any, value) => {
                    setEmployee({ ...employee, BloodGroupsID: value?.ID }); //Just Set ID to interface
                  }}
                  getOptionLabel={(option: any) =>
                    `${option.Blood_Groups_Name}`
                  } //filter value
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Search..."
                      />
                    );
                  }}
                  renderOption={(props: any, option: any) => {
                    return (
                      <li
                        {...props}
                        value={`${option.ID}`}
                        key={`${option.ID}`}
                      >{`${option.Blood_Groups_Name}`}</li>
                    ); //display value
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>Position:</p>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="position-autocomplete"
                  options={position}
                  onChange={(event: any, value) => {
                    setEmployee({ ...employee, PositionID: value?.ID }); //Just Set ID to interface
                  }}
                  getOptionLabel={(option: any) => `${option.Position_Name}`} //filter value
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Search..."
                      />
                    );
                  }}
                  renderOption={(props: any, option: any) => {
                    return (
                      <li
                        {...props}
                        value={`${option.ID}`}
                        key={`${option.ID}`}
                      >{`${option.Position_Name}`}</li>
                    ); //display value
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>Department:</p>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="department-autocomplete"
                  options={department}
                  onChange={(event: any, value) => {
                    setEmployee({ ...employee, DepartmentID: value?.ID }); //Just Set ID to interface
                  }}
                  getOptionLabel={(option: any) => `${option.Department_Name}`} //filter value
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Search..."
                      />
                    );
                  }}
                  renderOption={(props: any, option: any) => {
                    return (
                      <li
                        {...props}
                        value={`${option.ID}`}
                        key={`${option.ID}`}
                      >{`${option.Department_Name}`}</li>
                    ); //display value
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>Password:</p>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="Password"
                  type="string"
                  variant="outlined"
                  onChange={(event) => SetPassword(event.target.value)}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
                marginX: 6,
              }}
            >
              <Grid container>
                <Grid justifyContent={"flex-start"} item xs={6}>
                <Button variant="contained" color="primary" component={RouterLink} to="/employee">
                    Back
                  </Button>
                </Grid>
                <Grid alignItems={"flex-end"} item xs={6}>
                  <Button variant="contained" color="success" onClick={submit} sx={{marginX:40}}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default Employee_entry;
