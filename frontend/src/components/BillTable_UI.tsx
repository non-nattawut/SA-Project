import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { BillsInterface } from "../models/bill/IBill";
import { Grid } from "@mui/material";

function BillTable_UI() {
  const [bill, setBill] = useState<BillsInterface[]>([]);

  useEffect(() => {
    getBill();
  }, []);
  const getBill = async () => {
    const apiUrl = "http://localhost:8080/bill";
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
            setBill(res.data);
        }
      });
      
  };


  const billcolumns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 70 },
    {
      field: "Diagnostic",
      headerName: "เลขที่การวินิจฉัย",
      width: 150,
      valueGetter: (params) => params.value.ID,
    },
    {
      field: "Dispensation",
      headerName: "เลขที่การสั่งจ่ายยา",
      width: 150,
      valueGetter: (params) => params.value.ID,
    },
    {
      field: "Employee",
      headerName: "พนักงานออกบิล",
      width: 150,
      valueGetter: (params) => params.value.First_Name,
    },
    {
      field: "Payment_type",
      headerName: "รูปแบบการชำระเงิน",
      width: 150,
      valueGetter: (params) => params.value.Type,
    },
    {
      field: "Bill_Price",
      headerName: "จำนวนเงิน",
      width: 150,
    },
    { field: "Time_Stamp", headerName: "เวลาออกบิล", width: 250 },
  ];

  return (
    <div>
      <Grid>
        <Grid
                container
                justifyContent={"center"}
                sx={{
                  paddingY: 2,
                }}
              >
        <Container maxWidth="xl">
          <div style={{ height: 400, width: "100%", marginTop: "30px" }}>
            <DataGrid
              rows={bill}
              getRowId={(row) => row.ID}
              columns={billcolumns}
              pageSize={5}
              rowsPerPageOptions={[7]}
            />
          </div>
        </Container>
        </Grid>
      </Grid>
    </div>
  );
}
export default BillTable_UI;