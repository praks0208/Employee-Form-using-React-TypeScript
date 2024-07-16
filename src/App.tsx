import React from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeFormValidation from "./components/EmployeeFormValidation";
import EmployeeFormStyled from "./components/EmployeeFormStyled";
import { Box } from "@mui/material";
import EmployeeRecords from "./components/FetchRecords/EmployeeRecords";
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
        {/* <EmployeeDataFetcher /> */}
        <EmployeeRecords />
      </Box>
    </Box>
  );
};

export default App;
