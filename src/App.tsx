import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeForm from "./components/AddRecords/EmployeeForm";
import EmployeeTable from "./components/FetchRecords/EmployeeTable";

import EmployeeFormStyled from "./components/AddRecords/EmployeeFormStyled";
import EmployeeRecords from "./components/FetchRecords/EmployeeRecords";
import EmployeeEditTable from "./components/FetchRecords/EmployeeEditTable";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<EmployeeForm />} /> */}
        <Route path="/" element={<EmployeeFormStyled />} />
        {/* <Route path="/records" element={<EmployeeTable />} /> */}
        <Route path="/records" element={<EmployeeEditTable />} />
        {/* <Route path="/records" element={<EmployeeRecords />} /> */}
      </Routes>
    </Router>
    // <>
    //   <EmployeeFormStyled />
    //   <EmployeeRecords />
    // </>
  );
};

export default App;
