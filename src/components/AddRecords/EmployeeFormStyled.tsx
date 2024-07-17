import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Alert,
  ThemeProvider,
  createTheme,
} from "@mui/material";
// import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
});

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

const EmployeeForm: React.FC = () => {
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
  const [isPending, setIsPending] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = (): boolean => {
    const newErrors: EmployeeFormErrors = {};
    const namePattern = /^[A-Za-z]{1,20}$/;
    const employeeCodePattern = /^\d{4}$/;
    const contactPattern = /^\d{10}$/;
    const addressPattern = /^[A-Za-z\s]{2,10}$/;

    formData.firstName = formData.firstName.trim();
    formData.lastName = formData.lastName.trim();
    formData.contact = formData.contact.trim();
    formData.address = formData.address.trim();

    if (formData.firstName.length < 2 || formData.firstName.length > 20) {
      newErrors.firstName = "First name must be between 2 and 20 characters";
    }

    if (formData.lastName.length < 2 || formData.lastName.length > 20) {
      newErrors.lastName = "Last name must be between 2 and 20 characters";
    }

    if (!namePattern.test(formData.firstName)) {
      newErrors.firstName =
        "First name should contain only letters and be up to 20 characters";
    }

    if (!namePattern.test(formData.lastName)) {
      newErrors.lastName =
        "Last name should contain only letters and be up to 20 characters";
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

    if (!addressPattern.test(formData.address)) {
      newErrors.address =
        "Address must be between 2 and 10 characters and contain only letters";
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
    setIsPending(true);

    try {
      const response = await fetch("http://192.168.1.11:5126/api/Employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          dob: new Date(formData.dob).toISOString().split("T")[0],
        }),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        setSubmitSuccess(true);
      } else {
        throw new Error("Failed to submit form");
      }

      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [submitSuccess]);

  const getInputStyle = (field: keyof EmployeeFormErrors) => ({
    bgcolor: "#fff",
    borderRadius: 1,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: errors[field] ? "red" : "#ccc",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ padding: 2 }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Employee Registration
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 5,
              p: 3,
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                  sx={getInputStyle("firstName")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  sx={getInputStyle("lastName")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Employee Code"
                  name="employeeCode"
                  value={formData.employeeCode}
                  onChange={handleChange}
                  margin="normal"
                  required
                  inputProps={{
                    maxLength: 4,
                    pattern: "[0-9]*",
                    inputMode: "numeric",
                  }}
                  error={!!errors.employeeCode}
                  helperText={errors.employeeCode}
                  sx={getInputStyle("employeeCode")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  margin="normal"
                  required
                  inputProps={{
                    maxLength: 10,
                    pattern: "[0-9]*",
                    inputMode: "numeric",
                  }}
                  error={!!errors.contact}
                  helperText={errors.contact}
                  sx={getInputStyle("contact")}
                />
              </Grid>
              <Grid item xs={12}>
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
                  sx={getInputStyle("dob")}
                />
              </Grid>
              <Grid item xs={12}>
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
                  sx={getInputStyle("address")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isPending}
              sx={{ mt: 3, mb: 2 }}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
            {submitSuccess && (
              <Alert severity="success">Form submitted successfully!</Alert>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EmployeeForm;
