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
    }

    render() {

        const button = (key) => <input key={key} type='button' value={key} onClick={() => this.klik({key})}/>

        const buttons = () => ['hyvä','neutraali','huono'].map((key) => button(key))

        const statistic = (name, value) => {
            return(
                <tr key={name}><td>{name}</td><td>{value}</td></tr>
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
                <table>
                    <tbody>
                        {Object.entries(stats)
                            .map( ([key, value]) => statistic(key, value))}
                    </tbody>
                </table>
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

class App2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0
        }
    }

    klik = () => {
        let i = Math.floor(Math.random() * 6)
        console.log(i)
        this.setState({
            selected: i
        })
    }


    render() {
        return (
            <div>
                {anecdotes[this.state.selected]}<br />
                <input type='button' value='Uusi anekdootti' onClick={() => this.klik()} />
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App2 />,
    document.getElementById('root')
)
