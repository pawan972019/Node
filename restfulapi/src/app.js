const express = require('express')
const router = require('./routers/student')

const app = express()
const port = process.env.PORT || 3000

// * express.json() is a inbuilt method to recoznize incoming request into json object
// this is required to convert req json data into readale
app.use(express.json())

//registering router
app.use(router)

app.listen(port, () => {
    console.log(`connection setup at port ${port}`);
})
