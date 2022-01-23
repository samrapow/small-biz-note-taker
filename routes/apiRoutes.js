const dbStore = require('../db/dbStore.js');

const app = require('express').Router();


// post notes route

app.post('/notes', (req, res) => {
    dbStore
        .generateNote(req.body)
        .then(note => {
            res.json(note)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


// delete notes route

app.delete('/notes/:id', (req, res) => {
    dbStore
        .removeNote(req.params.id)
        .then(() => {
            res.json({ ok: true})
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// get notes route

app.get('/notes', (req, res) => {
    dbStore
        .grabNotes()
        .then(notes => {
            res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = app;



