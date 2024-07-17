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

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: "#b6c6e0",
    fontWeight: "bold",
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f9f9f9",
    },
  },
  tableCell: {
    padding: "10px 20px",
  },
  container: {
    marginTop: "20px",
  },
  paper: {
    marginTop: "20px",
    padding: "20px",
  },
});

interface Employee {
  firstName: string;
  lastName: string;
  employeeCode: string;
  contact: string;
  doB: string;
  address: string;
}

const EmployeeTable: React.FC = () => {
  const classes = useStyles();
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

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Employee Records
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {employees.length === 0 && <Typography>No employees found</Typography>}
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.tableCell}>First Name</TableCell>
              <TableCell className={classes.tableCell}>Last Name</TableCell>
              <TableCell className={classes.tableCell}>Employee Code</TableCell>
              <TableCell className={classes.tableCell}>Contact</TableCell>
              <TableCell className={classes.tableCell}>Date of Birth</TableCell>
              <TableCell className={classes.tableCell}>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>
                  {employee.firstName}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {employee.lastName}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {employee.employeeCode}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {employee.contact}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {employee.doB.split("T")[0]}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {employee.address}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default EmployeeTable;
