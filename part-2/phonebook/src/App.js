import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'



const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({ text }) => <h1>{text}</h1>;

const Person = ({person, removePerson}) => {
  
  return (
    <>
    <p>{person.name} {person.number} </p>
    <Button handleClick={() => removePerson(person.id)} text="Delete Contact" />
    </>
  )

} 


const Persons = ({ search, persons, removePerson }) => {
  
  const names = persons.map((person) =>  { 
    return person.name
  })
  const filteredNames = names.filter((name) => {
    return name.toLowerCase().includes(search.toLowerCase())
  })
 
  const searchedPersons = persons.filter((person) => {
    return filteredNames.includes(person.name)
  })
  
  return (
    <>
    {searchedPersons.map(person => 
      <Person key ={person.id} person={person} removePerson={removePerson}/>
    )}
    </>
  )
}

const SearchBar = ({ handleSearchFieldChange }) => {
  return (
    <div>
        search: <input onChange={handleSearchFieldChange} />
    </div>
  )
}

const PersonForm = ({newName, newNumber, addPerson, handleNameFieldChange, handleNumberFieldChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input 
                value={newName}
                onChange={handleNameFieldChange}
                />
        </div>
        <div>
          number: <input 
                  value={newNumber}
                  onChange={handleNumberFieldChange}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  

  const removePerson = (id) => {
    if (window.confirm(`Delete ${id}?`)) {
      console.log(true)
      personService
      .remove(id)
      .then(response => {
        console.log(response);
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
      id: persons.length
    }
    axios
    .post('http://localhost:3001/persons', personObject)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(personObject))
      setNewNumber('')
      setNewName('')
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
