import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const empty = total === 0 ? true : false
  const average = empty ? 0 : (good - bad) / total
  const positive = empty ? 0 : (good * 100) / total

  return (
    <>
      <h2>statistics</h2>
      {empty
        ? <>No feedback given </>
        : <>
            <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>
            <div>all {total}</div>
            <div>average {average}</div>
            <div>positive {positive}%</div>
          </>
      }
    </>
  )
}

const App = () => {
  // save clicks of each button to its own
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={'good'}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'}/>
      <Button handleClick={() => setBad(bad + 1)} text={'bad'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App