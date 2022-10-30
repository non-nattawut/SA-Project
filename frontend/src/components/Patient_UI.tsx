import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Alert, Grid, Snackbar } from "@mui/material";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from "@mui/material/Autocomplete";
import { BloodGroupsInterface } from '../models/employee/IBloodGroups';
import { PatientsInterface } from '../models/patient/IPatient';
import { Patient_RightsInterface } from '../models/patient/IPatient_Rights';
import PatientTable_UI from './PatientTable_UI';
import { GendersInterface } from '../models/employee/IGender';

function Patient_UI() {

  const [patients,setPatients] =React.useState<Partial<PatientsInterface>>({});
  const [BloodGroups, setBloodGroups] = React.useState<BloodGroupsInterface[]>([]);
  const [Patient_Rights, setPatientRights] = React.useState<Patient_RightsInterface[]>([]);
  const [Gender, setGender] = React.useState<GendersInterface[]>([]);
  

  const [Patient_Personal_ID, setPatient_Personal_ID] =  React.useState<string | null>(null);
  const [Patient_Firstname, setFirstName] =  React.useState<string | null>(null);
  const [Patient_Lastname, setLastName] =  React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [noAccess, setNoAccess] = React.useState(false);


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const getBloodGroups = async () => {                                                          //ดึงข้อมูล BloodGroups                               
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

  const getPatientRights = async () => {                                                          //ดึงข้อมูล BloodGroups                               
    const apiUrl = "http://localhost:8080/patientrights";
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
                setPatientRights(res.data);
            }
        });
  };

  const getGender = async () => {                                                          //ดึงข้อมูล Gender                               
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
  
  const handleClose = (                                                                         //ป้ายบันทึกเปิดปิด

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

const submit = () => {

    // position พยาบาล
    if(localStorage.getItem("positionid")=="2"){
      let data = {
        Patient_Personal_ID: Patient_Personal_ID,
        Employee_ID: Number(localStorage.getItem("uid")),
        Patient_Firstname: Patient_Firstname,
        Patient_Lastname: Patient_Lastname,
        BloodGroupsID: patients.BloodGroupsID,
        Patient_RightsID: patients.Patient_RightsID,
        GenderID: patients.GenderID,
      };

      const apiUrl = "http://localhost:8080/patients";           //ส่งขอบันทึก

      const requestOptions = {

        method: "POST",

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),

    };

    fetch(apiUrl, requestOptions)                                       //ขอการส่งกลับมาเช็คว่าบันทึกสำเร็จมั้ย

      .then((response) => response.json())

      .then((res) => {

        if (res.data) {
          setSuccess(true);

        } else {
          setError(true);

        }
      });
    }else{
      setNoAccess(true)
    }
  }
  
  React.useEffect(() => {                                                                       //เรียกข้อมูล
    getBloodGroups();
    getPatientRights();
    getGender();
  }, []);
  
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
          
          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            >
            <Alert onClose={handleClose} severity= "success">
              บันทึกข้อมูลสำเร็จ
            </Alert>
            </Snackbar>
          
          <Snackbar
            open={error}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            >
              <Alert onClose={handleClose} severity= "error">
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
        </Box>
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
            <h1>Patient</h1>
          </Box>
            <Grid container spacing={2}>
              <Grid container justifyContent={"center"}
                sx={{
                  paddingY: 2,
                }}
              >
              <Grid item xs={2}>
                <p>Patient Personal ID:</p>
              </Grid>
              <Grid item xs={6}>
              <TextField fullWidth id="Patient_Personal_ID" type="string" variant="outlined" 
                onChange={(event) => setPatient_Personal_ID(event.target.value)}
              />
              </Grid>
            </Grid>

              <Grid container justifyContent={"center"}
                  sx={{
                    paddingY: 3,
                  }}
                >
                <Grid item xs={2}>
                  <p>First Name:</p>
                </Grid>
                <Grid item xs={6}>
                <TextField fullWidth id="FirstName" type="string" variant="outlined"
                  onChange={(event) => setFirstName(event.target.value)}
                />
                </Grid>
              </Grid>

              <Grid container justifyContent={"center"}
                  sx={{
                    paddingY: 2,
                  }}
                >
                <Grid item xs={2}>
                  <p>Last Name:</p>
                </Grid>
                <Grid item xs={6}>
                <TextField fullWidth id="LastName" type="string" variant="outlined"
                  onChange={(event) => setLastName(event.target.value)}
                />
                </Grid>
              </Grid>

              <Grid container justifyContent={"center"}
                  sx={{
                    paddingY: 2,
                  }}
                >
                <Grid item xs={2}>
                  <p>Blood Groups:</p>
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    id="bloodGroups-autocomplete"
                    options={BloodGroups}
                    fullWidth
                    size="small"
                    onChange={(event: any, value) => {
                      setPatients({ ...patients, BloodGroupsID: value?.ID }); //Just Set ID to interface
                    }}
                    getOptionLabel={(option: any) =>
                      `${option.Blood_Groups_Name}`
                    }
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

              <Grid container justifyContent={"center"}
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
                    options={Gender}
                    fullWidth
                    size="small"
                    onChange={(event: any, value) => {
                      console.log(value?.ID);
                        setPatients({ ...patients, GenderID: value?.ID });
                    }}
                    getOptionLabel={(option: any) =>
                      `${option.Gender_Name}`
                    }
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

              <Grid container justifyContent={"center"}
                  sx={{
                    paddingY: 2,
                  }}
                >
                <Grid item xs={2}>
                  <p>Patient Rights:</p>
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    id="patientrights-autocomplete"
                    options={Patient_Rights}
                    fullWidth
                    size="small"
                    onChange={(event: any, value) => {
                        setPatients({ ...patients, Patient_RightsID: value?.ID }); //Just Set ID to interface
                    }}
                    getOptionLabel={(option: any) =>
                      `${option.Right_Name}`
                    }
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
                        >{`${option.Right_Name}`}</li>
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
                <Button variant="contained" color="success" onClick={submit}>
                  SAVE
                </Button>
              </Grid>
            </Grid>
        </Paper>
        </Container>
        <Box>
          <PatientTable_UI/>
        </Box>
    </div>
  );
}
export default Patient_UI;
