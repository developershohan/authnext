"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useTransition, forwardRef } from "react";
import { redirect } from "next/navigation";
import {
  TextField,
  Input,
  Label,
  FieldError,
  Button,
  Select,
  ListBox,
  ListBoxItem,
  Spinner,
} from "@heroui/react";
import { errorHelper } from "@/components/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {toast } from "react-toastify";

const AddEventForm = ({ venuesList, addEvent }) => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const formik = useFormik({
    initialValues: {
      artist: "",
      date: "",
      venue: "",
      description: "",
      slug: "",
    },
    validationSchema: yup.object({
      artist: yup.string().required("Artist is required"),
      date: yup.date().required("Date is required"),
      venue: yup.string().required("Venue is required"),
      description: yup.string().required("Description is required"),
      slug: yup.string().required("Slug is required"),
    }),
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });
  const handleSubmit = async (values) => {
    startTransition(async () => {
      const { success, message } = await addEvent(values);

      if (!success) {
        setError(message);
        toast.error(message);
      } else {
        toast.success(message,{
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        redirect("/dashboard");
      }
    });
  };

  const slugFormat = ()=>{
    const slug = formik.values.artist.toLowerCase().trim().replace(/\s+/g, "-");
    formik.setFieldValue("slug", slug);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-1/2" onSubmit={formik.handleSubmit}>
        <h1 className="text-center text-2xl font-bold mb-4">Add Event</h1>
        <hr />

        <section className="flex flex-col gap-2 my-4">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              name="artist"
              isInvalid={errorHelper(formik, "artist").hasError}
              variant="bordered"
            >
              <Label>Artist</Label>
              <Input
                placeholder="Enter Artist"
                value={formik.values.artist}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  slugFormat();
                }}
              />
              <FieldError>
                {errorHelper(formik, "artist").errorMessage}
              </FieldError>
            </TextField>

            <DatePicker
              name="date"
              selected={startDate}
              onChange={(date) => {
                formik.setFieldValue("date", date, true);
                setStartDate(date);
              }}
              customInput={
                <CustomPickerButton
                  isInvalid={errorHelper(formik, "date").hasError}
                  errorMessage={errorHelper(formik, "date").errorMessage}
                />
              }
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />

            <Select
              name="venue"
              variant="bordered"
              isInvalid={errorHelper(formik, "venue").hasError}
              selectedKey={formik.values.venue}
              onSelectionChange={(key) => formik.setFieldValue("venue", key)}
            >
              <Label>Venue</Label>
              <Select.Trigger>
                <Select.Value placeholder="Select a Venue" />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {venuesList.map((venue) => (
                    <ListBoxItem
                      key={venue._id}
                      id={venue._id}
                      textValue={venue.name}
                    >
                      {venue.name}
                    </ListBoxItem>
                  ))}
                </ListBox>
              </Select.Popover>
              <FieldError>
                {errorHelper(formik, "venue").errorMessage}
              </FieldError>
            </Select>

            <TextField
              name="description"
              isInvalid={errorHelper(formik, "description").hasError}
              variant="bordered"
            >
              <Label>Description</Label>
              <Input
                placeholder="Enter Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FieldError>
                {errorHelper(formik, "description").errorMessage}
              </FieldError>
            </TextField>

            <TextField
              name="slug"
              isInvalid={errorHelper(formik, "slug").hasError}
              variant="bordered"
            >
              <Label>Slug</Label>
              <Input
                placeholder="Enter Slug"
                value={formik.values.slug}
                onChange={(e) => {
                  const formatted = e.target.value.toLowerCase().trim().replace(/\s+/g, "-");
                  formik.setFieldValue("slug", formatted);
                }}
                onBlur={formik.handleBlur}
              />
              <FieldError>
                {errorHelper(formik, "slug").errorMessage}
              </FieldError>
            </TextField>
          </div>
        </section>

        {pending ? null : (
          <Button type="submit">Add Event</Button>
        )}
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default AddEventForm;

const CustomPickerButton = forwardRef(
  ({ value, onClick, isInvalid, errorMessage }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label
          className={`text-sm ${isInvalid ? "text-danger" : "text-foreground"}`}
        >
          Date
        </label>
        <button
          type="button"
          ref={ref}
          onClick={onClick}
          className={`w-full h-10 px-3 rounded-xl border-2 bg-transparent text-left text-sm transition-colors outline-none
                    ${
                      isInvalid
                        ? "border-danger text-danger hover:border-danger"
                        : "border-default-200 text-foreground hover:border-default-400 focus:border-primary"
                    }`}
        >
          {value ? value : "Select Date"}
        </button>
        {isInvalid && errorMessage && (
          <span className="text-xs text-danger">{errorMessage}</span>
        )}
      </div>
    );
  },
);
CustomPickerButton.displayName = "CustomPickerButton";
