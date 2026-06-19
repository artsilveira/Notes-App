import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

function Editor({ note, onUpdateNote }) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [isPreview, setIsPreview] = useState(false)

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
          body: JSON.stringify({ title, content, date: note.date })
        })
          .then(response => response.json())
          .then(updatedNote => onUpdateNote(updatedNote))
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [title, content])

  return (
    <div className="flex-1 bg-gray-700 h-screen p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-white text-2xl font-bold bg-transparent outline-none w-full"
        />
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="ml-4 px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-500 whitespace-nowrap"
        >
          {isPreview ? 'Editar' : 'Visualizar'}
        </button>
      </div>

      {isPreview ? (
        <div className="text-gray-300 prose prose-invert max-w-none overflow-auto">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-gray-300 bg-transparent outline-none w-full h-full resize-none font-mono"
        />
      )}
    </div>
  )
}

export default Editor