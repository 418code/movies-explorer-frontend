import { useState, useCallback } from 'react';

//custom hook for form mgmt && validation
export function useFormWithValidation(startValid = false, startValues = {}) {
  const [values, setValues] = useState(startValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(startValid);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}
