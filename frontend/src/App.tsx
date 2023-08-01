import 'bootstrap/dist/css/bootstrap.min.css';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import Chat from "./Chat";
import Website from './Website';

import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { Section } from './lib/types';
import * as WebFont from 'webfontloader';

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

  const [font, setFont] = useState('Arial')
  useEffect(() => {
    WebFont.load({
      google: {
        families: [font]
      },
      active: () => {
      }
    });
  }, [font])

  const [backgroundColor, setBackgroundColor] = useState('#ffffff')

  const [fontColor, setFontColor] = useState('#000000')

  return (
    <div className="container">
      <div className="left-panel">
        <Website website={{
          font,
          fontColor,
          backgroundColor,
          sections,
        }} />
      </div>
      <div className="right-panel">
        <Chat 
          appendSection={appendSection}
          website={{
            font,
            fontColor,
            backgroundColor,
            sections
          }}
          setGlobals={{
            setFont,
            setBackgroundColor,
            setFontColor,
          }}
        />
      </div>
    </div>
  )
}

export default App
