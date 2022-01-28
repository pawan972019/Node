const mongoose = require('mongoose')

var db = "mongodb+srv://mongo-pawan:sRjWq5ce5rsdzrn@mongodb-tutorial.uch7h.mongodb.net/expense?retryWrites=true&w=majority"

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Mongo Connection created"))
    .catch((err) => console.log(err))

