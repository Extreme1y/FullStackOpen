/*
const Button = ({handleCLick, text}) => (
    <button onClick={handleCLick}>
        {text}
    </button>
)

const StatisticLine = ({text, value}) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>

)
const Statistics = (props) => {
    if (props.total !== 0) {
        return (
            <table>
                <tbody>
                <StatisticLine text={'good'} value={props.good}/>
                <StatisticLine text={'neutral'} value={props.neutral}/>
                <StatisticLine text={'bad'} value={props.bad}/>
                <StatisticLine text={'all'} value={props.total}/>
                <StatisticLine text={'average'} value={(props.good - props.bad) / props.total}/>
                <StatisticLine text={'positive'} value={(props.good / props.total) * 100 + ' %'}/>
                </tbody>
            </table>
        )
    } else {
        return (
            <p>No feedback given</p>
        )
    }
}
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const [avg, setAvg] = useState(0)


    return (
        <div>
            <h1>give feedback</h1>

            <Button handleCLick={() => {
                setGood(good + 1)
                setTotal(total + 1)
            }
            } text={'good'}/>


            <Button handleCLick={() => {
                setNeutral(neutral + 1)
                setTotal(total + 1)
            }
            } text={'neutral'}/>


            <Button handleCLick={() => {
                setBad(bad + 1)
                setTotal(total + 1)
            }
            } text={'bad'}/>

            <h1>statistics</h1>
            <Statistics good={good} bad={bad} neutral={neutral} total={total}/>
        </div>
    )
}
*/
/*
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

const handleVote = ({selected, votes, setVotes}) => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy)
}



const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Uint32Array(anecdotes.length))
    const [maxVote, setMax] = useState(0)

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>

            <button onClick={() => handleVote({selected, votes, setVotes, maxVote, setMax})}>
                vote
            </button>

            <button onClick={() => setSelected(getRandomInt(0, anecdotes.length))}>
                next anecdote
            </button>

            <h1>Anecdote with most votes</h1>

        </div>
    )
}
*/




import {useState} from 'react'
import Course from './components/Course.jsx'


const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            {courses.map(course => <Course key={course.id} course={course}/>)}
        </div>
    )
}

export default App