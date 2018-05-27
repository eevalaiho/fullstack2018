import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }

    return (
        <div>
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

const Yhteensa = (props) => {
    let summa = 0
    props.osat.forEach((osa) => {
        summa += osa.tehtavia
    })
    return (
        <p>Yhteensä {summa} tehtävää</p>
    )
}

const Sisalto = (props) => {
    return (
        props.osat.map((osa) => <Osa osa={osa} />)
    )
};

const Osa = (props) => {
    return (
        <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    )
}

const Otsikko = (props) => {
    return (
        <h1>{props.nimi}</h1>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
