const CATEGORIES = ['Todas', 'Geral', 'Trabalho', 'Pessoal', 'Estudos']

function Sidebar({ onNewNote, selectedCategory , onSelectCategory}) {
    return (
        <div className="w-48 bg-gray-900 h-screen p-4">
            <h2 className="text-white font-bold text-lg mb-4">Minhas Notas</h2>
            <button
                onClick={onNewNote}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
                + Nova nota
            </button>

            <p className="text-gray-500 text-xs uppercase mb-2">Categorias</p>
            <div className="flex flex-col gap-1">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => onSelectCategory(cat)}
                        className={`text-left px-2 py-1 rounded text-sm ${selectedCategory === cat ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Sidebar 