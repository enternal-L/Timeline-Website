import { useState, useRef } from 'react'
import Editor from './components/Editor'
import Intro from './components/Intro'
import Desc from './components/Desc'
import Hist from './components/Hist'
import Icons from './components/Icons'
import ScrollProgressIndicator from './components/ScrollProgressIndicator'
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

  // plain object that maps type to component
  const contentMap = {
    [ContentType.INTRO]: Intro,
    [ContentType.DESC]: Desc,
    [ContentType.HISTORY]: Hist,
    [ContentType.ICONS]: Icons,
  }

  // ref for measurements, have to attach to a DOM element
  const ref = useRef(null);

  // MAKE that swithcing edits the underlying array!!

  if (isEditing) {
    return (
      <div>
        <Editor content = {content} setContent={setContent}/>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      <main 
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth custom-scrollbar"
        ref = {ref}
      >
        {content.map(item => {

            // get component from object
            const Component = contentMap[item.type];

            // render component 
            return <Component key={item.id}/>
        })}
      </main>
      
      <ScrollProgressIndicator
        sectionRef = {ref}
        sectionCount={content.length} 
      />
    </div>
  )
}

export default App
