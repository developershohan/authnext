export const errorHelper = (formik, value) => {
  const hasError = Boolean(formik.touched[value] && formik.errors[value]);

  return {
    hasError,
    errorMessage: hasError ? formik.errors[value] : undefined,
  };
};
