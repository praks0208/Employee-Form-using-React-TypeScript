/** @jsxImportSource @emotion/react */
import React from "react";
import { TextField } from "@mui/material";
import { css } from "@emotion/react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  type?: "text" | "number" | "date"; // Specify allowed types
  required?: boolean;
  error?: boolean;
  helperText?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  pattern?: string;
}

const inputStyle = (error?: boolean) => css`
  background-color: #fff;
  border-radius: 4px;
  .MuiOutlinedInput-root {
    fieldset {
      border-color: ${error ? "red" : "#ccc"};
    }
  }
`;

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  error = false,
  helperText = "",
  inputProps = {},
  pattern,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={handleChange}
      type={type}
      required={required}
      error={error}
      helperText={helperText}
      inputProps={{ ...inputProps, pattern }}
      css={inputStyle(error)}
      margin="normal"
      InputLabelProps={type === "date" ? { shrink: true } : undefined}
    />
  );
};

export default InputField;
