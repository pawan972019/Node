const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongoTest')
    .then(() => console.log("Mongo Connection created"))
    .catch((err) => console.log(err))