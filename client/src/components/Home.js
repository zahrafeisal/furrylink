import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import Navbar from './Navbar';

function Home({ pets, user }) {  
    const [allPets, setAllPets] = useState(pets);  
    const [filteredPets, setFilteredPets] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    const navigate = useNavigate();  
    
    useEffect(() => {  
        setAllPets(pets); // Sync pets whenever updated  
        setFilteredPets(pets);
    }, [pets]);  
    
    function handlePetClick(pet) {  
        navigate(`/pet/${pet.id}`, {
            state: { pet }
        });       // Navigate to pet component, have apply functionality from here
    }  

    function handleSearchChange(e) {
        const input = e.target.value.toLowerCase();
        setUserSearch(input);

        const filterPets = allPets.filter(pet => 
            pet.type.toLowerCase().includes(input) ||
            pet.breed.toLowerCase().includes(input)
        )

        console.log(filterPets);
        setFilteredPets(filterPets);
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
    }
    
    return (  
        <>
        <Navbar user={user}/>
        <div className='homeHeader dancing-script-landingPageh1'>
            <h2>Explore</h2>
            <form onSubmit={handleSearchSubmit} className='homeSearch poppins-regular'>
                <input
                  id="search"
                  type="search" 
                  placeholder="Search pets..."
                  value={userSearch}
                  onChange={handleSearchChange}
                /> 
                <button
                  type='submit'
                  className='btn signUpbtn'
                  style={{
                    marginLeft: '2px'
                  }}
                >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
        <div className="poppins-regular">
            {filteredPets.length === 0 ? ( 
                <div style={{
                        textAlign: 'center',
                        paddingTop: '120px',
                        color: "gray"
                    }}>
                        <i style={{fontSize: '3rem'}} className="fa-solid fa-circle-exclamation"></i>
                        <h5 style={{paddingTop: '20px'}} >No pets available. Please check back later!</h5>  
                </div>
                ) : (
                    <div className='homeCards'
                        style={{
                            marginLeft: '140px'
                        }}
                    >
                        {filteredPets.map((pet) => (
                            <div key={pet.id} onClick={() => handlePetClick(pet)} className='homeCard' style={{width: '18rem'}}>
                                <div className='cardImg'>
                                    <img src={pet.image_filename} alt={pet.breed} />  
                                </div>
                                <div className='cardBody'>
                                    <h5><strong>{pet.breed}</strong></h5>  
                                    <p>{pet.type}</p>  
                                    <p><small>Ksh. {pet.price}</small></p>
                                </div>
                            </div>  
                        ))}
                    </div>
                )}  
        </div> 
        </> 
    );  
}  

export default Home;