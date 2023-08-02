import 'bootstrap/dist/css/bootstrap.min.css';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import Chat from "./Chat";
import Website from './Website';

import './App.css';
import { useEffect, useState } from 'react';
import { MembershipTier, Section } from './lib/types';
import * as WebFont from 'webfontloader';
import { Tab, Tabs } from 'react-bootstrap';
import MembershipTile from './components/MembershipTile';

function App() {

  const [currentTab, setCurrentTab] = useState('memberships')

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

  const [membershipTiers, setMemberships] = useState<MembershipTier[]>([
    {
      title: 'Supporter',
      cost: '5',
      perks: [],
    },
    {
      title: 'Super Supporter',
      cost: '10',
      perks: [
        'Test1',
        'Test2'
      ]
    }    
  ])

  return (
    <div className="container">
      <div className="left-panel">
        <Tabs
          id="main"
          activeKey={currentTab}
          onSelect={(k) => setCurrentTab(k || 'website')}
          className="mb-3"
        >
          <Tab eventKey={"website"} title={"Website"}>
            <Website website={{
              font,
              fontColor,
              backgroundColor,
              sections,
            }} />
          </Tab>
          <Tab eventKey={"memberships"} title={"Memberships"}>
            <h2>Perks & tiers</h2>
            {membershipTiers.map((membership, index) => {
              return <MembershipTile key={index} {...membership} />
            })}
          </Tab>
          <Tab eventKey={"products"} title={"Products"}>
          </Tab>
        </Tabs>
      </div>
      <div className="right-panel">
        <Chat 
          setSections={setSections}
          setMemberships={setMemberships}
          memberships={membershipTiers}
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
