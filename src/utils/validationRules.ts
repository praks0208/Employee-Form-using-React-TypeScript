// validationRules.ts
import { EmployeeFormState, EmployeeFormErrors } from "./types";

const validationRules = (formData: EmployeeFormState): EmployeeFormErrors => {
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

  return newErrors;
};

export default validationRules;
