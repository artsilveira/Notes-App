import { useState, useEffect } from 'react'

function Editor({ note, unUpdateNote }) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
  }, [note])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (title !== note.title || content !== note.content) {
        fetch(`http://localhost:3001/notes/${note.id}`, {
          method: 'PUT', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, date: note.date})
        })
          .then(response => response.json())
          .then(updatedNote => onUpdateNote(updatedNote))
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [title, content])

  return (
    <div className="flex-1 bg-gray-700 h-screen p-6">
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-white text-2xl font-bold mb-4 bg-transparent outline-none w-full"
      />
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-gray-300 bg-transparent outline-none w-full h-5/6 resize-none"
      />
    </div>
  )
}

export default Editor