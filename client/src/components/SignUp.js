// WORKING!

import React, { useState } from 'react';  
import { useFormik } from 'formik';  
import * as Yup from 'yup';  
import "../App.css";  
import { Link, useNavigate } from 'react-router';

const SignupForm = ({ onSignUp }) => { 
    const navigate = useNavigate();
    
    const [isAnimalShelter, setIsAnimalShelter] = useState(false); // determine user type  

    const validationSchema = Yup.object({  
        firstName: Yup.string()  
            .max(30, 'Maximum of 30 characters allowed')   
            .when('isAnimalShelter', {  
                is: false,  
                then: Yup.string().required('First name is required') // Only required if not an animal shelter  
            }),  
        lastName: Yup.string()  
            .max(30, 'Maximum of 30 characters allowed')  
            .when('isAnimalShelter', {  
                is: false,  
                then: Yup.string().required('Last name is required') // Only required if not an animal shelter  
            }),  
        telephone: Yup.string()
            .required('Please enter a valid phone number'),
        email: Yup.string()  
            .email('Invalid email address')  
            .required('Email is required'),  
        password: Yup.string()  
            .min(8, 'Password must be at least 8 characters')  
            .required('Password is required'),  
        confirmPassword: Yup.string()  
            .oneOf([Yup.ref('password'), null], 'Password does not match')  
            .required('Please confirm your password'),  
        animalShelter: Yup.string()  
            .required('Selection is required'),  
        organizationName: Yup.string()  
            .when('isAnimalShelter', {  
                is: true,  
                then: Yup.string().required('Organization name is required') // Only required if isAnimalShelter is true  
            }),  
    });  

    const formik = useFormik({  
        initialValues: {  
            firstName: "",  
            lastName: "",
            telephone: "",
            email: "",  
            animalShelter: "",  
            organizationName: "", // Added for animal shelters  
            password: "",  
            confirmPassword: ""  
        },  
        validationSchema,  
        onSubmit: (values, { resetForm }) => {  
            const data = {  
                ...values,  
                animalShelter: values.animalShelter === 'yes', // Converts 'yes'/'no' to true/false  
            };  
            console.log(data);  
            // Send to your API database  
            fetch("/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                if (response.ok) {
                    alert("Account created successfully!");
                    navigate("/home");
                    return response.json();
                } else {
                    alert("User already exists.");
                }
            })
            .then((user) => {
                onSignUp(user);
            })
            .catch((error) => {
                alert(error.message)
            })
            resetForm();  
        }  
    });  

    const handleAnimalShelterChange = (e) => {  
        const value = e.target.value;  
        setIsAnimalShelter(value === 'yes');  
        formik.setFieldValue('animalShelter', value); // Ensure Formik state is updated  
    };  

    return (  
        <div className='signUpPage'>
            <div className='signUpHeader'>
                <h2 className='dancing-script-landingPageh1'>Furrylink</h2>  
                <p className='poppins-regular' style={{color: 'gray'}}>Sign up to give a pet their dream home</p>
            </div>  
            <form onSubmit={formik.handleSubmit} className='poppins-regular signUpForm'>  
                <div>  
                    <p>Registered Animal Shelter</p>  
                    <label>  
                      <input  
                        type='radio'  
                        name='animalShelter'  
                        value='yes'  
                        onChange={handleAnimalShelterChange}  
                      />   
                      Yes  
                    </label>  
                    <label>  
                      <input  
                        type='radio'  
                        name='animalShelter'  
                        value='no'  
                        onChange={handleAnimalShelterChange}  
                      />   
                      No  
                    </label>  
                    {formik.touched.animalShelter && formik.errors.animalShelter ? (  
                        <div style={{ color: 'red', paddingTop: '3px', fontSize: '.9rem' }}>{formik.errors.animalShelter}</div>  
                    ) : null}  
                </div>  

                {isAnimalShelter ? (  
                    <div>  
                        <label htmlFor='organizationName'>Name of the Organization</label>  
                        <div style={{position: "relative"}}>
                            <i className="fa-solid fa-trademark signUpIcon"></i>
                            <input  
                                id='organizationName'  
                                type='text'  
                                name='organizationName'  
                                onChange={formik.handleChange}  
                                onBlur={formik.handleBlur}  
                                value={formik.values.organizationName}  
                                size={30}  
                            />  
                        </div>
                        {formik.touched.organizationName && formik.errors.organizationName ? (  
                            <div style={{ color: 'red', paddingTop: '3px', fontSize: '.9rem' }}>{formik.errors.organizationName}</div>  
                        ) : null}  
                    </div>
                    
                ) : (  
                    <>  
                        <div>  
                            <label htmlFor='firstName'>First Name</label>  
                            <div style={{position: "relative"}}>
                                <i className="fa-solid fa-user signUpIcon"></i>
                                <input  
                                    id='firstName'  
                                    type='text'  
                                    name='firstName'  
                                    onChange={formik.handleChange}  
                                    onBlur={formik.handleBlur}  
                                    value={formik.values.firstName}  
                                    size={30}  
                                /> 
                            </div> 
                            {formik.touched.firstName && formik.errors.firstName ? (  
                                <div style={{ color: 'red', paddingTop: '3px', fontSize: '.9rem' }}>{formik.errors.firstName}</div>  
                            ) : null}  
                        </div>  

                        <div>  
                            <label htmlFor='lastName'>Last Name</label>  
                            <div style={{position: "relative"}}>
                                <i className="fa-solid fa-user signUpIcon"></i>
                                <input  
                                    id='lastName'  
                                    type='text'  
                                    name='lastName'  
                                    onChange={formik.handleChange}  
                                    onBlur={formik.handleBlur}  
                                    value={formik.values.lastName}   
                                    size={30}   
                                />  
                            </div>
                            {formik.touched.lastName && formik.errors.lastName ? (  
                                <div style={{ color: 'red', paddingTop: '3px', fontSize: '.9rem' }}>{formik.errors.lastName}</div>  
                            ) : null}  
                        </div>
                    </>  
                )}  

                <div>  
                    <label htmlFor='email'>Email Address</label>  
                    <div style={{position: "relative"}}>
                        <i className="fa-solid fa-envelope signUpIcon"></i>
                        <input  
                            id='email'  
                            type='email'  
                            name='email'  
                            onChange={formik.handleChange}  
                            onBlur={formik.handleBlur}  
                            value={formik.values.email}   
                            size={30}   
                            placeholder='janedoe@example.com'
                        />  
                    </div>
                    {formik.touched.email && formik.errors.email ? (  
                        <div style={{ color: 'red', paddingTop: '3px', fontSize: '.9rem' }}>{formik.errors.email}</div>  
                    ) : null}  
                </div>  

                <div>  
                    <label htmlFor='telephone'>Telephone</label>  
                    <div style={{position: "relative"}}>
                        <i className="fa-solid fa-phone signUpIcon"></i>
                        <input  
                            id='telephone'  
                            type='tel'  
                            name='telephone'  
                            pattern='[0-9]{4}-[0-9]{3}-[0-9]{3}'
                            placeholder='Eg; 0712-345-678'
                            onChange={formik.handleChange}  
                            onBlur={formik.handleBlur}  
                            value={formik.values.telephone}   
                            size={30}   
                        />  
                    </div>
                    {formik.touched.telephone && formik.errors.telephone ? (  
                        <div style={{ color: 'red', paddingTop: '3px', fontSize: '.9rem' }}>{formik.errors.telephone}</div>  
                    ) : null}  
                </div>  

                <div>  
                    <label htmlFor='password'>Password</label> 
                    <div style={{position: "relative"}}>
                        <i className="fa-solid fa-lock signUpIcon"></i>
                        <input  
                            id='password'  
                            type='password'  
                            name='password'  
                            onChange={formik.handleChange}  
                            onBlur={formik.handleBlur}  
                            value={formik.values.password}   
                            size={30}  
                        />  
                    </div> 
                    {formik.touched.password && formik.errors.password ? (  
                        <div style={{ color: 'red', paddingTop: '3px', fontSize: '.9rem' }}>{formik.errors.password}</div>  
                    ) : null}  
                </div>  
                
                <div>  
                    <label htmlFor='confirmPassword'>Confirm Password</label>  
                    <div style={{position: "relative"}}>
                        <i className="fa-solid fa-unlock signUpIcon"></i>
                        <input  
                            id='confirmPassword'  
                            type='password'  
                            name='confirmPassword'  
                            onChange={formik.handleChange}  
                            onBlur={formik.handleBlur}  
                            value={formik.values.confirmPassword}  
                            size={30}  
                        />  
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (  
                        <div style={{ color: 'red', paddingTop: '3px', fontSize: '.9rem' }}>{formik.errors.confirmPassword}</div>  
                    ) : null}  
                </div>  
                {/* <div>
                    <input  
                        type='submit'  
                        value={'Sign up'}  
                        className='signUpSubmit btn btn-primary'  
                    />     
                </div> */}
                <div>
                    <button
                      type='submit'
                      className='signUpSubmit btn btn-primary'
                    >
                        Sign up
                    </button>
                </div>
                <small style={{fontSize: '.8rem'}}>By creating an account you agree to our Terms and Conditions.</small>
            </form>  
            <p 
                className='poppins-regular signUph5'
                style={{
                        paddingTop: "30px",
                }}
            >
                Already have an account?
                <span style={{paddingLeft: '5px'}}>
                    <Link
                        to={"/login"}
                        className="link-offset-2 link-offset-3-hover 
                                  link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    >
                        Log in
                    </Link> 
                </span>
            </p>
        </div>  
    );  
};  

export default SignupForm;  