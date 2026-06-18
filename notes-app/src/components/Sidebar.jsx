function Sidebar({ onNewNote }) {
    return (
        <div className="w-48 bg-gray-900 h-screen p-4">
            <h2 className="text-white font-bold text-lg mb-4">Minhas Notas</h2>
            <button
                onClick={onNewNote}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
                + Nova nota
            </button>
        </div>
    )
}

export default Sidebar 