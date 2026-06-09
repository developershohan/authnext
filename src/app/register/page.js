"use client";
import { Input, Button } from "@heroui/react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "@/components/utils";
import { signIn as nextAuthSignIn } from "next-auth/react";
import { redirect } from "next/navigation";

const RegisterPage = () => {

  const [formType, setFormType] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      await submitForm(values);
    },
  });

  const submitForm = async (values) => {
    setSubmitMessage("");
    setSubmitError("");

    if (formType) {

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setSubmitError(data?.message || "Registration failed.");
        return;
      }

      login(values);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Something went wrong. Please try again.");
    }
    }

      login(values);
  };

  const login = async (values) => {

      await nextAuthSignIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      }).then(data=>{
        if(data.ok){
          redirect("/dashboard");
        }
        setSubmitError("Login failed. Please check your credentials and try again.");
      });

  };

  const toggleFormType = () => {
    setSubmitMessage("");
    setSubmitError("");
    setFormType(!formType);
  };

  const emailError = errorHelper(formik, "email");
  const passwordError = errorHelper(formik, "password");

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto mt-10 p-6 border rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {formType ? "Register" : "Login"}
        </h2>
        <div className="mb-4">
          <Input
            id="email"
            name="email"
            type="email"
            variant="bordered"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full"
          />
          {emailError.hasError ? (
            <p className="mt-1 text-sm text-red-500">
              {emailError.errorMessage}
            </p>
          ) : null}
        </div>
        <div className="mb-4">
          <Input
            id="password"
            name="password"
            type="password"
            variant="bordered"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full"
          />
          {passwordError.hasError ? (
            <p className="mt-1 text-sm text-red-500">
              {passwordError.errorMessage}
            </p>
          ) : null}
        </div>
        {submitError ? (
          <p className="mb-4 text-sm text-red-500">{submitError}</p>
        ) : null}
        {submitMessage ? (
          <p className="mb-4 text-sm text-green-600">{submitMessage}</p>
        ) : null}
        <Button type="submit" className="w-full" isLoading={formik.isSubmitting}>
          {formType ? "Register" : "Login"}
        </Button>
        <p className="text-center mt-4">
          {formType ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={toggleFormType}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {formType ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </>
  );
};

export default RegisterPage;
