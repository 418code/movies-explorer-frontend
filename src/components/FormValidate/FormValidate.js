import { useState, useCallback } from "react";
import { useIntl } from "react-intl";
import isEmail from "validator/es/lib/isEmail";

//custom hook for form mgmt && validation
export function useFormWithValidation(startValid = false, startValues = {}) {
  const [values, setValues] = useState(startValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(startValid);
  const intl = useIntl();

  // checks if there are regular errors
  const checkNonCustom = (target) => {
    for (let key in target.validity) {
      if (key !== "customError" && key !== "valid") {
        if (target.validity[key] === true) return false;
      }
    }
    return true;
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const type = target.type;

    switch (type) {
      case "email":
        target.setCustomValidity(
          isEmail(value)
            ? ""
            : intl.formatMessage({
                id: "email_error",
                defaultMessage: "Пожалуйста введите верный email адрес.",
              })
        );
        break;
      case "password":
        target.setCustomValidity(
          checkNonCustom(target)
            ? ""
            : intl.formatMessage({
                id: "pwd_error",
                defaultMessage: "Пожалуйста введите верный пароль.",
              })
        );
        break;
      default:
      //none
    }

    switch (name) {
      case "name":
        target.checkValidity();
        target.setCustomValidity(
          checkNonCustom(target)
            ? ""
            : intl.formatMessage({
                id: "name_error",
                defaultMessage: "Пожалуйста введите верное имя.",
              })
        );
        break;
      default:
      //none
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = startValid) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid, startValid]
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}
