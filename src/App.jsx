import { useState, useRef } from 'react'
import Editor from './components/Editor'
import Intro from './components/Intro'
import Desc from './components/Desc'
import Hist from './components/Hist'
import Icons from './components/Icons'
import './styles/App.css'

function App() {
  // We want the sequencing to match the overarching sequence
  const ContentType = {
    INTRO: 'Intro',
    DESC: 'Desc',
    HISTORY: 'History',
    ICONS: 'Icons'
  };

  // initial content
  const initialContent = [
    { id: 1, type: ContentType.INTRO, width: 200, height: 150 },
    { id: 2, type: ContentType.DESC, width: 200, height: 150 },
    { id: 3, type: ContentType.HISTORY, width: 200, height: 150 },
    { id: 4, type: ContentType.ICONS, width: 200, height: 150 },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent)
  const scrollContainerRef = useRef(null);

  // plain object that maps type to component
  const contentMap = {
    [ContentType.INTRO]: Intro,
    [ContentType.DESC]: Desc,
    [ContentType.HISTORY]: Hist,
    [ContentType.ICONS]: Icons,
  }

  // MAKE that swithcing edits the underlying array!!

  if (isEditing) {
    return (
      <div>
        <button 
          onClick={() => setIsEditing(false)}
          className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          View Mode
        </button>
        <Editor content = {content} setContent={setContent}/>
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
        {content.map(item => {

            // get component from object
            const Component = contentMap[item.type];

            // render component 
            return <Component key={item.id}/>
        })}
      </main>
    </div>
  )
}

export default App
