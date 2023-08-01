import { WebsiteDefinition } from "./lib/types"
import Donation from "./widgets/Donation"
import FeaturedCollection from "./widgets/FeaturedCollection"
import ImageBanner from "./widgets/ImageBanner"
import InstagramFeed from "./widgets/InstaFeed"
import VideoBanner from "./widgets/VideoBanner"
import YoutubeFeed from "./widgets/YoutubeFeed"

export default function Website(props: {website: WebsiteDefinition}) {
  return <div style={{height: '800px', width: '100%', backgroundColor: 'pink', overflow: 'hidden', display: 'flex'}}>
    <div style={{overflow: 'scroll', boxSizing: 'border-box'}}>
      {/* <pre>
        {JSON.stringify(props.website, null, 2)}
      </pre> */}
      {
        props.website.sections.map((section) => {
          switch(section.sectionType) {
            case 'donation':
              return <Donation />
            case 'featured-collection':
              return <FeaturedCollection />
            case 'image-banner':
              return <ImageBanner />
            case 'video-banner':
              return <VideoBanner />
            case 'youtube-feed':
              return <YoutubeFeed />
            case 'instagram-feed':
              return <InstagramFeed />
            default:
              return <div>Unknown section type: {section.sectionType}</div>
          }
        })
      }
    </div>
  </div>
}

