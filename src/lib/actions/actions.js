'use server'

import {connectToDatabase} from "@lib/db";
import Venue from "@/lib/models/venue";

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
};


export async function createVenue(prevState, formData) {
  await connectToDatabase();

  try {
    const { name, address, state, country, city } = formData;

    // ── Server-side validation ──
    const errors = {};

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      errors.name = "Name is required";
    } else if (name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }

    if (!address || typeof address !== "string" || address.trim().length === 0) {
      errors.address = "Address is required";
    } else if (address.trim().length < 3) {
      errors.address = "Address must be at least 3 characters long";
    }

    if (!country || typeof country !== "string" || country.trim().length === 0) {
      errors.country = "Country is required";
    } else if (country.trim().length < 3) {
      errors.country = "Country must be at least 3 characters long";
    }

    if (!state || typeof state !== "string" || state.trim().length === 0) {
      errors.state = "State is required";
    } else if (state.trim().length < 3) {
      errors.state = "State must be at least 3 characters long";
    }

    if (!city || typeof city !== "string" || city.trim().length === 0) {
      errors.city = "City is required";
    } else if (city.trim().length < 3) {
      errors.city = "City must be at least 3 characters long";
    }

    if (Object.keys(errors).length > 0) {
      return {
        type: "error",
        message: "Please fix the highlighted fields",
        errors,
      };
    }

    // ── Save to database ──
    const newVenue = new Venue({
      name: name.trim(),
      address: address.trim(),
      state: state.trim(),
      country: country.trim(),
      city: city.trim(),
    });
    await newVenue.save();

    return {
      type: "success",
      message: "Venue created successfully",
    };
  } catch (error) {
    // Handle Mongoose duplicate key error
    if (error.code === 11000) {
      return {
        type: "error",
        message: "A venue with this name already exists",
        errors: { name: "A venue with this name already exists" },
      };
    }

    return {
      type: "error",
      message: getErrorMessage(error),
    };
  }
}