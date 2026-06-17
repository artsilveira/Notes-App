function NoteCard({ note, onSelectNote }) {
  return (
    <div
      className="p-3 mb-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600"
      onClick={() => onSelectNote(note)}
    >
      <p className="text-white font-medium">{note.title}</p>
      <p className="text-gray-400 text-sm">{note.date}</p>
    </div>
  )
}

function NoteList({ notes, onSelectNote }) {
  return (
    <div className="w-64 bg-gray-800 h-screen p-4">
      {notes.map(note => (
        <NoteCard key={note.id} note={note} onSelectNote={onSelectNote} />
      ))}
    </div>
  )
}

export default NoteList