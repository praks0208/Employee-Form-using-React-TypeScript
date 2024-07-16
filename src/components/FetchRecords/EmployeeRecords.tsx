import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";

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
      <List>
        {employees.map((employee, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${employee.firstName} ${employee.lastName}`}
              secondary={`Employee Code: ${employee.employeeCode}, Contact: ${
                employee.contact
              }, DOB: ${(employee.doB).split("T")[0]}, Address: ${
                employee.address
              }`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default EmployeeRecords;
