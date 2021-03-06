import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = (props) => <h1>{props.text}</h1>;
    

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const newAnecdote = () => {
    const randNum = Math.floor(Math.random()*anecdotes.length)
    setSelected(randNum)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const highestVote = votes.reduce((a, b) => Math.max(a, b), 0)
  const highestVoteIndex = votes.indexOf(highestVote) 
  
  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVote} text="Vote" />
      <Button handleClick={newAnecdote} text="New anecdote" />
      <Header text="Anecdote with the most votes" />
      <p>{anecdotes[highestVoteIndex]}</p>
      <p>has {votes[highestVoteIndex]} votes</p>
    </div>
  )
}

export default App