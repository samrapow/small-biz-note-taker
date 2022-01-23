const dbStore = require('../db/dbStore.js');

const router = require('express').Router();


// post notes route

router.post('/notes', (req, res) => {
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

router.delete('/notes/:id', (req, res) => {
    dbStore
        .deleteNote(req.params.id)
        .then(() => {
            res.json({ ok: true})
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// get notes route

router.get('/notes', (req, res) => {
    dbStore
        .grabNotes()
        .then(notes => {
            res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;



