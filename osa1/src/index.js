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
            votes: [0, 0, 0, 0, 0, 0],
            selected: 0,
            maxvotes: 0,
            maxvotesid: -1
        }
    }

    another = () => {
        this.setState({
            selected: Math.floor(Math.random() * 6)
        })
    }

    vote = (i) => {
        let votes = this.state.votes
        votes[i]++
        this.setState({
            votes: votes
        })
        if (this.state.votes[i] > this.state.maxvotes) {
            this.setState({
                maxvotes: this.state.votes[i],
                maxvotesid: i
            })
        }
        console.log(this.state)
    }

    render() {
        const voteform = () => {
            return (
                <div>
                    <p>{this.state.selected}: {anecdotes[this.state.selected]}</p>
                    <p>Has {this.state.votes[this.state.selected]} votes</p>
                    <input type='button' value='Another anecdote' onClick={() => this.another()} />
                    <input type='button' value='Vote' onClick={() => this.vote(this.state.selected)} />
                </div>
            )}

        const statistics = () => {
            return (
                <div>
                    <p>{anecdotes[this.state.maxvotesid]}</p>
                    <p>Votes: {this.state.maxvotes}</p>
                </div>
            )}

        if (this.state.maxvotesid >= 0) {
        return (
            <div>
                <h1>Vote for and anecdote</h1>
                {voteform()}
                <h1>Anecdote with most votes:</h1>
                {statistics()}
            </div>
        )}
        else {
            return (
                <div>
                    <h1>Vote for and anecdote</h1>
                    {voteform()}
                </div>
            )
        }
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
