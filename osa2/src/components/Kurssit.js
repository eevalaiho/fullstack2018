import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
import Yhteensa from './Yhteensa'

const Kurssit = ({ kurssit }) => {

    return (
        kurssit.map((kurssi) => { return (
            <div key={kurssi.id}>
                <Otsikko kurssi={kurssi}/>
                <Sisalto kurssi={kurssi} />
                <Yhteensa kurssi={kurssi} />
            </div>
        )})
    )
}

export default Kurssit