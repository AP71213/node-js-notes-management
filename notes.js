const fs = require('fs')
const chalk = require('chalk')
const log = console.log

//adding a note
const add = (note) => {
    const notes = getNotes()
    debugger
    if (checkDuplicate(note, notes)) {
        notes.push({
            title: note.title,
            body: note.body
        })
        saveNotes(notes)
    } else {
        log(chalk.red.inverse('title already exists'))
    }
}
const saveNotes = (notes) => {
    fs.writeFileSync('notes.json',JSON.stringify(notes))
    log(chalk.green.inverse('Note successfully added'))
}
const checkDuplicate = (note, notes) => {
    const duplicates = notes.filter((entry) => {
        return note.title === entry.title
    })
    return duplicates.length===0
}
const getNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json', 'utf8'))
    } catch (e) {
        return []
    }
}

//removing a note
const remove = (note) => {
    const notes = getNotes()
    if(containsTarget(note, notes)) {
        chosen = notes.filter(entry => {
            return entry.title!=note.title
        })
        saveDeletedNotes(chosen)
    } else log(chalk.red.inverse('No note found with that title!'))
}
const containsTarget = (note, notes) => {
    const target = notes.filter((entry) => {
        return note.title===entry.title
    })
    return target.length!=0
}
const saveDeletedNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
    log(chalk.green.inverse('Note deleted!'))
}

//listing notes
const list = () => {
    const notes = getNotes()
    log(chalk.underline.yellow.inverse('Listing all the notes below'))
    notes.forEach(entry => {
        log(entry.title)
    })
}


//reading a note
const read = (note) => {
    const notes = getNotes()
    const found = notes.find((entry)=>entry.title===note.title)
    if(found) {
        log(chalk.yellow.bold.underline.inverse(found.title))
        log(found.body)
    } else log(chalk.red.inverse('No such note found'))
}

module.exports = {
    add: add,
    remove: remove,
    list: list,
    read: read
}