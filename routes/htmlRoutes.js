const app = require('express').Router();

const path = require('path');

// send notes endpoint to the correct file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

// send user to homepage if there's a pathign issue
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = app;