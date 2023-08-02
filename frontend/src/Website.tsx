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
    <div style={{overflow: 'scroll', boxSizing: 'border-box'}}>
      {/* <pre>
        {JSON.stringify(props.website, null, 2)}
      </pre> */}
      <h1>Jieren's website</h1>
      <h3>Subtitle</h3>
      {
        props.website.sections.map((section) => {
          switch(section.widget) {
            case 'donation':
              return <Donation {...section.parameters}/>
            case 'featured-collection':
              return <FeaturedCollection 
                number_of_items={section.parameters.number_of_items || '4'} 
                products={props.products}/>
            case 'memberships':
              return <Memberships tiers={props.memberships}/>
            case 'image-banner':
              return <ImageBanner {...section.parameters}/>
            case 'video-banner':
              return <VideoBanner {...section.parameters}/>
            case 'youtube-feed':
              return <YoutubeFeed {...section.parameters}/>
            case 'instagram-feed':
              return <InstagramFeed {...section.parameters}/>
            default:
              return <div>Unknown section type: {section.widget}</div>
          }
        })
      }
    </div>
  </div>
}

