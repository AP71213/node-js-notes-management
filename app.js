const yargs = require('yargs')
const operation = require('./notes')

const log = console.log

//yargs add command
yargs.command({
    command: 'add',
    describe: 'Adding a note',
    builder: {
        title: {
            describe: 'note title',
            type: 'string',
            demandOption: true
        },
        body: {
            describe:'note body',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) => {
        operation.add(argv)
    }
})

//remove command
yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title: {
            describe:'Title of the note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        operation.remove(argv)
    }
})

//listing all the notes
yargs.command({
    command: 'list',
    describe: 'listing all the notes',
    handler: () => operation.list()
})

yargs.command({
    command: 'read',
    describe: 'reading a note',
    builder: {
        title: {
            type:'string',
            describe:'title for finding',
            demandOption: true
        }
    },
    handler: (argv) => operation.read(argv) 
})

log(yargs.argv)