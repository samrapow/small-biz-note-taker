const fs = require("fs");

const uuid = require("uuid").v1;

const util = require("util");


const writeFile = util.promisify(fs.writeFile);

const readFile = util.promisify(fs.readFile);


class DBInteract {

 
    write(note) {
        return writeFile("db/db.json", JSON.stringify(note))
    }


    read() {
        return readFile("db/db.json", "utf8")
    }


    // grab existing notes
    grabNotes() {
        return this.read()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }


    // create a new note
    generateNote(note) {
        const { title, text } = note

        if (!title || !text) {
            throw new Error("Add a title and/or text to your note, please")
        }

        const newNote = { title, text, id: uuid() }

        return this.grabNotes()
            .then(notes => [...notes, newNote])
            .then(newNotes => this.write(newNotes))
            .then(() => this.newNote)
    }

    // delete a note
    deleteNote(id) {
        return this.grabNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(remainingNotes => this.write(remainingNotes))
    }
}

module.exports = new DBInteract();