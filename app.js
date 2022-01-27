const mongoose = require('mongoose')
const express = require('express')
const validator = require('validator')
const path = require('path')
const app = express()


mongoose.connect('mongodb://localhost/mongoTest', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongo Connection created"))
    .catch((err) => console.log(err))

// * Defining schema - all the fields of the records
var playListSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    ctype: String,
    videos: Number,
    author: String,
    active: Boolean,
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// * defining model - used for all the operation like inset, update, delete
var Playlist = new mongoose.model('Playlist', playListSchema)

var createMultiplePlaylist = async () => {

    try {

        console.log('inserting multiple rescords')

        // * Creating multiple documents 
        var reactPlaylist = new Playlist({
            name: 'React Video 8',
            ctype: 'Backend',
            videos: 72,
            author: 'Pawan jha',
            active: true
        })

        var reactPlaylist1 = new Playlist({
            name: 'React Video 9',
            ctype: 'Backend',
            videos: 72,
            author: 'Pawan jha',
            active: true
        })

        var reactPlaylist2 = new Playlist({
            name: 'React Video 10',
            ctype: 'Backend',
            videos: 72,
            author: 'Pawan jha',
            active: true
        })

        var reactPlaylist3 = new Playlist({
            name: 'React Video 11',
            ctype: 'Backend',
            videos: 72,
            author: 'Pawan jha',
            active: true
        })

        // * insert data into collection
        var result = await Playlist.insertMany([reactPlaylist, reactPlaylist1, reactPlaylist2, reactPlaylist3])
        console.log(result)

    } catch (err) {
        console.log(err)
    }
}

//createMultiplePlaylist()

var createPlaylist = async () => {

    try {

        console.log('inserting single rescords')

        // * Creating multiple documents 
        var reactPlaylist = new Playlist({
            name: 'Android Video',
            ctype: 'Front end',
            videos: 74,
            author: 'Pawan jha',
            email: 'pawan.jha@g.com',
            active: true
        })

        // * insert data into collection
        var result = await reactPlaylist.save()
        console.log(result)

    } catch (err) {
        console.log(err)
    }
}


createPlaylist()

var getDocumentslist = async () => {

    try {
        console.log('Fetching all records')
        var result = await Playlist.find({ ctype: 'Backend' })
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

//getDocumentslist()

var getDocument = async () => {

    try {
        console.log('Fetching only one record')
        var result = await Playlist.find({ ctype: 'Backend' })
            .select({ name: 1 }) // 1 - only want to show name only
            .limit(1) // limit will help in fetch number specific records
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

//getDocument()

var greaterThenOperator = async () => {

    try {
        console.log('Fetching record using $gt comparision operator')
        var result = await Playlist.find({ videos: { $gt: 71 } })
            .select({ name: 1 }) // 1 - only want to show name only
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

//greaterThenOperator()

var greaterThenorEqualToOperator = async () => {

    try {
        console.log('Fetching record using $gte comparision operator')
        var result = await Playlist.find({ videos: { $gte: 71 } })
            .select({ name: 1 }) // 1 - only want to show name only
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

//greaterThenorEqualToOperator()

var andOperator = async () => {

    try {
        console.log('Fetching record using $and logical operator')
        var result = await Playlist.find({ $and: [{ ctype: 'Backend' }, { author: 'Pawan jha' }] })
            .select({ name: 1 }) // 1 - only want to show name only
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

//andOperator()


var countDocuments = async () => {

    try {
        console.log('getting the counts of all documents in model')
        var result = await Playlist.find({ ctype: 'Backend' })
            .select({ name: 1 }) // 1 - only want to show name only
            .countDocuments()
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

//countDocuments()

var sortDocuments = async () => {

    try {
        console.log('Sort the documents of models')
        var result = await Playlist.find()
            .select({ name: 1 })
            .sort({ name: 1 }) // 1 means asscending order
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

//sortDocuments()


var updateDocuments = async (_id) => {

    try {
        console.log('Update mongoDb using updateOne')
        var result = await Playlist.updateOne({ _id }, {
            $set:
            {
                videos: 73
            }
        })
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

//updateDocuments('61efde5a48dc8aafe5b828b5')


var updateDocumentsUsingFindById = async (_id) => {

    try {
        console.log('Update mongoDb using findByIdAndUpdate')
        var result = await Playlist.findByIdAndUpdate({ _id }, {
            $set:
            {
                videos: 73
            }
        }, {
            new: true
        })
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

//updateDocumentsUsingFindById('61efde5a48dc8aafe5b828b5')

var deleteDocument = async (_id) => {

    try {
        console.log('Deleting the document')

        var result = await Playlist.findByIdAndDelete({ _id })
        console.log(result)

    } catch (err) {
        console.log(err)
    }
}

//deleteDocument('61eff1b96ced6a697b0413eb')