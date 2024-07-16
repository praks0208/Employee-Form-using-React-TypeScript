import React from "react";
import { Box } from "@mui/material";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeFormValidation from "./components/EmployeeFormValidation";
import EmployeeFormStyled from "./components/EmployeeFormStyled";


import EmployeeRecords from "./components/FetchRecords/EmployeeRecords";
import EmployeeTable from "./components/FetchRecords/EmployeeTable";
const App: React.FC = () => {
  return (
    <Box sx={{
      bgcolor: "#e3f2fd"}}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <EmployeeFormStyled /> */}
        {/* <EmployeeForm /> */}
        <EmployeeFormValidation />
      </Box>
      <Box>
        <EmployeeTable />
        {/* <EmployeeRecords /> */}
      </Box>
    </Box>
  );
};

export default App;
