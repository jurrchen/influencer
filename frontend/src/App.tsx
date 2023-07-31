import 'bootstrap/dist/css/bootstrap.min.css';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import Chat from "./Chat";
import Website from './Website';

import './App.css';
import { useCallback, useState } from 'react';
import { Section } from './lib/types';

function App() {

  const [sections, setSections] = useState<Section[]>([{
    sectionType: 'donation',
  }])

  const appendSection = useCallback((section: Section) => {
    setSections([
      ...sections,
      section,
    ])
  }, [sections, setSections]);

  return (
    <div className="container">
      <div className="left-panel">
        <Website website={{
          font: 'Arial',
          titleFont: 'Arial',
          sections,
        }} />
      </div>
      <div className="right-panel">
        <Chat appendSection={appendSection} />
      </div>
    </div>
  )
}

export default App
