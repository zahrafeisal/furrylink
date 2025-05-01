// WORKING!

import { useFormik } from 'formik';
import React from 'react';
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";

const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate();

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
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then((response) => {
                if (response.ok) {
                    resetForm();   // clear input fields
                    alert("Log in successful!");
                    navigate("/home")    // navigate to Home
                    return response.json();
                } else {
                    alert("Incorrect username or password.")
                }
            })
            .then((user) => {   // onLogin used here   
                onLogin(user);    // set user in session 
            })
            .catch((error) => {
                alert(error.message)
            })
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
        <p>Don't have an account?</p>
        <Link to={"/users"}>Sign up</Link> 
        </div>
    )
}

export default LoginForm;