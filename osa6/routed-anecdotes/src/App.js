import React from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom'
import './index.css';

const Menu = () => {
  return (
    <nav className='top'>
      <NavLink exact to="/"><span className="glyphicon glyphicon-home"></span></NavLink>
      <NavLink to="/anecdotes">anecdotes</NavLink>
      <NavLink exact to="/create">create new</NavLink>
      <NavLink exact to="/about">about</NavLink>
    </nav>
  )
}

const Notification = ({notification}) => {
  const style = {
    color: '#73AD21',
    'border-radius': '15px',
    border: '2px solid #73AD21',
    padding: '20px',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    notification
      ? <div style={style}>{notification}</div>
      : null
  )}

const AnecdoteList = ({ anecdotes }) => (
  <div className="container">
    <div className="row">
      <h2>Anecdotes</h2>
    </div>
    <div className="row">
      <div className="col-sm-9">
        <ListGroup>
          {anecdotes.map(anecdote =>
            <ListGroupItem key={anecdote.id} href={`/anecdotes/${anecdote.id}`}>{anecdote.content}</ListGroupItem>)}
        </ListGroup>
      </div>
    </div>
  </div>
)

const About = () => (
  <div className="container">
    <div className="row">
      <h2>About anecdote app</h2>
    </div>
    <div className="row">
      <div className="col-sm-9">
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </div>
      <div className="col-sm-3">
        <img alt="Edsger Dijkstra" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/250px-Edsger_Wybe_Dijkstra.jpg" />
      </div>
    </div>
  </div>
)

const Anecdote = ({anecdote}) => {
  return(
    <div className="container">
      <div className="row">
        <h2>{anecdote.content}</h2>
      </div>
      <div className="row">
        <div className="col-sm-9">
          <div>by {anecdote.author}</div>
          <div>has {anecdote.votes} votes</div>
          <div>for more info see <a href={anecdote.info}>{anecdote.info}</a><br /><br /></div>
        </div>
      </div>
    </div>
  )}

const Footer = () => (
  <nav className="navbar navbar-default navbar-fixed-bottom" style={{padding: '10px'}}>
    <div className="container" style={{width: '100%', 'textAlign': 'center'}}>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
      See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
    </div>
  </nav>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    //console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <h2>Create a new anecdote</h2>
        </div>
        <div className="row">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Content</label>
                <input className="form-control" name='content' value={this.state.content} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input className="form-control" name='author' value={this.state.author} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label>Url for more info</label>
                <input className="form-control" name='info' value={this.state.info} onChange={this.handleChange} />
              </div>
              <button className="btn btn-default">create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const Home = () => (
  <div className="container">
    <div className="row">
      <h2>The software anecdotes app</h2>
    </div>
    <div className="row">
      <div className="col">
        <p>This is the software anecdote app</p>
      </div>
    </div>
  </div>
)


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: '',
      created: false
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote '${anecdote.content}' created!`,
      created: true
    })
    setTimeout(() => {
      console.log(this.state)
      this.setState({
        notification: null,
        created: false
      })
      console.log(this.state)
    }, 5000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification notification={this.state.notification} />
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/about" render={() => <About />}/>
            <Route path="/create" render={() =>
              this.state.created
                ? <Redirect to="/" />
                : <CreateNew addNew={this.addNew}/>
            }/>
            <Route exact path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
