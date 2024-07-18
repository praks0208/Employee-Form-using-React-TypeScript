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
import { useNavigate } from "react-router-dom";
import useValidation from "../../hooks/useValidation";
import validationRules from "../../utils/validationRules"; 

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
  const navigate = useNavigate();
  const initialFormData: EmployeeFormState = {
    firstName: "",
    lastName: "",
    employeeCode: "",
    contact: "",
    dob: "",
    address: "",
  };

  const { errors, validate } = useValidation(validationRules);
  const [formData, setFormData] = useState<EmployeeFormState>(initialFormData);
  const [isPending, setIsPending] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, pattern } = e.target;
    const patternMatch = new RegExp(pattern).test(value);
    if (patternMatch) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate(formData)) {
      return;
    }

    setIsPending(true);
    setError(null); // Reset error before submission

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
        console.log("Form Data:", formData);
        setFormData(initialFormData);
        setSubmitSuccess(true);
        setTimeout(() => {
          navigate("/records");
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to submit form. Please try again.");
      }
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
                    pattern: "^[0-9]*$",
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
                    pattern: "^[0-9]*$",
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
            {error && <Alert severity="error">{error}</Alert>}

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => navigate("/records")}
              sx={{ mt: 2 }}
            >
              Back to Employee Records
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EmployeeForm;
