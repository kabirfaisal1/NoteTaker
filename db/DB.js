const fs = require('fs')
const util = require('util')

//const noteData = "./db/db.json";
// const noteData = "./db/db2.js";
const noteData = './db/db2.json'

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class DB {
  async readNotes () {
    try {
      const notesRaw = await readFileAsync(noteData, 'UTF8')
      return notesRaw ? JSON.parse(notesRaw) : []
    } catch (error) {
      throw error
    }
  }

  async addNote (data) {
    try {
      await writeFileAsync(noteData, JSON.stringify(data, null, '\t')).then(
        () => {
          console.log('New note added.')
        }
      )
    } catch (error) {
      throw error
    }
  }
  async editNote (data) {
    console.log('Edit note added.', data)
    try {
      await writeFileAsync(noteData, JSON.stringify(data, null, '\t')).then(
        () => {
          console.log('Edit note added.')
        }
      )
    } catch (error) {
      throw error
    }
  }

  async deleteNote (data) {
    try {
      await writeFileAsync(noteData, JSON.stringify(data, null, '\t')).then(
        () => {
          console.log('Note deleted.')
        }
      )
    } catch (error) {
      throw error
    }
  }
}
function findData (id, item, index, arr) {
  console.log(arr[index])
}

module.exports = new DB()
