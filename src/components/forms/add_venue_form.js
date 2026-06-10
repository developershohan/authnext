"use client";

import { useFormik } from "formik";
import { useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import * as Yup from "yup";

import { createVenue } from "@lib/actions/actions";

// import { createVenue } from "@lib/api/venues";

const initialValues = {
  name: "",
  address: "",
  country: "",
  state: "",
  city: "",


};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required").min(3,"Name must be at least 3 characters long"),
  address: Yup.string().required("Address is required").min(3,"Address must be at least 3 characters long"),
  country: Yup.string().required("Country is required").min(3,"Country must be at least 3 characters long"),
  state: Yup.string().required("State is required").min(3,"State must be at least 3 characters long"),
  city: Yup.string().required("City is required").min(3,"City must be at least 3 characters long"),
});

const inputClass =
  "w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100";

const inputErrorClass =
  "w-full rounded-xl border-2 border-rose-300 bg-rose-50 px-4 py-3 text-sm font-medium transition-all duration-200 placeholder:text-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200";

const selectWrapperClass =
  "rounded-xl border-2 border-slate-200 bg-white transition-all duration-200";

const selectWrapperErrorClass =
  "rounded-xl border-2 border-rose-300 bg-rose-50 transition-all duration-200";

const getSelectedName = (item) => item?.name || "";

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
};

function FieldError({ formik, name }) {
  const hasError = formik.touched[name] && formik.errors[name];

  if (!hasError) return null;

  return (
    <p className="flex items-center gap-1 text-sm font-medium text-rose-600">
      <span>✕</span>
      {formik.errors[name]}
    </p>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">
        {title}
      </p>
      <div className="h-1 w-12 rounded-full bg-gradient-to-r from-sky-500 to-sky-600" />
    </div>
  );
}

function Alert({ type, message }) {
  if (!message) return null;

  const isSuccess = type === "success";

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-4 py-4 ${
        isSuccess
          ? "border-emerald-200 bg-emerald-50"
          : "border-rose-200 bg-rose-50"
      }`}
    >
      <span
        className={`text-xl ${
          isSuccess ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {isSuccess ? "✓" : "⚠️"}
      </span>

      <p
        className={`text-sm font-medium ${
          isSuccess ? "text-emerald-700" : "text-rose-700"
        }`}
      >
        {message}
      </p>
    </div>
  );
}

function TextField({ formik, name, label, placeholder }) {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={hasError ? inputErrorClass : inputClass}
      />

      <FieldError formik={formik} name={name} />
    </div>
  );
}

export default function AddVenueForm() {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [serverErrors, setServerErrors] = useState({});
  const [resetKey, setResetKey] = useState(0);



  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values, helpers) => {
      setStatusMessage(null);
      setServerErrors({});

      try {
        const result = await createVenue(null, values);

        if (result.type === "error") {
          setStatusMessage(result);

          // Set server-side field errors on Formik
          if (result.errors) {
            helpers.setErrors(result.errors);
            // Mark errored fields as touched so errors display
            const touchedFields = {};
            for (const key of Object.keys(result.errors)) {
              touchedFields[key] = true;
            }
            helpers.setTouched(touchedFields);
            setServerErrors(result.errors);
          }
          return;
        }

        setStatusMessage(result);
        helpers.resetForm();
        resetLocationFields();
      } catch (error) {
        setStatusMessage({
          type: "error",
          message: getErrorMessage(error),
        });
      }
    },
  });

  const resetLocationFields = () => {
    setCountry(null);
    setState(null);
    setCity(null);
    setResetKey((prev) => prev + 1);
  };

  const handleClear = () => {
    formik.resetForm();
    resetLocationFields();
    setStatusMessage(null);
  };

  const handleCountryChange = (selectedCountry) => {
    const countryName = getSelectedName(selectedCountry);

    setCountry(selectedCountry);
    setState(null);
    setCity(null);

    formik.setFieldValue("country", countryName, false);
    formik.setFieldValue("state", "", false);
    formik.setFieldValue("city", "", false);

    formik.setFieldTouched("country", Boolean(countryName), false);
    formik.setFieldTouched("state", false, false);
    formik.setFieldTouched("city", false, false);

    formik.setFieldError("country", undefined);
    formik.setFieldError("state", undefined);
    formik.setFieldError("city", undefined);
  };

  const handleStateChange = (selectedState) => {
    const stateName = getSelectedName(selectedState);

    setState(selectedState);
    setCity(null);

    formik.setFieldValue("state", stateName, false);
    formik.setFieldValue("city", "", false);

    formik.setFieldTouched("state", Boolean(stateName), false);
    formik.setFieldTouched("city", false, false);

    formik.setFieldError("state", undefined);
    formik.setFieldError("city", undefined);
  };

  const handleCityChange = (selectedCity) => {
    const cityName = getSelectedName(selectedCity);

    setCity(selectedCity);

    formik.setFieldValue("city", cityName, false);
    formik.setFieldTouched("city", Boolean(cityName), false);
    formik.setFieldError("city", undefined);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mx-auto my-8 w-full max-w-3xl overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-2xl"
    >
      <div className="border-b border-slate-200 bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-8">
        <h1 className="text-4xl font-bold text-white">Create Venue</h1>
        <p className="mt-2 text-sky-100">
          Add a new venue to your collection
        </p>
      </div>

      <div className="space-y-6 px-8 py-8">
        {statusMessage && (
          <Alert type={statusMessage.type} message={statusMessage.message} />
        )}

        <SectionTitle title="Basic Information" />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            formik={formik}
            name="name"
            label="Venue Name"
            placeholder="e.g., Grand Ballroom"
          />

          <TextField
            formik={formik}
            name="address"
            label="Address"
            placeholder="e.g., 123 Main Street"
          />
        </div>

        <div className="pt-4">
          <SectionTitle title="Location" />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Country
            </label>

            <div
              className={
                formik.touched.country && formik.errors.country
                  ? selectWrapperErrorClass
                  : selectWrapperClass
              }
            >
              <CountrySelect
                key={`country-${resetKey}`}
                defaultValue={country}
                onChange={handleCountryChange}
                placeHolder="Select Country"
              />
            </div>

            <FieldError formik={formik} name="country" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              State / Province
            </label>

            <div
              className={
                formik.touched.state && formik.errors.state
                  ? selectWrapperErrorClass
                  : selectWrapperClass
              }
            >
              <StateSelect
                key={`state-${country?.id || "empty"}-${resetKey}`}
                countryid={country?.id}
                defaultValue={state}
                onChange={handleStateChange}
                placeHolder={country ? "Select State" : "Select Country First"}
              />
            </div>

            <FieldError formik={formik} name="state" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              City
            </label>

            <div
              className={
                formik.touched.city && formik.errors.city
                  ? selectWrapperErrorClass
                  : selectWrapperClass
              }
            >
              <CitySelect
                key={`city-${country?.id || "empty"}-${
                  state?.id || "empty"
                }-${resetKey}`}
                countryid={country?.id}
                stateid={state?.id}
                defaultValue={city}
                onChange={handleCityChange}
                placeHolder={state ? "Select City" : "Select State First"}
              />
            </div>

            <FieldError formik={formik} name="city" />
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="flex-1 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-4 text-center font-semibold text-white shadow-lg transition-all duration-200 hover:from-sky-600 hover:to-sky-700 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {formik.isSubmitting ? "Creating..." : "Create Venue"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="rounded-xl border-2 border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 active:scale-95"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
}