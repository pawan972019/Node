var express = require('express')
var Student = require('../models/students')
require('../db/conn')
//creating router
var router = new express.Router()

//defining router
router.get('/node', (req, res) => {
    res.send('Hello whatsup guys')
})

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
        res.status(201).send(createduser)

    } catch (e) {
        res.status(400).send(e)
        console.log(e);
    }
})

//Fetch all students records 
router.get('/students', async (req, res) => {

    try {
        var studentdata = await Student.find()
        res.status(200).send(studentdata)
    } catch (e) {
        res.status(400).send(e)
        console.log(e);
    }
})

//Fetch individual student record
router.get('/students/:id', async (req, res) => {

    try {
        var _id = req.params.id

        var studentdata = await Student.findById({ _id })
        if (studentdata) {
            res.status(200).send(studentdata)
        } else {
            res.status(404).send()
        }
    } catch (e) {
        res.status(400).send(e)
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
            res.status(200).send(studentdata)
        } else {
            res.status(404).send()
        }
    } catch (e) {
        res.status(400).send(e)
        console.log(e);
    }

})

// delete student using patch
router.delete('/students/:id', async (req, res) => {

    try {
        var _id = req.params.id
        var studentdata = await Student.findByIdAndDelete(_id)
        console.log(studentdata);
        if (studentdata) {
            res.status(200).send(studentdata)
        } else {
            res.status(400).statusMessage("Data not found").send()
        }

    } catch (e) {
        res.status(500).send(e)
        console.log(e);
    }

})

module.exports = router
