import React from 'react';  
import { useFormik } from 'formik';  
import * as Yup from 'yup';
import "../App.css";

const SignupForm = () => {

    const validationSchema = Yup.object({  
        firstName: Yup.string()
            .max(30, 'Maximum of 20 characters allowed')
            .required('First name is required'),  
        lastName: Yup.string()
            .max(30, 'Maximum of 20 characters allowed')
            .required('Last name is required'),  
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),  
        password: Yup.string()  
            .min(8, 'Password must be at least 8 characters')  
            .required('Password is required'),  
        confirmPassword: Yup.string()  
            .oneOf([Yup.ref('password'), null], 'Password does not match')  
            .required('Please confirm your password'),  
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            // API functionality
            // clear input fields 
            resetForm();    
        }
    })

    return (
        <div className='signUpPage'>
            <h2>Create Account</h2>
            <form onSubmit={formik.handleSubmit} className='signUpForm'>
                <div>
                    <label htmlFor='firstName'>First name</label>
                    <input
                      id='firstName'
                      type='text'
                      name='firstName'
                      onChange={formik.handleChange}  
                      onBlur={formik.handleBlur}  
                      value={formik.values.firstName}
                      size={50}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (  
                        <div style={{ color: 'red' }}>{formik.errors.firstName}</div>  
                    ) : null}  
                </div>
                <div>
                    <label htmlFor='lastName'>Last name</label>
                    <input
                      id='lastName'
                      type='text'
                      name='lastName'
                      onChange={formik.handleChange}  
                      onBlur={formik.handleBlur}  
                      value={formik.values.lastName} 
                      size={50} 
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (  
                        <div style={{ color: 'red' }}>{formik.errors.lastName}</div>  
                    ) : null}  
                </div>
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input
                      id='email'
                      type='email'
                      name='email'
                      onChange={formik.handleChange}  
                      onBlur={formik.handleBlur}  
                      value={formik.values.email} 
                      size={50} 
                    />
                    {formik.touched.email && formik.errors.email ? (  
                        <div style={{ color: 'red' }}>{formik.errors.email}</div>  
                    ) : null}  
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                      id='password'
                      type='password'
                      name='password'
                      onChange={formik.handleChange}  
                      onBlur={formik.handleBlur}  
                      value={formik.values.password} 
                      size={50}
                    />
                    {formik.touched.password && formik.errors.password ? (  
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>  
                    ) : null}  
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                      id='confirmPassword'
                      type='password'
                      name='confirmPassword'
                      onChange={formik.handleChange}  
                      onBlur={formik.handleBlur}  
                      value={formik.values.confirmPassword}  
                      size={50}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (  
                        <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>  
                    ) : null}  
                </div>
                <input
                  type='submit'
                  value={'Sign up'}
                  id='signUpSubmit'
                /> 
            </form>
        </div>
    )
};  

export default SignupForm;  