import React from 'react'
import Person from './Person'

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

export default Persons