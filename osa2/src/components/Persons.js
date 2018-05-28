import React from 'react'

const Persons = ({persons, filter, deletePerson}) => {
    return(
        <div>
            {persons
                .filter((person) => person.name.toLowerCase().startsWith(filter.toLowerCase()))
                .map((person) => {
                    return (
                        <p key={person.name}>
                            {person.name}, {person.number} <button id={person.id} onClick={() => deletePerson(person.id)}>Poista</button>
                        </p>
                    )
                })}
        </div>
    )
}

export default Persons