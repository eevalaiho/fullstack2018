import React from 'react'

const Yhteensa = ({ kurssi }) => {
    const reducer = (acc, curr) => acc + curr
    const sum = kurssi.osat.map(osa => osa.tehtavia)
        .reduce(reducer)
    return(
        <p>Yhteensä {sum} tehtävää</p>
    )
}

export default Yhteensa
