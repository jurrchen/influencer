import 'bootstrap/dist/css/bootstrap.min.css';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import Chat from "./Chat";
import Website from './Website';

import './App.css';
import { useEffect, useState } from 'react';
import { GlobalsDelta, MembershipTier, Product, Section } from './lib/types';
import * as WebFont from 'webfontloader';
import { Tab, Tabs } from 'react-bootstrap';
import MembershipTile from './components/MembershipTile';
import ProductTile from './components/ProductTile';

function App() {

  const [currentTab, setCurrentTab] = useState('website')

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

  /**
   * Globals
   */

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

  const [ctaColor, setCtaColor] = useState('#ffffff')
  const [ctaBackgroundColor, setCtaBackgroundColor] = useState('#000000')

  const [title, setTitle] = useState("@mkbhd")

  const setGlobalsBatch = (delta: GlobalsDelta) => {
    if(delta.font) {
      setFont(delta.font)
    }

    if(delta.backgroundColor) {
      setBackgroundColor(delta.backgroundColor)
    }

    if(delta.fontColor) {
      setFontColor(delta.fontColor)
    }

    if(delta.font) {
      setFont(delta.font)
    }

    if(delta.ctaFontColor) {
      setCtaColor(delta.ctaFontColor)
    }

    if (delta.ctaBackgroundColor) {
      setCtaBackgroundColor(delta.ctaBackgroundColor)
    }
  }

  /**
   * User models
   */
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

  const [products, setProducts] = useState<Product[]>([
    {
      image: 'https://imgproxy.fourthwall.com/Ttq9mgaiwW1oI42HpIDWY3P4KIBC22RGo2NNB9a106w/w:720/plain/https://storage.googleapis.com/cdn.fourthwall.com/offer/demo_products/demo_mug.png',
      title: 'Example product 4',
      cost: '15.00',
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
            <Website 
              website={{
                title,
                font,
                fontColor,
                ctaColor,
                ctaBackgroundColor,
                backgroundColor,
                sections,
              }}
              products={products}
              memberships={membershipTiers}
            />
          </Tab>
          <Tab eventKey={"memberships"} title={"Memberships"}>
            <h2>Perks & tiers</h2>
            <div className="tiled">
              {membershipTiers.map((membership, index) => {
                return <MembershipTile key={index} {...membership} />
              })}
            </div>
          </Tab>
          <Tab eventKey={"products"} title={"Products"}>
            <h2>Products</h2>
            <div className="tiled">
              {products.map((product, index) => {
                return <ProductTile key={index} {...product} />
              })}
            </div>
          </Tab>
        </Tabs>
      </div>
      <div className="right-panel">
        <Chat 
          setSections={setSections}
          setMemberships={setMemberships}
          setProducts={setProducts}
          memberships={membershipTiers}
          products={products}
          website={{
            title,
            font,
            fontColor,
            ctaColor,
            ctaBackgroundColor,
            backgroundColor,
            sections,
          }}
          setGlobals={{
            setFont,
            setBackgroundColor,
            setFontColor,
          }}
          setGlobalsBatch={setGlobalsBatch}
        />
      </div>
    </div>
  )
}

export default App
