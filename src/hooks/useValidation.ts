// hooks/useValidation.ts
import { useState } from "react";
import { EmployeeFormState, EmployeeFormErrors } from "../utils/types"; // Adjust the import path based on your project structure

const useValidation = (
  validationRules: (formData: EmployeeFormState) => EmployeeFormErrors
) => {
  const [errors, setErrors] = useState<EmployeeFormErrors>({});

  const validate = (formData: EmployeeFormState): boolean => {
    const newErrors = validationRules(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useValidation;
