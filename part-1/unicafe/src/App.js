import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const Header = ({ text }) => <h1>{text}</h1>;


const Statistics = ({ statistics }) => {
  console.log(statistics)
  const average = statistics.score / statistics.total
  const positivePercent = (statistics.good / statistics.total)*100
  if (!statistics.total) return 'No Feedback given'
  return (
    <div>
      <StatisticsLine text="good" value={statistics.good} />
      <StatisticsLine text="neutral" value = {statistics.neutral} />
      <StatisticsLine text="bad" value = {statistics.bad} />
      <StatisticsLine text="total" value = {statistics.total} />
      <StatisticsLine text="average" value = {average} />
      <StatisticsLine text="positive" value = {positivePercent} />
    </div>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <>
    <p>{text} {value}</p>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    score: score,
  }

  const increaseGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setScore(score + 1)
  }
   
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
    
  }
  const increaseBad = () =>{
    setBad(bad + 1)
    setTotal(total + 1)
    setScore(score - 1)
  } 

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />
      <Header text='statistics' />
      <Statistics statistics={statistics}/>
    </div>
  )
}

export default App
