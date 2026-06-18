function Editor({ note }) {
  return (
    <div className="flex-1 bg-gray-700 h-screen p-6">
      <h1 className="text-white text-2xl font-bold mb-4">{note.title}</h1>
      <p className="text-gray-300">{note.content}</p>
    </div>
  )
}

export default Editor