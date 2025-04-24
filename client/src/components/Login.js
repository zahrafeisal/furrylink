import { useFormik } from 'formik';
import React from 'react';
import * as Yup from "yup";

const LoginForm = ({ onLogin }) => {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Required")
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            // API functionality
            // onLogin used here
            resetForm();      // clear input fields
        }
    });

    return (
        <div className='loginPage'>
            <h2>Log in to Furry Link</h2>
            <form onSubmit={formik.handleSubmit} className='loginForm'>  
            <div>
                <label htmlFor="email">Email</label>  
                <input  
                    id="email"  
                    name="email"  
                    type="email"  
                    onChange={formik.handleChange}  
                    onBlur={formik.handleBlur}  
                    value={formik.values.email}
                    size={30}
                />  
                {/* ensure valid email address */}
                {formik.touched.email && formik.errors.email ? (  
                    <div style={{ color: 'red' }}>{formik.errors.email}</div>  
                ) : null}  
            </div>  
            <div>  
                <label htmlFor="password">Password</label>  
                <input  
                    id="password"  
                    name="password"  
                    type="password"  
                    onChange={formik.handleChange}  
                    onBlur={formik.handleBlur}  
                    value={formik.values.password} 
                    size={30} 
                />  
                {/* ensure valid password */}
                {formik.touched.password && formik.errors.password ? (  
                    <div style={{ color: 'red' }}>{formik.errors.password}</div>  
                ) : null}  
            </div>  
            <input
              id='loginSubmit'
              type='submit'
              value={'Log in'}
            /> 
        </form>  
        </div>
    )
}

export default LoginForm;