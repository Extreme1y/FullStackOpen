const PersonForm = ({add, handleName, handleNumber, newName, newNumber}) => {
    return (
        <form onSubmit={add}>
            <div>
                name: <input value={newName} onChange={handleName}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm