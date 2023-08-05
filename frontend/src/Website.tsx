import { Button } from "react-bootstrap"
import { MembershipTier, Product, WebsiteDefinition } from "./lib/types"
import Donation from "./widgets/Donation"
import FeaturedCollection from "./widgets/FeaturedCollection"
import ImageBanner from "./widgets/ImageBanner"
import InstagramFeed from "./widgets/InstaFeed"
import Memberships from "./widgets/Memberships"
import VideoBanner from "./widgets/VideoBanner"
import YoutubeFeed from "./widgets/YoutubeFeed"

export default function Website(props: {
  website: WebsiteDefinition,
  products: Product[],
  memberships: MembershipTier[],
}) {
  return <div style={{
    height: '800px', 
    width: '100%', 
    overflow: 'hidden', 
    display: 'flex',
    // custom
    color: props.website.fontColor,
    fontFamily: props.website.font,
    backgroundColor: props.website.backgroundColor, 
  }}>
    <div style={{overflow: 'scroll', minWidth: '100%'}}>
      <div style={{margin: 'auto', textAlign: 'center', fontSize: 30}}>
        <Button style={{
          backgroundColor: props.website.ctaBackgroundColor,
          color: props.website.ctaColor,
        }}>{props.website.title}</Button>
      </div>
      {
        props.website.sections.map((section) => {
          switch(section.widget) {
            case 'donation':
              return <div className="widget">
                <Donation 
                  ctaColor={props.website.ctaColor}
                  ctaBackgroundColor={props.website.ctaBackgroundColor}
                  {...section.parameters}
                />
              </div>
            case 'featured-collection':
              return  <div className="widget">
                <FeaturedCollection 
                  number_of_items={section.parameters.number_of_items || '4'} 
                  heading={section.parameters.heading}
                  products={props.products}/>
              </div>
            case 'memberships':
              return  <div className="widget">
                <Memberships 
                  ctaBackgroundColor={props.website.ctaBackgroundColor}
                  ctaColor={props.website.ctaColor}                
                  heading={section.parameters.heading} 
                  tiers={props.memberships}/>
              </div>
            case 'image-banner':
              return  <div className="widget">
                <ImageBanner 
                  ctaBackgroundColor={props.website.ctaBackgroundColor}
                  ctaColor={props.website.ctaColor}
                  {...section.parameters}/>
              </div>
            case 'video-banner':
              return  <div className="widget">
                <VideoBanner 
                  ctaBackgroundColor={props.website.ctaBackgroundColor}
                  ctaColor={props.website.ctaColor}
                  {...section.parameters}/>
              </div>
            case 'youtube-feed':
              return  <div className="widget">
                <YoutubeFeed {...section.parameters}/>
              </div>
            case 'instagram-feed':
              return  <div className="widget">
                <InstagramFeed {...section.parameters}/>
              </div>
            default:
              return <div>Unknown section type: {section.widget}</div>
          }
        })
      }
    </div>
  </div>
}

