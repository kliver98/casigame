const mongoose = require('mongoose')

let url = 'mongodb+srv://kliver:mypassword@cluster0.37zjh.mongodb.net/casigame?retryWrites=true&w=majority';

mongoose.set("useNewUrlParser", true)
mongoose.set("useUnifiedTopology", true)

mongoose.connect(url)

let db = mongoose.connection

db.on("error", console.error.bind(console, "Mongo connection error"))

module.exports = db