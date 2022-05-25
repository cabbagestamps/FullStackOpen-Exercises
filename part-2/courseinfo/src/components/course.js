import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part =>
     <Part key={part.id} part={part} />
     )}  
  </>


const Course = ({ course }) => {
  console.log(course)
  const parts = course.parts
  const sum = parts.reduce((acc, curr) => {
    acc += curr.exercises
    return acc
  }, 0)
  console.log(sum);
  return (
    <>
      <Header course={course.name}/>
      <Content parts = {parts} />
      <Total sum={sum}/>
    </>
  )
}

export default Course