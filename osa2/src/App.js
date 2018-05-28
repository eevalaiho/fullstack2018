import React from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'

import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }
    componentDidMount() {
        personService
            .getAll()
            .then(response => {
                this.setState({ persons: response.data })
            })
    }
    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }
    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }
    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }
    deletePerson = (id) => {
        let person = this.state.persons.filter((person) => person.id === id)[0]
        if (person && window.confirm("Poistetaanko " + person.name + "?")) {
            personService
                .remove(id)
                .then(
                    this.setState({
                        persons: this.state.persons.filter((person) => person.id !== id)
                    })
                )
        }
    }
    addPerson = (event) => {
        event.preventDefault()
        let personObject = this.state.persons
            .filter((person) => person.name === this.state.newName)[0]
        if (personObject)
        {
            if (window.confirm(personObject.name + " on jo luettelossa, korvataako vanha numero uudella?")) {
                personObject.number = this.state.newNumber
                personService
                    .update(personObject.id, personObject)
                    .then(response => {
                        this.setState({
                            persons: this.state.persons
                                .filter((person) => person.name !== personObject.name)
                                .concat(response.data)
                                .sort((p1, p2) => p1.name > p2.name),
                            filter: '',
                            newName: '',
                            newNumber: ''
                        })
                    })
            }
        }
        else {
            personObject = {
                name: this.state.newName,
                number: this.state.newNumber
            }
            personService
                .create(personObject)
                .then(response => {
                    this.setState({
                        persons: this.state.persons.concat(response.data),
                        filter: '',
                        newName: '',
                        newNumber: ''
                    })
                })
        }

    }
    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Filter filter={this.state.filter} onFilterChange={this.handleFilterChange}/>
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addPerson}>
                    <div>
                        Nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
                    </div>
                    <div>
                        Numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <Persons persons={this.state.persons} filter={this.state.filter} deletePerson={this.deletePerson} />
            </div>
        )
    }
}

export default App
