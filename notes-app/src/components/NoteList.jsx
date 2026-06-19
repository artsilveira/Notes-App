function NoteCard({ note, onSelectNote, onDeleteNote }) {
  return (
    <div
      className="p-3 mb-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 flex justify-between items-start group"
      onClick={() => onSelectNote(note)}
    >
      <div>
        <p className="text-white font-medium">{note.title}</p>
        <p className="text-gray-400 text-sm">{note.date}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDeleteNote(note.id)
        }}
        className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
      >
          ✕
      </button>
    </div>
  )
}

function NoteList({ notes, onSelectNote, onDeleteNote }) {
  return (
    <div className="w-64 bg-gray-800 h-screen p-4">
      {notes.map(note => (
        <NoteCard key={note.id} note={note} onSelectNote={onSelectNote} onDeleteNote={onDeleteNote} />
      ))}
    </div>
  )
}

export default NoteList