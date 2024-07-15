import React, { useState } from "react";
import { TextField, Typography, Button, Container, Box } from "@mui/material";
import axios from "axios";

interface EmployeeFormState {
  firstName: string;
  lastName: string;
  employeeCode: string;
  contact: string;
  dob: string;
  address: string;
}

interface EmployeeFormErrors {
  firstName?: string;
  lastName?: string;
  employeeCode?: string;
  contact?: string;
  dob?: string;
  address?: string;
}

const EmployeeFormValidation: React.FC = () => {
  const initialFormData: EmployeeFormState = {
    firstName: "",
    lastName: "",
    employeeCode: "",
    contact: "",
    dob: "",
    address: "",
  };

  const [formData, setFormData] = useState<EmployeeFormState>(initialFormData);
  const [errors, setErrors] = useState<EmployeeFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = (): boolean => {
    const newErrors: EmployeeFormErrors = {};
    const namePattern = /^[A-Za-z]+$/;
    const employeeCodePattern = /^\d{4}$/;
    const contactPattern = /^\d{10}$/;

    if (!namePattern.test(formData.firstName)) {
      newErrors.firstName = "First name should contain only letters";
    }

    if (!namePattern.test(formData.lastName)) {
      newErrors.lastName = "Last name should contain only letters";
    }

    if (!employeeCodePattern.test(formData.employeeCode)) {
      newErrors.employeeCode = "Employee code should be a 4-digit number";
    }

    if (!contactPattern.test(formData.contact)) {
      newErrors.contact = "Contact number should be a 10-digit number";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth should not be null";
    }

    if (!formData.address) {
      newErrors.address = "Address should not be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return; 
    }

    console.log("Form Data:", formData);
    setFormData(initialFormData);
    try {
      const response = await axios.post(
        "https://your-api-endpoint.com/submit",
        formData
      );
      console.log("Form submitted successfully:", response.data);

  
      setFormData(initialFormData);
      setErrors({}); 
    } catch (error) {
      console.error("Error submitting form:", error);
     
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography component="h1" variant="h5">
        Employee Registration
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          fullWidth
          label="Employee Code"
          name="employeeCode"
          value={formData.employeeCode}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.employeeCode}
          helperText={errors.employeeCode}
        />
        <TextField
          fullWidth
          label="Contact"
          name="contact"
          type="number"
          value={formData.contact}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.contact}
          helperText={errors.contact}
        />
        <TextField
          fullWidth
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
          error={!!errors.dob}
          helperText={errors.dob}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.address}
          helperText={errors.address}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default EmployeeFormValidation;
