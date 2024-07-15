import React, { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Primary color
    },
    secondary: {
      main: "#dc004e", // Secondary color
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

const EmployeeFormStyled: React.FC = () => {
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
    const addressPattern = /^[A-Za-z]+$/;

    formData.firstName = formData.firstName.trim();
    formData.lastName = formData.lastName.trim();
    formData.contact = formData.contact.trim();
    formData.address = formData.address.trim();

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

    if (!formData.address || !addressPattern.test(formData.address)) {
      newErrors.address =
        "Address should not be empty and must contain text only";
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
      // Using Axios
      const response = await axios.post(
        "http://192.168.1.11:5126/api/Employee",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      setIsPending(false);

      //   Using Fetch
      // fetch("http://192.168.1.11:5126/api/Employee", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json"},
      //       body: JSON.stringify(formData)
      // }).then(() => {
      //     console.log("Form submitted successfully");
      // })

      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
              bgcolor: "#f5f5f5", // Light background color for the form
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
                  sx={{
                    bgcolor: "#fff", // White background for input
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errors.firstName ? "red" : "#ccc", // Red border on error
                      },
                    },
                  }}
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
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errors.lastName ? "red" : "#ccc",
                      },
                    },
                  }}
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
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errors.employeeCode ? "red" : "#ccc",
                      },
                    },
                  }}
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
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errors.contact ? "red" : "#ccc",
                      },
                    },
                  }}
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
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errors.dob ? "red" : "#ccc",
                      },
                    },
                  }}
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
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errors.address ? "red" : "#ccc",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
              {!isPending && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                >
                  Submit
                </Button>
              )}

              {isPending && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  disabled
                >
                  Submitting...
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EmployeeFormStyled;
