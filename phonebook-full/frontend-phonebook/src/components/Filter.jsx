const Filter = ({searchQ, onChange}) => {
    return (
        <div>
            search: <input value={searchQ} onChange={onChange}/>
        </div>
    )
}

export default Filter