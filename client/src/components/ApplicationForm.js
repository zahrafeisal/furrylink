// application form goes here
// from 'apply for adoption' button when an individual pet is clicked

import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useFormik } from 'formik';  
import * as Yup from 'yup';  


// inputs : User email => readOnly 
//          Pet details => readOnly 
//          Desrcription (why you want to adopt)  *only send this to backend*

const ApplicationForm = ({ currentUser }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pet = location.state?.pet;    // access data from state in pet card when navigated from home

    const validationSchema = Yup.object({});

    const formik = useFormik({
        initialValues: {},
        validationSchema,
        onSubmit: (values, { resetForm }) => {}
    });

    return (
        <div>
            <h2>Adopt Pet</h2>
            <form onSubmit={formik.handleSubmit}></form>
        </div>
    )
}

export default ApplicationForm;