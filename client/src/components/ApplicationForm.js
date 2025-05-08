import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useFormik } from 'formik';  
import * as Yup from 'yup';  
import Navbar from "./Navbar";


const ApplicationForm = ({ currentUser }) => {
    const API_BASE = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const location = useLocation();
    const pet = location.state?.pet;    // access data from state in pet card when navigated from home

    const validationSchema = Yup.object({
        description: Yup.string().required("Please provide a description.")
    });

    const formik = useFormik({
        initialValues: {
            petType: pet?.type || "",  
            petBreed: pet?.breed || "",  
            petAge: pet?.age || "",  
            petPrice: pet?.price || "",  
            ownerName: pet?.user?.animal_shelter 
            ? pet?.user?.organization_name || "" 
            : (pet?.user?.first_name && pet?.user?.last_name ? `${pet?.user?.first_name} ${pet?.user?.last_name}` : ""),
            ownerEmail: pet?.user?.email || "",  
            ownerTelephone: pet?.user?.telephone || "",  
            animalShelter: pet?.user?.animal_shelter || "",  
            userName: currentUser?.animal_shelter 
            ? currentUser?.organization_name || "" 
            : (currentUser?.first_name && currentUser?.last_name ? `${currentUser?.first_name} ${currentUser?.last_name}` : ""),  
            userEmail: currentUser?.email || "",  
            userTelephone: currentUser?.telephone || "",  
            description: ""  
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values.description)
            const data = {
                description: values.description,
                petID: pet?.id
            }

            fetch(`${API_BASE}/applications`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                if (response.ok) {
                    resetForm()
                    return response.json()
                } else {
                    throw new Error("Problem posting application")
                }
            })
            .then((application) => {
                navigate("/home")
                console.log(application)
            })
            .catch((error) => {
                alert(error.message)
            })
        }
    });

    useEffect(() => {  
        if (currentUser) {  
            formik.setFieldValue('userEmail', currentUser.email); // Update email when user changes  
        }  
    }, [currentUser]);  

    useEffect(() => {  
        if (pet) {  
            formik.setFieldValue('animalShelter', pet.user.animal_shelter ? "Yes" : "No");  
        }  
    }, [pet]);  

    return (
        <>
        <Navbar user={currentUser} />
        <div className="addPet">
            <div className='signUpHeader'>
                <h2 className='dancing-script-landingPageh1'><strong>Ready to adopt a pet?</strong></h2>  
                <p style={{paddingTop: '30px', color: 'gray', fontSize: '13px'}} className='poppins-regular'>
                    <i style={{paddingRight: '10px'}} className="fa-solid fa-circle-exclamation"></i>
                    The form below contains your details as per your profile.<br />
                    If you wish to update this information kindly do so on your personal profile settings.
                </p>
            </div>  
            <form onSubmit={formik.handleSubmit} className="addPetForm row g-0 poppins-regular">
                <div className="col-md-6">
                    {/* all inputs readonly */}
                    <h3><strong>Pet's details</strong></h3>
                    <div >
                      <img style={{width: '35%', height: '25%', borderRadius: '10px'}} src={`https://furrylink-backend.onrender.com/${pet.image_filename}`} />
                    </div>
                    <label htmlFor="petType">Type</label>
                    <input
                      type="text"
                      id="petType"
                      name="petType"
                      value={formik.values.petType}
                      readOnly
                      size={40}
                    />
                    <label htmlFor="petBreed">Breed</label>
                    <input
                      type="text"
                      id="petBreed"
                      name="petBreed"
                      value={formik.values.petBreed}
                      readOnly
                      size={40}
                    />
                    <label htmlFor="petAge">Age</label>
                    <input
                      type="text"
                      id="petAge"
                      name="petAge"
                      value={formik.values.petAge}
                      readOnly
                      size={40}
                    />
                    <label htmlFor="petPrice">Price</label>
                    <input
                      type="text"
                      id="petPrice"
                      name="petPrice"
                      value={formik.values.petPrice}
                      readOnly
                      size={40}
                    />
                </div>
                <div className="col-md-6">
                    {/* email, name, phone number, shelter? */}
                    <h3><strong>Custodian's details</strong></h3>
                    <label htmlFor="ownerName">Name</label>
                    <input
                      type="text"
                      id="ownerName"
                      name="ownerName"
                      value={formik.values.ownerName}
                      readOnly
                      size={40}
                    />
                    <label htmlFor="ownerEmail">Email Address</label>
                    <input
                      type="email"
                      name="ownerEmail"
                      id="ownerEmail"
                      value={formik.values.ownerEmail}
                      readOnly
                      size={40}
                    />
                    <label htmlFor="ownerTelephone">Phone Number</label>
                    <input
                      type="tel"
                      id="ownerTelephone"
                      name="ownerTelephone"
                      value={formik.values.ownerTelephone}
                      readOnly
                      size={40}
                    />
                    <label htmlFor="animalShelter">Registered Animal Shelter</label>
                    <input
                      type="text"
                      id="animalShelter"
                      name="animalShelter"
                      value={formik.values.animalShelter}
                      readOnly
                      size={40}
                    />
                </div>
                <div className="col-12" style={{
                    paddingTop: "50px"
                }}>
                    {/* email & name readonly, telephone, description*/}
                    <h3><strong>Your details</strong></h3>
                    <label htmlFor="userName">Name</label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      value={formik.values.userName}
                      readOnly
                      size={40}
                    />
                    <label htmlFor="userEmail">Email Address</label>
                    <input
                      type="email"
                      name="userEmail"
                      id="userEmail"
                      value={formik.values.userEmail}
                      readOnly
                      size={40}
                    />
                    <label htmlFor="userTelephone">Phone Number</label>
                    <input
                      type="tel"
                      id="userTelephone"
                      name="userTelephone"
                      value={formik.values.ownerTelephone}
                      readOnly
                      size={40}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      placeholder="Briefly describe how you're willing and capable to give this pet a loving and conducive environment"
                      style={{
                        width: '50%',
                        height: '50%'
                      }}
                    />
                    {formik.touched.description && formik.errors.description ? (  
                        <div style={{ color: 'red' }}>{formik.errors.description}</div>  
                    ) : null}  
                </div>
                <input 
                  type="submit" 
                  value="Send Application" 
                  className='signUpSubmit col-md-4 btn btn-primary'
                  style={{
                    marginTop: '12rem'
                  }}
                />  
            </form>
        </div>
        </>
    )
}
export default ApplicationForm;