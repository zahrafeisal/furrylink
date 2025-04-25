// application form goes here
// from 'apply for adoption' button when an individual pet is clicked

import React from "react";
import { useFormik } from 'formik';  
import * as Yup from 'yup';  

const AdoptionApplication = () => {

    const validationSchema = Yup.object({});

    const formik = useFormik({});

    return (
        <div></div>
    )
}

export default AdoptionApplication;