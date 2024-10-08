const mongoose = require('mongoose')

if (process.argv.length < 5 && process.argv.length !== 3) {

    console.log('Usage: node mongo.js <password> <name> <number>');
    process.exit(1)

} else if (process.argv.length === 3) {
    const password = process.argv[2]

    const url =
        `mongodb+srv://acous7ic:${password}%21@fscluster.9k4w1b0.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FSCluster`

    mongoose.set('strictQuery', false)

    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    Person.find({}).then(result => {
        console.log("phonebook: ")
        result.forEach(person => {
            console.log(
                `${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })

} else {


    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]


    const url =
        `mongodb+srv://acous7ic:${password}%21@fscluster.9k4w1b0.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FSCluster`

    mongoose.set('strictQuery', false)

    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })


    const Person = mongoose.model('Person', personSchema)


    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    }).catch(err => {
        console.error(err);
        mongoose.connection.close();
    });

}