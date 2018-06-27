import React from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'

import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            message: null,
            error: null
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
            .filter((person) => person.name.toLowerCase() === this.state.newName.toLowerCase())[0]
        if (personObject) {
            if (window.confirm(this.state.newName + " on jo luettelossa, korvataako vanha numero uudella?"))  {
                personObject.name = this.state.newName
                personObject.number = this.state.newNumber
                personService
                    .update(personObject.id, personObject)
                    .then(response => {
                        //console.log("App.js ln 59:", response.data)
                        this.setState({
                            persons: this.state.persons
                                .filter((person) => person.name !== personObject.name)
                                .concat(response.data)
                                .sort((p1, p2) => p1.name > p2.name),
                            filter: '',
                            newName: '',
                            newNumber: '',
                            message: 'Päivitettiin ' + personObject.name
                        })
                    })
                    .catch(error => {
                        //console.log("App.js ln 73", error)
                        this.setState({
                            error: `Henkilö '${personObject.name}' on jo valitettavasti poistettu palvelimelta`,
                        })
                        setTimeout(() => {
                            this.setState({error: null})
                        }, 5000)
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
                        newNumber: '',
                        message: 'Lisättiin ' + personObject.name
                    })
                })
        }
        setTimeout(() => {
            this.setState({message: null})
        }, 5000)
    }
    render() {
        return (
            <div>
                <h1>Puhelinluettelo</h1>
                <Notification message={this.state.error}/>
                <Notification message={this.state.message} />
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
