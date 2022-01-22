const util = require("util");

const uuid = require("uuid").v1;

const fs = require("fs");

const writeFile = util.promisify(fs.writeFile);

const readFile = util.promisify(fs.readFile);


class storeData {
    write(note) {
        return writeFile("db/db.json", JSON.stringify(note))
    }

    read() {
        return readFile("db/db.json", "utf8")
    }

    removeNote(id) {
        return this.grabNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(remainingNotes => this.write(remainingNotes))
    }

    addNote(note) {
        const { title, text } = note

        if (!title || !text) {
            throw new Error("Add a note title and text")
        }

        const newNote = { title, text, id: uuid() }

        return this.grabNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => this.newNote)
    }

    grabNotes() {
        return this.read()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }
}

module.exports = new storeData();