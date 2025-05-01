import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useFormik } from 'formik';  
import * as Yup from 'yup';  


const ApplicationForm = ({ currentUser }) => {
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

            fetch("/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Problem posting application")
                }
            })
            .then((application) => {
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
            formik.setFieldValue('animalShelter', pet.user.animal_shelter === 1 ? "Yes" : "No");  
        }  
    }, [pet]);  

    return (
        <div>
            <h2>Adopt Pet</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <img src={pet.image_filename} alt={pet.breed} />  
                    {/* all inputs readonly */}
                    <h3>Pet details</h3>
                    <label htmlFor="petType"></label>
                    <input
                      type="text"
                      id="petType"
                      name="petType"
                      value={formik.values.petType}
                      readOnly
                    />
                    <label htmlFor="petBreed"></label>
                    <input
                      type="text"
                      id="petBreed"
                      name="petBreed"
                      value={formik.values.petBreed}
                      readOnly
                    />
                    <label htmlFor="petAge"></label>
                    <input
                      type="text"
                      id="petAge"
                      name="petAge"
                      value={formik.values.petAge}
                      readOnly
                    />
                    <label htmlFor="petPrice"></label>
                    <input
                      type="text"
                      id="petPrice"
                      name="petPrice"
                      value={formik.values.petPrice}
                      readOnly
                    />
                </div>
                <div>
                    {/* email, name, phone number, shelter? */}
                    <h3>Owner details</h3>
                    <label htmlFor="ownerName"></label>
                    <input
                      type="text"
                      id="ownerName"
                      name="ownerName"
                      value={formik.values.ownerName}
                      readOnly
                    />
                    <label htmlFor="ownerEmail"></label>
                    <input
                      type="email"
                      name="ownerEmail"
                      id="ownerEmail"
                      value={formik.values.ownerEmail}
                      readOnly
                    />
                    <label htmlFor="ownerTelephone"></label>
                    <input
                      type="tel"
                      id="ownerTelephone"
                      name="ownerTelephone"
                      value={formik.values.ownerTelephone}
                      readOnly
                    />
                    <label htmlFor="animalShelter"></label>
                    <input
                      type="text"
                      id="animalShelter"
                      name="animalShelter"
                      value={formik.values.animalShelter}
                      readOnly
                    />
                </div>
                <div>
                    {/* email & name readonly, telephone, description*/}
                    <h3>Your details</h3>
                    <label htmlFor="userName"></label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      value={formik.values.userName}
                      readOnly
                    />
                    <label htmlFor="userEmail"></label>
                    <input
                      type="email"
                      name="userEmail"
                      id="userEmail"
                      value={formik.values.userEmail}
                      readOnly
                    />
                    <label htmlFor="userTelephone"></label>
                    <input
                      type="tel"
                      id="userTelephone"
                      name="userTelephone"
                      value={formik.values.ownerTelephone}
                      readOnly
                    />
                    <label htmlFor="description"></label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                </div>
                <input type="submit" value={"Send Application"}/>
            </form>
        </div>
    )
}

export default ApplicationForm;