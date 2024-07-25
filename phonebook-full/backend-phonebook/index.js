const express = require('express')
const {request} = require("express");
const app = express()
const morgan = require('morgan');


morgan.token('personDetails', function (req, res) {

    if (req.method === 'POST' && req.originalUrl === '/api/persons') {
        const name = req.body.name || '-';
        const number = req.body.number || '-';
        return `Name: ${name}, Number: ${number}`;
    }
    return '';
});



let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]


const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

const generateId = () => {
    if (persons.length === 0) {
        return "1"; // Start IDs from "1" if the list is empty
    }
    const maxId = persons.reduce((max, person) => Math.max(max, Number(person.id)), 0);
    return String(maxId + 1);
}


app.get('/', (request, response) => {
    response.send('<h1>started</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send('<p>Phonebook has info for ' + persons.length + ' people </p>' + new Date().toTimeString())
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person)
        response.json(person)
    else
        response.status(404).end()
})


app.use(morgan(':personDetails'));
app.post('/api/persons', (request, response) => {
    const body = request.body


    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'person already exists!'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})


app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


const PORT = process.env.port || 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
