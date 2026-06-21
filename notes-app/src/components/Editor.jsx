import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const CATEGORIES = ['Geral', 'Trabalho', 'Pessoal', 'Estudos']

function Editor({ note, onUpdateNote }) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [category, setCategory] = useState(note.category || 'Geral')
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
    setCategory(note.category || 'Geral')
  }, [note])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (title !== note.title || content !== note.content || category !== note.category) {
        fetch(`http://localhost:3001/notes/${note.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, date: note.date, category })
        })
          .then(response => response.json())
          .then(updatedNote => onUpdateNote(updatedNote))
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [title, content, category])

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

      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-4 bg-gray-600 text-white text-sm rounded px-2 py-1 w-fit outline-none"
      >
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

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