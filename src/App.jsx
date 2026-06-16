import Sidebar from './components/Sidebar'
import NoteList from './components/NoteList'
import Editor from './components/Editor'

function App() {
  return (
    <div className='flex'>
      <Sidebar />
      <NoteList />
      <Editor />
    </div>
  )
}

export default App