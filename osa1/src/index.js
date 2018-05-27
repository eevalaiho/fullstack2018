import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    klik = (props) => {
        this.setState({
            [props.key]: this.state[props.key] + 1
        })
    }

    render() {
        const keys = Object.keys(this.state)
        const buttons = (keys) => {
            return (
                keys.map((key) => <input key={key} type='button' value={key} onClick={() => this.klik({key})}/>)
            )
        }
        const statistics = (keys) => {
            return (
                keys.map((k, i) => {
                    return (<p key={i}>{k}: {this.state[k]}</p>)})
            )
        }
        const summary = (keys) => {
            let lkm = 0
            let summa = 0
            let lkmPos = 0
            keys.forEach((k) => {
                console.log(k+'')
                lkm += this.state[k]
                switch(k+'') {
                    case 'hyva':
                        summa += this.state[k]
                        lkmPos += this.state[k]
                        break;
                    case 'huono':
                        summa -= this.state[k]
                        break;
                    default: break;
                }
                console.log(lkmPos)
            })
            return (
                <p>Keskiarvo: {lkm > 0 ? (summa/lkm).toFixed(1) : '0.0'}, Positiivisia: {lkm > 0 ? (100*lkmPos/lkm).toFixed(1) + '%': '0.0%'}</p>
            )
        }
        return (
            <div>
                <h1>Anna palautetta</h1>
                <div>{buttons(keys)}</div>
                <h1>Statistiikka</h1>
                <div>{statistics(keys)} {summary(keys)}</div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
