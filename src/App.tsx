import React from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeFormValidation from "./components/EmployeeFormValidation";

const App: React.FC = () => {
  return (
    <div>
      <EmployeeForm />
      {/* <EmployeeFormValidation /> */}
    </div>
  );
};

export default App;
