import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'


const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
        {
            id: 1,
            nimi: 'Reactin perusteet',
            tehtavia: 10
        },
        {
            id: 2,
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
        },
        {
            id: 3,
            nimi: 'Komponenttien tila',
            tehtavia: 14
        },
        {
            id: 4,
            nimi: 'Riippuvuuksien hallinta',
            tehtavia: 12
        }
    ]
}

ReactDOM.render(
    <App kurssi={kurssi} />,
    document.getElementById('root')
)
