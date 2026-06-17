import { useState } from 'react'
import Sidebar from './components/Sidebar'
import NoteList from './components/NoteList'
import Editor from './components/Editor'

const initialNotes = [
  { id: 1, title: 'Reunião de planejamento', date: 'Hoje', content: 'Definir metas do trimestre...' },
  { id: 2, title: 'Livros para ler', date: 'Ontem', content: 'Atomic Habits, Deep Work...' },
  { id: 3, title: 'Ideias para o projeto', date: '14 jun', content: 'Dashboard com filtros...' },
]

function App() {
  const [notes, setNotes] = useState(initialNotes)
  const [selectedNote, setSelectedNote] = useState(initialNotes[0])

  return (
    <div className="flex">
      <Sidebar />
      <NoteList notes={notes} onSelectNote={setSelectedNote} />
      <Editor note={selectedNote} />
    </div>
  )
}

export default App