import React, { useEffect, useState } from "react";
// fetch & display pets(make each pet viewable and users can navigate back to this component)
// have search bar at the top w filter for: pet types, shelters

function Home() {
    const [pets, setPets] = useState(null);

    useEffect(() => {
        fetch("/pets")
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((pets) => {
            setPets(pets);
        })
    }, [])
    
    return (
        <div className="home">
            <input />    {/* Search bar */}
            {/* iterate over each pet and create a div for each, when clicked direct to Pets comp */}
            {pets.forEach(pet => {
                return (
                    <div>
                        <img src={pet.image_filename}/>
                        <p>{pet.type}</p>
                        <p>{pet.breed}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default Home;