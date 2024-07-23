const Course = ({course}) => {
    const sum = course.parts.reduce((total, part) => total + part.exercises, 0)
    return (
        <div>
            <Header course={course}/>
            {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
            <p><b>total of {sum} exercises</b></p>
        </div>
    )
}

const Header = ({course}) => {
    return (
        <h1>{course.name}</h1>
    )
}

export default Course