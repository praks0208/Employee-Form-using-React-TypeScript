import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface Employee {
  firstName: string;
  lastName: string;
  employeeCode: string;
  contact: string;
  doB: string;
  address: string;
}

const EmployeeRecords: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://192.168.1.11:5126/api/Employee");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data: Employee[] = await response.json();
        setEmployees(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const [colDefs, setColDefs] = useState<ColDef<Employee>[]>([
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Employee Code", field: "employeeCode" },
    { headerName: "Contact", field: "contact" },
    {
      headerName: "Date of Birth",
      field: "doB",
      valueFormatter: (params: { value: string }) => params.value.split("T")[0],
    },
    { headerName: "Address", field: "address" },
  ])


  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Employee Records
      </Typography>
      {loading && <Typography>Loading Records...</Typography>}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ mb: 2 }}
      >
        Add Employee
      </Button>
      <Box className="ag-theme-alpine" style={{ height: 400, width: "auto"}}>
        <AgGridReact<Employee>
          rowData={employees}
          columnDefs={colDefs}
          paginationPageSize={10}
        />
      </Box>
    </Container>
  );
};

export default EmployeeRecords;
