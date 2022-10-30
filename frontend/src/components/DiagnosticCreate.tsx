/* -------------------------------------------------------------------------- */
/*                          Header, import, MainF(x)                          */
/* -------------------------------------------------------------------------- */
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { PatientsInterface } from "../models/patient/IPatient";
import { DiseasesInterface } from "../models/diagnostic/IDisease";
import { Diagnostic_TypesInterface } from "../models/diagnostic/IDiagnostic_Type";
import { DiagnosticsInterface } from "../models/diagnostic/IDiagnostic";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Typography from "@mui/material/Typography/Typography";
import Stack from "@mui/system/Stack/Stack";

/* -------------------------------------------------------------------------- */
/*                                 Some Style                                 */
/* -------------------------------------------------------------------------- */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
/* -------------------------------------------------------------------------- */
/*                                    test                                    */
/* -------------------------------------------------------------------------- */
// const OP_PatientID = ["1", "2", "3"];
// const OP_DiagnosticType = ["Basic", "Advanced"];
// const OP_Disease = ["Disease#1", "Disease#2", "Disease#3"];
/* -------------------------------------------------------------------------- */
/*                                    test                                    */
/* -------------------------------------------------------------------------- */

const delay = (ms: number | undefined) =>
  new Promise((res) => setTimeout(res, ms));

function Diagnostic_Entry() {
  /* -------------------------------------------------------------------------- */
  /*                              Variable Constant                             */
  /* -------------------------------------------------------------------------- */
  const [diagnosticType, SetDiagnosticType] = useState<
    Diagnostic_TypesInterface[]
  >([]);
  const [disease, SetDisease] = useState<DiseasesInterface[]>([]);
  const [patient, SetPatient] = useState<PatientsInterface[]>([]);
  const [diagnostic, SetDiagnostic] = useState<Partial<DiagnosticsInterface>>(
    {}
  );
  const [firstname, SetFirstName] = useState<string | undefined>(undefined);
  const [lastname, SetLastName] = useState<string | undefined>(undefined);
  const [bloodgroup, SetBloodGroup] = useState<string | undefined>(undefined);
  const [diagnostic_id, SetDiagnosticID] = useState<number | undefined>(undefined);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [noAccess, setNoAccess] = React.useState(false);
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                             App Driver Constant                            */
  /* -------------------------------------------------------------------------- */
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof diagnostic;
    SetDiagnostic({
      ...diagnostic,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Diagnostic_Entry;
    const { value } = event.target;
    SetDiagnostic({ ...diagnostic, [id]: value });
  };

  const handleClose = (
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
  // Make auto page swap after 2 sec
  const navigate = useNavigate();
  const AutoPageSwap = async () => {
    await delay(2000);
    navigate("/diagnostic");
  };

  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                              Get into combobox                              */
  /* -------------------------------------------------------------------------- */
  // Get Diagnostic_Type
  const getDiagnostic_Types = async () => {
    fetch(`${apiUrl}/diagnostictypes`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          SetDiagnosticType(res.data);
        } else {
          console.log("else");
        }
      });
  };

  // Get Patient
  const getPatients = async () => {
    fetch(`${apiUrl}/patient_table`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          SetPatient(res.data);
        } else {
          console.log("else");
        }
      });
  };

  // Get Disease
  const getDisease = async () => {
    fetch(`${apiUrl}/diseases`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          SetDisease(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getDiagnostic = async () => {
    fetch(`${apiUrl}/diagnostics`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          SetDiagnostic(res.data);
          SetDiagnosticID(Object.keys(res.data).length + 1)
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getDiagnostic();
    getDiagnostic_Types();
    getPatients();
    getDisease();
  }, []);
  /* -------------------------------------------------------------------------- */
  /*                               Submit Section                               */
  /* -------------------------------------------------------------------------- */

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    if (localStorage.getItem("positionid") == "1") {
      let data = {
        Symptom: diagnostic.Symptom,
        Disease_ID: convertType(diagnostic.Disease_ID),
        Diagnostic_TypeID: convertType(diagnostic.Diagnostic_TypeID),
        Patient_ID: convertType(diagnostic.Patient_ID),
        Employee_ID: Number(localStorage.getItem("uid")),
      };
      // console.log(data); //log data before PUSH
      const requestOptionsPost = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch(`${apiUrl}/diagnostics`, requestOptionsPost)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            setSuccess(true);
            setErrorMessage("");
            AutoPageSwap();
          } else {
            setError(true);
            setErrorMessage(res.error);
          }
        });
    } else {
      setNoAccess(true);
    }
  }
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    React                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div>
      <Box display="flex" sx={{ marginTop: 2 }}>
        <Container maxWidth="lg">
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
          <Snackbar
            open={success}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="success">
              Save successfully
            </Alert>
          </Snackbar>
          <Snackbar
            open={error}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="error">
              Failed "{errorMessage}"
            </Alert>
          </Snackbar>
          <Snackbar
            open={noAccess}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="error">
              คุณไม่มีสิทธิการเข้าถึง
            </Alert>
          </Snackbar>
          <Box>
            <Paper
              elevation={5}
              sx={{ bgcolor: "#FEE5B5", marginTop: 2, padding: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Grid container justifyContent={"center"} paddingY={2}>
                    <Paper elevation={5}>
                      <Avatar
                        sx={{ bgcolor: "#FECCA8", width: 100, height: 100 }}
                        variant="rounded"
                      >
                        <div style={{ color: "black", fontSize: 40 }}>
                          {firstname?.charAt(0)}
                          {lastname?.charAt(0)}
                        </div>
                      </Avatar>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={10}>
                  <Box>
                    <b>Patient Record</b>
                    <Grid container>
                      <Grid item xs={4} paddingTop={2}>
                        <TextField
                          type="text"
                          defaultValue="Firstname"
                          label="Firstname"
                          variant="standard"
                          inputProps={{ readOnly: true }}
                          value={firstname}
                        />
                      </Grid>
                      <Grid item xs={4} paddingTop={2}>
                        <TextField
                          type="text"
                          defaultValue="Lastname"
                          label="Lastname"
                          variant="standard"
                          inputProps={{ readOnly: true }}
                          value={lastname}
                        />
                      </Grid>
                      <Grid item xs={12} paddingTop={2}>
                        <TextField
                          type="text"
                          defaultValue="Bloodgroup"
                          label="Bloodgroup"
                          variant="standard"
                          inputProps={{ readOnly: true }}
                          value={bloodgroup}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <b>Patient Personal ID</b>
                  <Autocomplete
                    id="patient-autocomplete"
                    options={patient}
                    fullWidth
                    size="small"
                    onChange={(event: any, value) => {
                      //console.log(value); //Get ID from patientinterface
                      SetDiagnostic({ ...diagnostic, Patient_ID: value?.ID });
                      SetFirstName(value?.Patient_Firstname);
                      SetLastName(value?.Patient_Lastname); //Just Set ID to interface
                      SetBloodGroup(value?.BloodGroups.Blood_Groups_Name);
                    }}
                    sx={{ bgcolor: "#feefd1" }}
                    getOptionLabel={(option: any) =>
                      `${option.Patient_Personal_ID} ${option.Patient_Firstname} ${option.Patient_Lastname}`
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
                        >{`${option.Patient_Personal_ID}`}</li>
                      ); //display value
                    }}
                  />
                  <Stack spacing={0} alignItems="left" marginTop={2}>
                    <b>Doctor Personal ID</b>
                    <div>{localStorage.getItem("personal_id")}</div>
                    <b>Diagnostic ID</b>
                    <div>{diagnostic_id}</div>
                  </Stack>
                </Grid>
                <Grid item xs={10}>
                  <Box>
                    <b>Symptom</b>
                    <Grid container>
                      <Grid item xs={7} paddingRight={2}>
                        <FormControl fullWidth variant="outlined">
                          <TextField
                            id="Symptom"
                            variant="outlined"
                            type="string"
                            size="medium"
                            multiline={true}
                            minRows={5}
                            maxRows={5}
                            placeholder="Insert Symptom Details"
                            value={diagnostic.Symptom || ""}
                            onChange={handleInputChange}
                            sx={{ bgcolor: "#feefd1" }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={5}>
                        <Box>
                          {/* Summary Area */}
                          <Grid container paddingRight={2}>
                            <Grid item xs={5}>
                              Diagnostic Type
                            </Grid>
                            <Grid item xs={7}>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                              >
                                <Select
                                  native
                                  value={diagnostic.Diagnostic_TypeID + ""}
                                  id="controllable-states-demo"
                                  onChange={handleChange}
                                  size="small"
                                  inputProps={{
                                    name: "Diagnostic_TypeID",
                                  }}
                                  sx={{ bgcolor: "#feefd1" }}
                                >
                                  <option aria-label="None" value="">
                                    Please select
                                  </option>
                                  {diagnosticType.map(
                                    (item: Diagnostic_TypesInterface) => (
                                      <option value={item.ID} key={item.ID}>
                                        {item.DT_Name}
                                      </option>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={5} paddingTop={2}>
                              Disease
                            </Grid>
                            <Grid item xs={7} paddingTop={2}>
                              <Autocomplete
                                id="disease-autocomplete"
                                options={disease}
                                fullWidth
                                size="small"
                                onChange={(event: any, value) => {
                                  //Get ID from ...interface
                                  SetDiagnostic({
                                    ...diagnostic,
                                    Disease_ID: value?.ID,
                                  }); //Just Set ID to interface
                                }}
                                sx={{ bgcolor: "#feefd1" }}
                                getOptionLabel={(option: any) =>
                                  `${option.Disease_Name}`
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
                                    >{`${option.Disease_Name}`}</li>
                                  ); //display value
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid container padding={2} justifyContent="flex-end">
                        <Button
                          component={RouterLink}
                          to="/diagnostic"
                          variant="contained"
                          color="error"
                          endIcon={<CancelIcon />}
                          sx={{ marginRight: 2 }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={submit}
                          endIcon={<SaveIcon />}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default Diagnostic_Entry;
/* -------------------------------------------------------------------------- */
