import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import NoteList from './components/NoteList'
import Editor from './components/Editor'

function App() {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/notes')
      .then(response => response.json())
      .then(data => {
        setNotes(data)
        setSelectedNote(data[0] || null)
      })
  }, [])

  const handleNewNote = () => {
    const newNote = {
      title: 'Nova nota', 
      content: '',
      date: 'Hoje',
      category: 'Geral'
    }

    fetch('http://localhost:3001/notes', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote)
    })
    .then(response => response.json())
    .then(createdNote => {
      setNotes([createdNote, ...notes])
      setSelectedNote(createdNote)
    })
  }

  const handleUpdateNote = (updatedNote) => {
    setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n))
    setSelectedNote(updatedNote)
  }

  const handleDeleteNote = (id) => {
    fetch(`http://localhost:3001/notes/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        const remainingNotes = notes.filter(n => n.id !== id)
        setNotes(remainingNotes)

        if (selectedNote?.id === id) {
          setSelectedNote(remainingNotes[0] || null)
        }
      })
  }

  const filteredNotes = notes
    .filter(note => selectedCategory === 'Todas' || note.category === selectedCategory)
    .filter(note => 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <div className="flex">
      <Sidebar 
        onNewNote={handleNewNote}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <NoteList 
        notes={filteredNotes} 
        onSelectNote={setSelectedNote} 
        onDeleteNote={handleDeleteNote} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      {selectedNote ? (
        <Editor note={selectedNote} onUpdateNote={handleUpdateNote} />
      ) : ( 
        <div className="flex-1 bg-gray-700 h-screen p-6 text-gray-400">
          Nenhuma nota ainda. Crie a primeira!
        </div>
      )}
    </div>
  )
}

export default App