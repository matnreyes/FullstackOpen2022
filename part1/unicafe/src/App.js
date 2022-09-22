import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good * 100) / total

  return (
    <>
      <h2>statistics</h2>
      {total === 0
        ? <>No feedback given </>
        : <table>
          <tbody>
            <StatisticLine text={'good'} value={good}/>
            <StatisticLine text={'neutral'} value={neutral} />
            <StatisticLine text={'bad'} value={bad} />
            <StatisticLine text={'total'} value={total} />
            <StatisticLine text={'average'} value={average} />
            <StatisticLine text={'positive'} value={positive + '%'} />
          </tbody>
          </table>
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