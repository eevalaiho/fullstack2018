import React from 'react'

import countryService from './services/countries'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: ''
        }
    }
    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }
    componentDidMount() {
        countryService
            .getAll()
            .then(response => {
                this.setState({ countries: response.data })
            })
    }
    render() {
        const countryList = () => {
            let arr = this.state.countries
                .filter((country) => country.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))
            if (arr.length === 0) {
                return(
                    <p>No matches</p>
                )
            }
            else if (arr.length === 1) {
                const country = arr[0]
                console.log(country)
                return(
                    <div>
                        <h1>{country.name}</h1>
                        <p>Capital: {country.capital}</p>
                        <p>Population: {country.population}</p>
                        <p><img src={country.flag} width={200}/></p>
                    </div>
                )
            }
            else if (arr.length < 10) {
                return(
                    <ul>
                        {arr.map((country) => <li>{country.name}</li>)}
                    </ul>
                )
            }
            return(
                <p>Over 10 matches</p>
            )
        }
        return (
            <div>
                <h1>World countries</h1>
                <p>Find countries: <input value={this.state.filter}  onChange={this.handleFilterChange}/></p>
                {countryList()}
            </div>
        )
    }
}

export default App
