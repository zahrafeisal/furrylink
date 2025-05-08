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

    function handleAdoptClick(pet) {
        navigate('/application', {
            state: { pet }
        })
    }

    function handleSearchChange(e) {
        const input = e.target.value.toLowerCase();
        setUserSearch(input);

        const filterPets = allPets.filter(pet => 
            pet.type.toLowerCase().includes(input) ||
            pet.breed.toLowerCase().includes(input)
        );

        setFilteredPets(filterPets);
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
    }
    return (
        <>
            <Navbar user={user} />
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
                      style={{ marginLeft: '2px' }}
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>

            {/* Pet Cards */}
            <div className="poppins-regular">
                {filteredPets.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        paddingTop: '120px',
                        color: "gray"
                    }}>
                        <i style={{ fontSize: '3rem' }} className="fa-solid fa-circle-exclamation"></i>
                        <h5 style={{ paddingTop: '20px' }}>No pets available. Please check back later!</h5>
                    </div>
                ) : (
                    <div className='homeCards'>
                        {filteredPets.map((pet) => (
                            <div
                              key={pet.id}
                              className='homeCard'
                            >
                                <div className='cardImg'>
                                    <img
                                      src={`https://furrylink-backend.onrender.com/${pet.image_filename}`}
                                      alt={pet.breed}
                                    />
                                </div>
                                <div className='cardBody'>
                                    <h6>{pet.breed} {pet.type}</h6>
                                    <p><strong>Age: </strong>{pet.age} yrs</p>
                                    <p><strong>Price: </strong>Ksh. {pet.price}</p>
                                    <p><strong>Posted by: </strong>
                                        {pet.user?.animal_shelter 
                                        ? `${pet.user.organization_name ?? 'N/A'}`
                                        : `${pet.user?.first_name ?? ''} ${pet.user?.last_name ?? ''}`.trim()
                                        }{' '}
                                        ({pet?.user?.email})
                                    </p>
                                    <div className='cardNav'>
                                        {pet.user.animal_shelter ? (
                                            <small style={{color: 'gray'}}>Registered Shelter<i style={{marginLeft: '1px'}} className="fa-regular fa-registered"></i></small>
                                        ): null}
                                    </div>
                                    {!(user.animal_shelter) ? (
                                        <div className='applyLink'>
                                            <small onClick={() => handleAdoptClick(pet)}>Apply now</small>
                                        </div>
                                    ) : null}
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