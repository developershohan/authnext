'use client'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {useState, useTransition} from 'react'
import { redirect } from 'next/navigation'
import { TextField, Input, Label, FieldError, Button } from '@heroui/react'
import {errorHelper} from '@/components/utils'


const AddEventForm = () => {

    const formik = useFormik({
        initialValues: {
            artist: '',
            date: '',
            venue: '',
            description: '',
            slug:''
        },
        validationSchema: yup.object({
            artist: yup.string().required('Artist is required'),
            date: yup.date().required('Date is required'),
            venue: yup.string().required('Venue is required'),
            description: yup.string().required('Description is required'),
            slug: yup.string().required('Slug is required')
        }),
        onSubmit: async (values) => {
            console.log(values)
        }
    })



  return (
    <div className='flex justify-center items-center h-screen'>
        <form className='w-1/2' onSubmit={formik.handleSubmit}>

            <h1 className='text-center text-2xl font-bold mb-4'>Add Event</h1>
            <hr />

            <section className='flex flex-col gap-2 my-4'   >

                <div className="grid grid-cols-2 gap-4">

                <TextField
                    name='artist'
                    isInvalid={errorHelper(formik,'artist').hasError}
                    variant='bordered'
                >
                    <Label>Artist</Label>
                    <Input
                        placeholder='Enter Artist'
                        value={formik.values.artist}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <FieldError>{errorHelper(formik,'artist').errorMessage}</FieldError>
                </TextField>

                <TextField
                    name='date'
                    isInvalid={errorHelper(formik,'date').hasError}
                    variant='bordered'
                >
                    <Label>Date</Label>
                    <Input
                        placeholder='Enter Date'
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <FieldError>{errorHelper(formik,'date').errorMessage}</FieldError>
                </TextField>

                <TextField
                    name='venue'
                    isInvalid={errorHelper(formik,'venue').hasError}
                    variant='bordered'
                >
                    <Label>Venue</Label>
                    <Input
                        placeholder='Enter Venue'
                        value={formik.values.venue}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <FieldError>{errorHelper(formik,'venue').errorMessage}</FieldError>
                </TextField>

                <TextField
                    name='description'
                    isInvalid={errorHelper(formik,'description').hasError}
                    variant='bordered'
                >
                    <Label>Description</Label>
                    <Input
                        placeholder='Enter Description'
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <FieldError>{errorHelper(formik,'description').errorMessage}</FieldError>
                </TextField>

                <TextField
                    name='slug'
                    isInvalid={errorHelper(formik,'slug').hasError}
                    variant='bordered'
                >
                    <Label>Slug</Label>
                    <Input
                        placeholder='Enter Slug'
                        value={formik.values.slug}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <FieldError>{errorHelper(formik,'slug').errorMessage}</FieldError>
                </TextField>

                                </div>
            </section>
            <Button type='submit'>Add Event</Button>
        </form>
    </div>
  )
}

export default AddEventForm