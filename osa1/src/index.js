import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyvä: 0,
            neutraali: 0,
            huono: 0,
            summa: 0,
            lkm: 0,
        }
    }

    klik = (props) => {
        this.setState({
            [props.key]: this.state[props.key]+1,
            lkm: this.state.lkm+1,
            summa: this.state.summa + (props.key === 'hyvä' ? 1 : (props.key === 'huono' ? -1 : 0))
        })
        console.log(this.state)
    }

    render() {

        const button = (key) => <input key={key} type='button' value={key} onClick={() => this.klik({key})}/>

        const buttons = () => ['hyvä','neutraali','huono'].map((key) => button(key))

        const statistic = (name, value) => {
            return(
                <p key={name}>{name}: {value}</p>
            )
        }

        const statistics = () => {
            if (this.state.lkm <= 0)
                return ('Ei yhtään palautetta annettu')
            let stats = {
                'hyvä': this.state.hyvä,
                'neutraali': this.state.neutraali,
                'huono': this.state.huono,
            }
            if (this.state.lkm > 0) {
                stats['keskiarvo'] = (this.state.lkm > 0 ? (this.state.summa / this.state.lkm).toFixed(1) : '0.0')
                stats['positiivisia'] = (this.state.lkm > 0 ? (100 * this.state.hyvä / this.state.lkm).toFixed(1) + '%' : '0.0%')
            }
            return (
                Object.entries(stats)
                    .map( ([key, value]) => statistic(key, value))
            )
        }
        return (
            <div>
                <h1>Anna palautetta</h1>
                <div>{buttons()}</div>
                <h1>Statistiikka</h1>
                <div>{statistics()}</div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
