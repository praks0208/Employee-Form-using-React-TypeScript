import React from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeFormValidation from "./components/EmployeeFormValidation";
import EmployeeFormStyled from "./components/EmployeeFormStyled";
import { Box } from "@mui/material";
const App: React.FC = () => {
  return (
    <Box
    sx={{
      bgcolor: "#e3f2fd",
      minHeight: "100vh", 
      display: "flex",
      justifyContent: "center", 
      alignItems: "center", 
    }}
  >
    <EmployeeFormStyled />
    {/* <EmployeeForm /> */}
    {/* <EmployeeFormValidation /> */}
  </Box>
  );
};

export default App;
