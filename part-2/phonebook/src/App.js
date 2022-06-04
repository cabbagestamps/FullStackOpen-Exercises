import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Persons from './components/Persons'
import SearchBar from './components/SearchBar'
import PersonForm from './components/PersonForm'
import Header from './components/Header'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [systemMessage, setSystemMessage] = useState("system message")
  const [systemMessageStyle, setSystemMessageStyle] = useState({
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  })

  
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log(true)
      personService
      .remove(id)
      .then(response => {
        console.log(response);
        setPersons(persons.filter((person) => {
          return person.id !== id
        }))
      })
      .then(message => {
        setSystemMessageStyle({...systemMessageStyle, color: 'green'})
        setSystemMessage(`Removed ${person.name}`)
        setTimeout(() => {
          setSystemMessage(null)
        }, 5000)
      })
      .catch(message => {
        console.log(message)
        setSystemMessageStyle({...systemMessageStyle, color: 'red'})
        setSystemMessage(`${person.name} has already been removed`)
        setTimeout(() => {
          setSystemMessage(null)
        }, 5000)
        setPersons(persons.filter((person) => {
          return person.id !== id
        }))
      })
    }
  }

  const updatePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const changedPerson = {...person, number: newNumber}
    console.log(changedPerson);
    
    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
      .then(message => {
        setSystemMessageStyle({...systemMessageStyle, color: 'green'})
        setSystemMessage(`Updated the phone number of ${changedPerson.name}`)
        setTimeout(() => {
          setSystemMessage(null)
        }, 5000)
      })
      .catch(message => {
        console.log(message)
        setSystemMessageStyle({...systemMessageStyle, color: 'red'})
        setSystemMessage(`Unable to update ${person.name}. ${person.name} has been deleted from the phonebook`)
        setTimeout(() => {
          setSystemMessage(null)
        }, 5000)
        setPersons(persons.filter((person) => {
          return person.id !== id
        }))
      })
  }


  const addPerson = (event) => {
    event.preventDefault()

    const names = persons.map((person) =>  { 
      return person.name
    })
    
    if (names.includes(newName)) {
      if (window.confirm(`${newName} is already in the phonebook. Replace old number with new?`)) {
        const updatingPerson = persons.find(person => person.name === newName)
        updatePerson(updatingPerson.id)
      }
      setNewName('')
      setNewNumber('')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: newName + '-id'
    }
    axios
    .post('http://localhost:3001/persons', personObject)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(personObject))
      setNewNumber('')
      setNewName('')
    })
    .then(message => {
      setSystemMessageStyle({...systemMessageStyle, color: 'green'})
      setSystemMessage(`Added ${personObject.name} to phonebook`)
      setTimeout(() => {
        setSystemMessage(null)
      }, 5000)
    })
  }
  

  const handleNameFieldChange = (event) => {
    setNewName(event.target.value)
  } 

  const handleNumberFieldChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleSearchFieldChange = (event) => {
    setSearch(event.target.value)
  }

  

  return (
    <div>
      <Notification message={systemMessage} style={systemMessageStyle}/>
      <Header text='PhoneBook' />
      <SearchBar handleSearchFieldChange={handleSearchFieldChange} />
      <Header text='Add a person' />
      <PersonForm newName={newName}
                  newNumber={newNumber}
                  handleNameFieldChange={handleNameFieldChange}
                  handleNumberFieldChange={handleNumberFieldChange}
                  addPerson={addPerson}
      />
      <Header text='Numbers' />
      <Persons  persons={persons} search={search} removePerson={removePerson}/>
      ...
    </div>
  )
}

export default App
