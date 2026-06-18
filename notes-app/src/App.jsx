import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import NoteList from './components/NoteList'
import Editor from './components/Editor'

function App() {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/notes')
      .then(response => response.json())
      .then(data => {
        setNotes(data)
        setSelectedNote(data[o] || null)
      })
  }, [])

  return (
    <div className="flex">
      <Sidebar />
      <NoteList notes={notes} onSelectNote={setSelectedNote} />
      {selectedNote ? (
        <Editor note={selectedNote} />
      ) : ( 
        <div className="flex-1 bg-gray-700 h-screen p-6 text-gray-400">
          Nenhuma nota ainda. Crie a primeira!
        </div>
      )}
    </div>
  )
}

export default App