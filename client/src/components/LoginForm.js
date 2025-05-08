// WORKING!

import { useFormik } from 'formik';
import React from 'react';
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";

const LoginForm = ({ onLogin }) => {
    const API_BASE = process.env.REACT_APP_API_URL;

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
            fetch(`${API_BASE}/login`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then((response) => {
                if (response.ok) {
                    resetForm();   // clear input field
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
        <div className='poppins-regular'>
            <form onSubmit={formik.handleSubmit} className='loginForm'> 
                <div> 
                    <label htmlFor="email">Email Address</label> 
                    <div  style={{position: "relative"}}>
                        <i className="fa-solid fa-envelope loginIcon"></i>
                        <input  
                          id="email"  
                          name="email"  
                          type="email"  
                          onChange={formik.handleChange}  
                          onBlur={formik.handleBlur}  
                          value={formik.values.email}
                          size={30}
                        /> 
                    </div> 
                    {formik.touched.email && formik.errors.email ? (  
                        <div style={{ color: 'red', paddingTop: '3px', fontSize: '.9rem' }}>{formik.errors.email}</div>  
                    ) : null}   
                </div>
                <div>  
                    <label htmlFor="password">Password</label> 
                    <div style={{position: "relative"}}>
                        <i className="fa-solid fa-unlock loginIcon"></i>
                        <input  
                          id="password"  
                          name="password"  
                          type="password"  
                          onChange={formik.handleChange}  
                          onBlur={formik.handleBlur}  
                          value={formik.values.password} 
                          size={30}
                        />  
                    </div> 
                    {/* ensure valid password */}
                    {formik.touched.password && formik.errors.password ? (  
                        <div style={{ color: 'red', paddingTop: '3px', fontSize: '.9rem' }}>{formik.errors.password}</div>  
                    ) : null}  
                </div>  
                <div>
                    <input
                      id='loginSubmit'
                      type='submit'
                      value={'Log in'}
                      className='btn btn-primary'
                    /> 
                </div>
            </form> 
            <p className='poppins-regular' style={{
                paddingTop: "30px",
                paddingBottom: "1px",
            }}>
                Don't have an account?
                <span style={{paddingLeft: '5px'}}>
                    <Link
                      to={"/users"}
                      className="link-offset-2 link-offset-3-hover 
                      link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    >
                        Sign up
                    </Link> 
                </span>
            </p>
        </div>
    )
}

export default LoginForm;