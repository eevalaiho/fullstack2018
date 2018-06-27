import React from 'react'

const Persons = ({persons, filter, deletePerson}) => {
    //console.log("Persons.js ln 4", "filter:", filter, "persons:", persons)
    return(
        <div>
            {persons
                .filter((person) => !filter || (person.name && person.name.toLowerCase().match(filter.toLowerCase())))
                .map((person) => {
                    return (
                        <p key={person.id}>
                            {person.name}, {person.number} <button id={person.id} onClick={() => deletePerson(person.id)}>Poista</button>
                        </p>
                    )
                })}
        </div>
    )
}

export default Persons