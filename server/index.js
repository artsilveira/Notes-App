const express = require('express')
const cors = require('cors')
const db = require('./database')

const app = express()
app.use(cors())
app.use(express.json())

// Search all notes
app.get('/notes', (req, res) => {
    const notes = db.prepare('SELECT * FROM notes ORDER BY id DESC').all()
    res.json(notes)
})

// Create a new note
app.post('/notes', (req, res) => {
    const {title, content, date} = req.body
    const result = db.prepare('INSERT INTO notes (title, content, date) VALUES (?, ?, ?)').run(title, content, date)
    const newNote = db.prepare('SELECT * FROM notes WHERE id = ?').get(result.lastInsertRowid)
    res.json(newNote)
})

// Update a note 
app.put('/notes/:id', (req, res) => {
    const { id } = req.params
    const { title, content, date } = req.body
    db.prepare('UPDATE notes SET title = ?, content = ?, date = ? WHERE id = ?').run(title, content, date, id)
    const updateNote = db.prepare('SELECT * FROM notes WHERE id = ?').get(id)
    res.json(updatedNote)
})

// Delete a note 
app.delete('/notes/:id', (req, res) => {
    const { id } = req.paramsdb.prepare('DELETE FROM notes WHERE id = ?').run(id)
    res.json({ success: true})
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})