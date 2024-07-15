import React from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeFormValidation from "./components/EmployeeFormValidation";
import EmployeeFormStyled from "./components/EmployeeFormStyled";
const App: React.FC = () => {
  return (
    <div>
      <EmployeeFormStyled />
      {/* <EmployeeForm /> */}
      {/* <EmployeeFormValidation /> */}
    </div>
  );
};

export default App;
