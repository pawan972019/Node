var express = require('express')
var Student = require('../models/students')
require('../db/conn')
//creating router
var router = new express.Router()

//defining router
router.get('/node', (req, res) => {
    res.send('Hello whatsup guys')
})

const errorResponse = () => {

    let errorRes = {
        "code": 400,
        "status": "fail",
        "message": "Data not found"
    }

    return errorRes
}

router.post('/students', async (req, res) => {

    try {

        console.log(req.body)

        // passing request body to the schema so we have a document to save
        const student = new Student(req.body)

        /* This is one way while we dont want to user async and await
        //saving student data using promises
        student.save().then(() => {
            res.status(201).send(student)
        }).catch((e) => {
            res.status(400).send(e)
        })
        */

        //this code will be there if we want use async and await
        var createduser = await student.save()

        let response = {
            "code": 200,
            "status": "success",
            "message": "Student saved successfully",
        }

        console.log("output: " + response)
        res.status(201).send(response)

    } catch (e) {

        res.status(400).send(errorResponse())
        console.log(e);
    }
})

//Fetch all students records 
router.get('/students', async (req, res) => {

    try {
        var studentdata = await Student.find()

        if (studentdata) {
            let response = {
                "code": 200,
                "status": "success",
                "message": "Data send successfully",
                "data": {
                    studentList: studentdata
                }
            }
            console.log(response)
            res.status(200).send(response)
        } else {
            res.status(404).send(errorResponse())
        }

    } catch (e) {

        res.status(400).send(errorResponse())
        console.log(e);
    }
})

//Fetch individual student record
router.get('/students/:id', async (req, res) => {

    try {
        var _id = req.params.id

        var studentdata = await Student.findById({ _id })
        if (studentdata) {

            let response = {
                "code": 200,
                "status": "success",
                "message": "Data send successfully",
                "data": {
                    student: studentdata
                }
            }
            res.status(200).send(response)
        } else {
            res.status(404).send(errorResponse())
        }
    } catch (e) {

        res.status(400).send(errorResponse())
        console.log(e);
    }
})

// update student using patch
router.patch('/students/:id', async (req, res) => {

    try {
        var _id = req.params.id

        var studentdata = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        if (studentdata) {
            let response = {
                "code": 200,
                "status": "success",
                "message": "Data update successfully",
                "data": {
                    student: studentdata
                }
            }
            console.log(studentdata)
            res.status(200).send(response)
        } else {
            console.log(`Error while update in elss: ${studentdata}`)
            res.status(404).send(errorResponse())
        }
    } catch (e) {
        console.log(`Error while update in catch block: ${e}`)
        res.status(400).send(errorResponse())
    }

})

// delete student using patch
router.delete('/students/:id', async (req, res) => {

    try {
        var _id = req.params.id
        var studentdata = await Student.findByIdAndDelete(_id)
        console.log(studentdata);
        if (studentdata) {
            let response = {
                "code": 200,
                "status": "success",
                "message": "Data deleted successfully",
                "data": {
                    student: studentdata
                }
            }
            console.log(studentdata)
            res.status(200).send(response)
        } else {
            res.status(400).send(errorResponse())
        }

    } catch (e) {
        res.status(500).send(errorResponse())
        console.log(e);
    }

})

module.exports = router
