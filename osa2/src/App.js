import React from 'react'
import Otsikko from './components/Otsikko'
import Sisalto from './components/Sisalto'
import Yhteensa from './components/Yhteensa'

const App = ({ kurssi }) => {

    return (
        <div>
            <Otsikko kurssi={kurssi}/>
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi} />
        </div>
    )
}

export default App
