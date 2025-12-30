import { useState, useRef } from 'react'
import Editor from './components/Editor'
import Intro from './components/Intro'
import Desc from './components/Desc'
import Hist from './components/Hist'
import Icons from './components/Icons'
import './styles/App.css'

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const scrollContainerRef = useRef(null);

  if (isEditing) {
    return (
      <div>
        <button 
          onClick={() => setIsEditing(false)}
          className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          View Mode
        </button>
        <Editor/>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      <button 
        onClick={() => setIsEditing(true)}
        className="fixed top-4 right-4 z-50 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
      >
        Edit Mode
      </button>
      
      <main 
        ref={scrollContainerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth custom-scrollbar"
      >
        <Intro />
        <Desc />
        <Hist />
        <Icons />
      </main>
    </div>
  )
}

export default App
