/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Typography, Container, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";

interface Employee {
  firstName: string;
  lastName: string;
  employeeCode: string;
  contact: string;
  doB: string;
  address: string;
}

const tableStyles = {
  container: css`
    margin-top: 20px;
  `,
  paper: css`
    margin-top: 20px;
    padding: 20px;
  `,
  table: css`
    min-width: 650px;
  `,
  tableHead: css`
    background-color: #b6c6e0;
    font-weight: bold;
  `,
  tableRow: css`
    &:nth-of-type(odd) {
      background-color: #f9f9f9;
    }
  `,
  tableCell: css`
    padding: 10px 20px;
  `,
};

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

  return (
    <Container css={tableStyles.container}>
      <Typography variant="h4" gutterBottom>
        Employee Records
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Paper css={tableStyles.paper}>
        <Table css={tableStyles.table}>
          <TableHead css={tableStyles.tableHead}>
            <TableRow>
              <TableCell css={tableStyles.tableCell}>First Name</TableCell>
              <TableCell css={tableStyles.tableCell}>Last Name</TableCell>
              <TableCell css={tableStyles.tableCell}>Employee Code</TableCell>
              <TableCell css={tableStyles.tableCell}>Contact</TableCell>
              <TableCell css={tableStyles.tableCell}>Date of Birth</TableCell>
              <TableCell css={tableStyles.tableCell}>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index} css={tableStyles.tableRow}>
                <TableCell css={tableStyles.tableCell}>{employee.firstName}</TableCell>
                <TableCell css={tableStyles.tableCell}>{employee.lastName}</TableCell>
                <TableCell css={tableStyles.tableCell}>{employee.employeeCode}</TableCell>
                <TableCell css={tableStyles.tableCell}>{employee.contact}</TableCell>
                <TableCell css={tableStyles.tableCell}>{employee.doB.split("T")[0]}</TableCell>
                <TableCell css={tableStyles.tableCell}>{employee.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default EmployeeTable;
