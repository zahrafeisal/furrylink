import { useFormik } from "formik";  
import * as Yup from "yup";  
import React, { useEffect } from "react";  
import { useNavigate } from "react-router";
import Navbar from "./Navbar";

function AddPet({ user }) {  
    const navigate = useNavigate();
    const MAX_FILE_SIZE = 16 * 1024 * 1024; 

    const validationSchema = Yup.object({  
        animalType: Yup.string().required("Animal type is required."),  
        breed: Yup.string().required("Animal breed is required."),  
        age: Yup.string().required("Age is required"),  
        price: Yup.string().required("Price is required"),
        image_filename: Yup.mixed()
            .required("File is required") 
            .test("fileSize", "File too large. Maximum size is 16 MB.", (value) => {  
                return value && value.size <= MAX_FILE_SIZE; // Validate size
            })  
            .test("fileFormat", "Unsupported Format. Only .png, .jpg, .jpeg, and .gif are allowed.", (value) => {  
                const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "image/jpg", "image/gif"];  
                return value ? SUPPORTED_FORMATS.includes(value.type) : true;  
            }),  
    });  

    const formik = useFormik({  
        initialValues: {  
            email: "", // Readonly  
            telephone: "",  // Readonly
            animalType: "",  
            breed: "",  
            age: "",  
            price: "",  
            image_filename: null, 
        },  
        validationSchema,
        onSubmit: (values, { resetForm }) => {  
            console.log(values) 
            const formData = new FormData();  
            Object.keys(values).forEach((key) => {  
                formData.append(key, values[key]);  
            });  

            fetch("/pets", {
                method: "POST",
                body: formData
            })
            .then((response) => {
                if (response.ok) {
                    resetForm();
                    alert("Pet added successfully")
                    navigate("/home")
                    return response.json();
                } else {
                    throw new Error("Unable to add pet")
                }
            })
            .then((pet) => {
                console.log(pet.breed)
            })
            .catch((error) => {
                alert(error.message)
            })
        }  
    });  

    useEffect(() => {  
        if (user) {  
            formik.setFieldValue('email', user.email); // Update email when user changes  
            formik.setFieldValue('telephone', user.telephone); // Update tel when user changes  
        }  
    }, [user]);  

    const handleFileChange = (event) => {     // Custom since it doesnt work w formik
        const file = event.currentTarget.files[0];  
        formik.setFieldValue("image_filename", file); // Update with the file object  
    };  

    return (  
        <>
        <Navbar user={user} />
        <div className="addPet">  
            <div className='signUpHeader'>
                <h2 className='dancing-script-landingPageh1'><strong>Looking to give your pet a new home?</strong></h2>  
                <p style={{paddingTop: '30px', color: 'gray', fontSize: '13px'}} className='poppins-regular'>
                    <i style={{paddingRight: '10px'}} className="fa-solid fa-circle-exclamation"></i>
                    The form below contains your details as per your profile.<br />
                    If you wish to update this information kindly do so on your personal profile settings.
                </p>
            </div>  
            <form onSubmit={formik.handleSubmit} className="addPetForm row g-0 poppins-regular">  
                <div className='col-md-6'>  
                    <label htmlFor="email">Email Address</label>  
                    <input  
                        type="text"  
                        name="email"  
                        id="email"  
                        readOnly  
                        value={formik.values.email}  
                        size={30}  
                    />  
                </div>  
                <div className='col-md-6'>  
                    <label htmlFor="telephone">Telephone</label>  
                    <input  
                        type="tel"  
                        id="telephone"
                        name="telephone"    
                        readOnly  
                        value={formik.values.telephone}  
                        size={30}  
                    />  
                </div>  
                <div className='col-md-6'>  
                    <label htmlFor="animalType">Animal Type</label>  
                    <input  
                        type="text"  
                        name="animalType"  
                        id="animalType"  
                        onChange={formik.handleChange}  
                        onBlur={formik.handleBlur}  
                        value={formik.values.animalType}  
                        size={30}  
                        placeholder="Eg; Dog, Cat"
                    />  
                    {formik.touched.animalType && formik.errors.animalType ? (  
                        <div style={{ color: 'red' }}>{formik.errors.animalType}</div>  
                    ) : null}  
                </div>  
                <div className='col-md-6'>  
                    <label htmlFor="breed">Animal Breed</label>  
                    <input  
                        type="text"  
                        name="breed"  
                        id="breed"  
                        onChange={formik.handleChange}  
                        onBlur={formik.handleBlur}  
                        value={formik.values.breed}  
                        size={30}  
                        placeholder="Eg; German Shepherd"
                    />  
                    {formik.touched.breed && formik.errors.breed ? (  
                        <div style={{ color: 'red' }}>{formik.errors.breed}</div>  
                    ) : null}  
                </div>  
                <div className='col-md-6'>  
                    <label htmlFor="age">Animal Age</label>  
                    <input  
                        type="text"  
                        name="age"  
                        id="age"  
                        onChange={formik.handleChange}  
                        onBlur={formik.handleBlur}  
                        value={formik.values.age}  
                        size={30}  
                    />  
                    <div style={{
                        color: '#999'
                    }}>Indicate in years.</div>
                    {formik.touched.age && formik.errors.age ? (  
                        <div style={{ color: 'red' }}>{formik.errors.age}</div>  
                    ) : null}  
                </div>  
                <div className='col-md-6'>  
                    <label htmlFor="price">Price</label>  
                    <input  
                        type="text"  
                        name="price"  
                        id="price"  
                        onChange={formik.handleChange}  
                        onBlur={formik.handleBlur}  
                        value={formik.values.price}  
                        size={30}  
                    />  
                    {formik.touched.price && formik.errors.price ? (  
                        <div style={{ color: 'red' }}>{formik.errors.price}</div>  
                    ) : null}  
                </div>  
                <div className='col-12'>  
                    <label htmlFor="image_filename">Please provide a clear image of the pet</label>  
                    <input  
                        type="file"  
                        name="image_filename"  
                        id="image_filename"  
                        onChange={handleFileChange} // Use the custom handler  
                        style={{
                            borderRadius: '10px',
                            padding: '7px',
                            borderWidth: '1px'
                        }}
                    />  
                    {formik.touched.image_filename && formik.errors.image_filename ? (  
                        <div style={{ color: 'red' }}>{formik.errors.image_filename}</div>  
                    ) : null}  
                </div>  
                <input 
                  type="submit" 
                  value="Add pet" 
                  className='signUpSubmit col-md-4 btn btn-primary'
                />  
            </form>  
        </div>  
        </>
    );  
}  

export default AddPet;  