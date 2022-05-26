import { useState } from 'react'

const Person = (props) => {
  return (
  <>
  <p>{props.name} {props.number}</p>
  </>
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  //const [search, setSearch] = useState('')
  const [foundPersons, setFoundPersons] = useState()
  const [searched, setSearched] = useState(false)
  
  
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
    console.log(searchData)
    
    //setSearch(searchData)
  
    const names = persons.map((person) =>  { 
      return person.name
    })
    const filteredNames = names.filter((string) => {
      return string.toLowerCase().includes(searchData.toLowerCase())
    })
    console.log(filteredNames);
    const searchedPersons = persons.filter((person) => {
      return filteredNames.includes(person.name)
    })
    console.log(searchedPersons)
    //setPersons(searchedPersons)

    setFoundPersons(searchedPersons)
    setSearched(true)
  }
// serach works pretty well, but new people dont show up when added, but do when search updates
  const peopleToShow = searched ? foundPersons : persons;
  console.log(foundPersons);
  console.log(persons);
  console.log(peopleToShow);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search: <input 
                onChange={handleSearchFieldChange}
                />
      </div>
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
      <h2>Numbers</h2>
      {peopleToShow.map(person => 
        <Person key ={person.id} name={person.name} number={person.number}/>
      )}
      ...
    </div>
  )
}

export default App
