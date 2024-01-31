var fs = require('fs');
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js')

//version changing
yargs.version("1.1.0");

//adding a note
yargs.command({
    command: 'add',
    describe: 'Just a adding tool',
    builder: {
        title: {
            describe: 'Setting up a title for note',
            type: 'string',
            demandOption: true
        },
        body: {
            describe: 'Setting up a body for the note',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) => {
        notes.addNotes(argv.title, argv.body);
    }
})

//removing a note
yargs.command({
    command: 'remove',
    describe: 'Just a removing tool',
    builder: {
        title: {
            describe: 'title for removing note',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) => {
        notes.removeNotes(argv.title);
    }
})

//reading a note
yargs.command({
    command: 'read',
    describe: 'Just a reading tool',
    builder: {
        title: {
            describe: 'title for removing note',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) => {
        notes.readNotes(argv.title);
    }
})

//listing a note
yargs.command({
    command: 'list',
    describe: 'Just a listing tool',
    handler: () => {
        notes.listNotes();
    }
})

// console.log(yargs.argv);
yargs.parse();

//node .\App.js add --title="Sample Title" --body="Sample body" 