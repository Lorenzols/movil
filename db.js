const mongoose = require('mongoose')

// const mongoDB = 'mongodb://127.0.0.1/moviles1'
let mongoDB = ""

if(process.env.NODE_ENV === 'production'){
    mongoDB = process.env.MONGODB_PRO
    console.log('Producción')
    console.log("eee",mongoDB)
}else{
    mongoDB = process.env.MONGODB_DEV
    console.log('Desarollo')
    console.log("eee",mongoDB)
}

mongoose.connect(mongoDB, {useNewUrlparser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', console.error.bind("Error conexión Mongo"))
db.once('open', () => {
    console.log("Conectado a Mongo")
})