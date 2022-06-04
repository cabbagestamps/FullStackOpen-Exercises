import React from 'react'
import Button from './Button'

const Person = ({person, removePerson}) => {
  return (
    <>
    <p>{person.name} {person.number} </p>
    <Button handleClick={() => removePerson(person.id)} text="Delete Contact" />
    </>
  )
} 

export default Person