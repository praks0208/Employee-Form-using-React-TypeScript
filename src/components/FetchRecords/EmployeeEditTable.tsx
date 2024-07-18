import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  CircularProgress,
  Paper,
  Modal,
  TextField,
  Grid,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  employeeCode: string;
  contact: string;
  doB: string;
  address: string;
}

const EmployeeEditTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
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
        setTimeout(() => setError(null), 5000);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleEditClick = (employee: Employee) => {
    setCurrentEmployee(employee);
    setEditModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentEmployee) {
      setCurrentEmployee({
        ...currentEmployee,
        [e.target.name]: e.target.value,
      });
      if (e.target.name === "doB") {
        console.log("Date of Birth changed:", e.target.value);
      }
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentEmployee) return;

    try {
      const response = await fetch(
        `http://192.168.1.11:5126/api/Employee/${currentEmployee.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentEmployee),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      setSuccessMessage("Employee updated successfully");
      setTimeout(() => setSuccessMessage(null), 3000);

      setEditModalOpen(false);
      const updatedEmployees = employees.map((emp) =>
        emp.id === currentEmployee.id ? currentEmployee : emp
      );
      setEmployees(updatedEmployees);
    } catch (err) {
      setError((err as Error).message);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setCurrentEmployee(null);
    setError(null);
    setSuccessMessage(null); 
  };

  const colDefs: ColDef<Employee>[] = [
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Employee Code", field: "employeeCode" },
    { headerName: "Contact", field: "contact" },
    {
      headerName: "Date of Birth",
      field: "doB",
      valueFormatter: (params) =>
        params.value ? params.value.split("T")[0] : "",
    },
    { headerName: "Address", field: "address" },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <Button
          variant="contained"
          color="primary"
          sx={{ my: 1, padding: "2px 20px" }}
          onClick={() => handleEditClick(params.data)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Container sx={{ marginTop: 4, width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Employee Records
      </Typography>
      {loading && <Typography>Loading Records...</Typography>}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ mb: 2 }}
      >
        Add Employee
      </Button>
      <Paper sx={{ width: "70vw" }}>
        <Box className="ag-theme-alpine" sx={{ height: 550, width: "100%" }}>
          <AgGridReact
            rowData={employees}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={10}
          />
        </Box>
      </Paper>

      <Modal open={editModalOpen} onClose={handleCloseModal}>
        <Box
          component="form"
          onSubmit={handleEditSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Employee
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={currentEmployee?.firstName || ""}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={currentEmployee?.lastName || ""}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Employee Code"
                name="employeeCode"
                value={currentEmployee?.employeeCode || ""}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact"
                name="contact"
                value={currentEmployee?.contact || ""}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="doB"
                type="date"
                value={currentEmployee?.doB || ""}
                onChange={handleEditChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={currentEmployee?.address || ""}
                onChange={handleEditChange}
                required
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              mt: 2,
              gap: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Save
            </Button>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Employee updated successfully
              </Alert>
            )}
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default EmployeeEditTable;
