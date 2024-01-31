const fs = require('fs');
const chalk = require('chalk');

//Adding the notes
const addNotes = (title, body) => {
    const notes = loadNotes();

    // const duplicateNotes = notes.filter((note) => note.title === title) //u can use either way:
    const duplicateNote = notes.find((note) => note.title === title);



    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added"));
    } else {
        console.log(chalk.red.inverse("This title is already taken!"));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

debugger

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
    }
    //when there isn't any file(it would be the very first time adding a note), this catch will work. An empty array wil returned and the very first data will be added to it.
    // if there is one, try block will run. 
    catch (error) {
        return []
    }
}

//removing the notes
const removeNotes = (title) => {
    const notes = loadNotes();
    //creating a new array without the one, to be removed
    const notesToKeep = notes.filter((note) => note.title !== title)

    //code for if no such note there
    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse("No note found!"));
    } else {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse("Note removed!"));
    }
    //another way: if (notes.length > notesToKeep.length)
}

//Listing the notes
const listNotes = () => {

    console.log(chalk.inverse("Your Notes:"))
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(note.title);
    });
}


//Reading a note

const readNotes = (title) => {
    const notes = loadNotes();
    const noteCheck = notes.find((note) => note.title === title);

    if (noteCheck) {
        console.log(chalk.inverse(noteCheck.title))
        console.log(noteCheck.body)
    } else {
        console.log(chalk.red.inverse("No note found!"));
    }
}

//exporting 
module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}