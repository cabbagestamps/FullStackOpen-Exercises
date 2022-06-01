import { useState, useEffect } from 'react'
import axios from 'axios'

const Header = ({ text }) => <h1>{text}</h1>;

const Person = (props) => <p>{props.name} {props.number}</p>


const Persons = ({ peopleToShow }) => {
  return (
    <>
    {peopleToShow.map(person => 
      <Person key ={person.id} name={person.name} number={person.number}/>
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
  //const [search, setSearch] = useState('')
  const [foundPersons, setFoundPersons] = useState()
  const [searched, setSearched] = useState(false)
  
  useEffect(() => {
    console.log('effect')
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    const names = persons.map((person) =>  { 
      return person.name
    })
    
    if (names.includes(newName)) {
      alert(`${newName} is already in use`)
      setNewName('')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: newName
    }
    setPersons(persons.concat(personObject))
    setNewNumber('')
    setNewName('')
    setSearched(false)
  }

  const handleNameFieldChange = (event) => {
    setNewName(event.target.value)
  } 

  const handleNumberFieldChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleSearchFieldChange = (event) => {
    const searchData = event.target.value
    //console.log(searchData)
    
    //setSearch(searchData)
  
    const names = persons.map((person) =>  { 
      return person.name
    })
    const filteredNames = names.filter((string) => {
      return string.toLowerCase().includes(searchData.toLowerCase())
    })
   // console.log(filteredNames);
    const searchedPersons = persons.filter((person) => {
      return filteredNames.includes(person.name)
    })
    //console.log(searchedPersons)
    //setPersons(searchedPersons)

    setFoundPersons(searchedPersons)
    setSearched(true)
  }

  const peopleToShow = searched ? foundPersons : persons;
  //console.log(foundPersons);
  //console.log(persons);
  //console.log(peopleToShow);

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
      <Persons peopleToShow={peopleToShow} />
      ...
    </div>
  )
}

export default App
