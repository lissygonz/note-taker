//Dependencies

const util = require('util');
const fs = require('fs');

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Save {
    wrtie(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }

read() {
    return readNote('db/db.json', 'utf8');
}
retrieveNotes() {
    return this.read().then(notes => {
        let parsedNotes;
        try {
            parsedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
            parsedNotes = [];
        }
        return parsedNotes;
    });
}

addNote(note) {
    const {title, text} = note;
    if (!title || !text) {
        throw new Error('Both title and text can not be blank')
    }

    //Use UUID package to add unqiue IDs
    const newNote = { title, text , id: uuidv4() };

    return this.retrieveNotes()
    .then(notes => [...notes, newNote])
    .then(updatedNotes => this.wrtie(updatedNotes))
    .then(() => newNote);
}


//delete note function BONUS

deleteNote(id) {
    return this.retrieveNotes()
    .then(notes => notes.filter(note => note.id !== id))
    .then(filteredNotes => this.write(filteredNotes));
}
}

module.exports = new Save();