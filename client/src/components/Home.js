// WORKING

import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  

function Home({ pets }) {  
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
        <div className="home">  
            <form onSubmit={handleSearchSubmit}>
                <input
                  id="search"
                  type="search" 
                  placeholder="Search pets..."
                  value={userSearch}
                  onChange={handleSearchChange}
                /> 
                <input
                  type='submit'
                  value={'Search'}
                /> 
            </form>
            {filteredPets.length === 0 ? (  
                <p>No pets available. Please check back later!</p>  
            ) : (  
                filteredPets.map((pet) => (
                    <div key={pet.id} onClick={() => handlePetClick(pet)}>
                        <p>{pet.user.email}</p>
                        <img src={pet.image_filename} alt={pet.breed} />  
                        <p>{pet.breed}</p>  
                        <p>{pet.type}</p>  
                        <p>{pet.age}</p>  
                    </div>  
                ))  
            )}  
        </div>  
    );  
}  

export default Home;