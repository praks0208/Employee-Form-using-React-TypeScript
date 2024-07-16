// EmployeeList.tsx
import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

interface Employee {
  firstName: string;
  lastName: string;
  employeeCode: string;
  contact: string;
  dob: string;
  address: string;
}

const EmployeeList: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Employee Records
      </Typography>
      <List>
        {employees.map((employee, index) => {
          const dob = new Date(employee.dob);
          console.log("Raw DOB:", employee.dob);


          // Check for invalid date
          const formattedDob = isNaN(dob.getTime())
            ? "Invalid Date"
            : dob.toLocaleDateString("en-US");

          return (
            <ListItem key={index}>
              <ListItemText
                primary={`${employee.firstName} ${employee.lastName}`}
                secondary={`Employee Code: ${employee.employeeCode}, Contact: ${employee.contact}, DOB: ${formattedDob}, Address: ${employee.address}`}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default EmployeeList;
