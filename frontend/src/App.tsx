import 'bootstrap/dist/css/bootstrap.min.css';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import Chat from "./Chat";
import Website from './Website';

import './App.css';
import { useEffect, useState } from 'react';
import { Section } from './lib/types';
import * as WebFont from 'webfontloader';

function App() {

  const [sections, setSections] = useState<Section[]>([{
    widget: 'donation',
    parameters: {
      first_amount: "5",
      second_amount: "10",
      third_amount: "20",
      heading: 'THANK YOU FOR YOUR SUPPORT!',
      description: "Thank you so much for your support. Leave a message with your donation and I'll try to reply!",
      call_to_action: "Donate & Send Message"
    }
  }])

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
          setSections={setSections}
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
