import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

interface Employee {
  firstName: string;
  lastName: string;
  employeeCode: string;
  contact: string;
  doB: string;
  address: string;
}

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

//   const formatDate = (dateString: string): string => {
//     const dateParts = dateString.split("T")[0].split("-");
//     const year = dateParts[0];
//     const month = dateParts[1];
//     const day = dateParts[2];
//     return `${year}-${month}-${day}`;
//   };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Records
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Employee Code</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.employeeCode}</TableCell>
                <TableCell>{employee.contact}</TableCell>
                <TableCell>{employee.doB.split("T")[0]}</TableCell>
                <TableCell>{employee.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default EmployeeTable;
