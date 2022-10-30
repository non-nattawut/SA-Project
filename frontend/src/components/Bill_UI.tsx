import React, { useState } from "react";
import { useEffect } from "react";

/* appbar */
// Fullappbar

/* Buttom */
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

/* Grid */
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";

import { Snackbar, Alert } from "@mui/material";

/* combobox */
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { Container } from "@mui/material";

/* Datetimepicker */
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// model
import { Payment_typesInterface } from "../models/bill/IPayment_type";
import { BillsInterface } from "../models/bill/IBill";
import { Bill_JoinInterface } from "../models/bill/Bill_Join";
import { DispensationsInterface } from "../models/dispensation/IDispensation";
import { DiagnosticsInterface } from "../models/diagnostic/IDiagnostic";

import BillTable_UI from "./BillTable_UI";

let sum = 0;
function Bill() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [diagnostic, setDiagnostic] = React.useState<DiagnosticsInterface[]>([]);
  
  const [dispensation, setDispensation] = React.useState<DispensationsInterface[]>([]);
  const [bill, setBill] = React.useState<Partial<BillsInterface>>({});
  const [payment_type_id, setPayment_Type_ID] = React.useState<Payment_typesInterface[]>([]);
  const [bill_join, setBill_Join] = React.useState<Bill_JoinInterface[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [noAccess, setNoAccess] = React.useState(false);


  // คำนวณค่าใช้จ่ายยาจาก dispensation_id ที่ตรงกัน
  let cal: ( value_cal: number) => number =
    function ( value_cal: number) {
      sum = 0;
      for(let i =0;i<dispensation_id_true.length;i++){
        if(dispensation_id_true[i] == Number(value_cal)){
          sum += medicine_price_true[i]*medicine_amount_true[i]
          }
        }
      return sum;
    };

  //แสดงการ Alert
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

  // กดปุุ่มเพื่อทำการบันทึก
  /*9.=========================== บันทึกการออกบิล () */
  function submit() {
    if(localStorage.getItem("positionid") == "3"){
      if(bill.Diagnostic_ID == bill.Dispensation_ID){
        let bill_p = {
          Diagnostic_ID: bill.Diagnostic_ID,
          Dispensation_ID: bill.Dispensation_ID,
          Employee_ID: Number(localStorage.getItem("uid")),
          Payment_Type_ID: bill.Payment_type_ID,
          Bill_Price: sum,
          Time_Stamp: date,
        };

        const apiUrl = "http://localhost:8080";
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bill_p),
        };

        fetch(`${apiUrl}/bill`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              setSuccess(true);
            } else {
              setError(true);
            }
          });
      }else{
        setError(true);
      }
    }
    else{
      setNoAccess(true);
    }
  }
  const getDispensations = async () => {
    const apiUrl = "http://localhost:8080/dispensations_bill";
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
          setDispensation(res.data);
        }
      });
  };

  const getDiagnostic = async () => {
    const apiUrl = "http://localhost:8080/dispensations_bill";
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
          setDiagnostic(res.data);
        }
      });
      
  };

  const getPaymentType = async () => {
    const apiUrl = "http://localhost:8080/paymenttype";
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
          setPayment_Type_ID(res.data);
        }
      });
  };

  const getBill_Join = async () => {
    const apiUrl = "http://localhost:8080/bill_join";
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
          setBill_Join(res.data);
        }
      });
  };

  ///สั่งใช้งาน get อัติโนมัติ
  useEffect(() => {
    getDiagnostic();
    getDispensations();
    getPaymentType();
    getBill_Join();
  }, []);

  //สร้างขึ้นมาเพื่อนำไปคำนวณค่าใช้จ่ายยา
  var dispensation_id_true = bill_join.map((item: Bill_JoinInterface) => (item.Dispensation_ID)); //เก็บค่า dispensation ที่ได้จากการจอย 3 ตาราง
  var medicine_amount_true = bill_join.map((item: Bill_JoinInterface) => (item.Medicine_Amount)); //เก็บจำนวนยาจากการจอย
  var medicine_price_true = bill_join.map((item: Bill_JoinInterface) => (item.Medicine_Price));  //เก็บราคายาจากการจอย


  /*=============================================== Bill_UI============================================================================= */
  return (
    <Box>
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

            <Snackbar // คุณไม่มีสิทธิเข้าถึง
                open={noAccess} 
                autoHideDuration={3000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="error">
                    คุณไม่มีสิทธิเข้าถึง
                </Alert>
            </Snackbar>

    <Container maxWidth="md">
      <LocalHospitalIcon color="success" sx={{ fontSize: 80 }} />
      <Paper
        sx={{
          paddingX: 2,
        }}
      >
        <h1>Receipt</h1>
        <Box
          display={"flex"}
          sx={{
            paddingX: 2,
          }}
        >
          <Grid container spacing={5}>
            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={3}>
                <h3>Patient Personal ID</h3>
              </Grid>
              <Grid item xs={5}>

              <Autocomplete
                  id="diagnostic-autocomplete"
                  options={diagnostic}
                  fullWidth
                  size="medium"
                  onChange={(event: any, value) => {
                    setBill({ ...bill, Diagnostic_ID: value?.ID }); //Just Set ID to interface
                  }}
                  getOptionLabel={(option: any) =>
                    `${option.Patient.Patient_Personal_ID}`
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
                      >{`${option.Patient.Patient_Personal_ID}`}</li>
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
              <Grid item xs={3}>
                <h3>Dispensation ID</h3>
              </Grid>
              <Grid item xs={5}>

              <Autocomplete
                  id="dispensation-autocomplete"
                  options={dispensation}
                  fullWidth
                  size="medium"
                  onChange={(event: any, value) => {
                    sum = cal(Number(value?.ID));
                    setBill({ ...bill, Dispensation_ID: value?.ID }); //Just Set ID to interface
                  }}
                  getOptionLabel={(option: any) =>
                    `${option.ID} ${option.Patient.Patient_Personal_ID}`
                  } //filter value
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder={"Search..."}
                      />
                    );
                  }}
                  renderOption={(props: any, option: any) => {
                    return (
                      <li
                        {...props}
                        value={`${option.ID}`}
                        key={`${option.ID}`}
                      >{`${option.Patient.Patient_Personal_ID}`}</li>
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
              }}>
              <Grid item xs={3}>
                <h3>Payment Type</h3>
              </Grid>
              <Grid item xs={5}>
                <Autocomplete
                    id="payment-type-auto"
                    options={payment_type_id}
                    fullWidth
                    size="medium"
                    onChange={(event: any, value) => {
                      setBill({ ...bill, Payment_type_ID: value?.ID }); //Just Set ID to interface
                    }}
                    getOptionLabel={(option: any) =>
                      `${option.Type}`
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
                        >{`${option.Type}`}</li>
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
              }}>
              <Grid item xs={3}>
                <h3>Price</h3>
              </Grid>
              <Grid item xs={5}>
              <TextField
                fullWidth
                id="Bill_Price"
                label="Bill_Price"
                variant="outlined"
                defaultValue =  "0"
                value = {(sum)}
                InputProps={{
                readOnly: true,
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
              <Grid item xs={3}>
                <h3>Date Time</h3>
              </Grid>
              <Grid item xs={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="DateTimePicker"
                    renderInput={(params) => <TextField {...params} />}
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={submit}
                endIcon={<SaveIcon />}
              >
                submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
    <BillTable_UI />
    </Box>
  );
}

export default Bill;
