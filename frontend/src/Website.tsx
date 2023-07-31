import FeaturedCollection from "./widgets/FeaturedCollection"
import ImageBanner from "./widgets/ImageBanner"
import VideoBanner from "./widgets/VideoBanner"
import YoutubeFeed from "./widgets/YoutubeFeed"



export default function Website() {
  return <div style={{width: '960px', height: '800px', backgroundColor: 'pink', overflow: 'hidden', display: 'flex'}}>
    <div style={{overflow: 'scroll', boxSizing: 'border-box'}}>
      <pre>
        {`
        {
          font: 16px/1.5 sans-serif;
          titleFont: 24px/1.5 sans-serif;
          sections: [
            {
              title: "About",
            }
          ]
        }
        `}
      </pre>
      <YoutubeFeed />
      <VideoBanner />
      <ImageBanner />
      <FeaturedCollection />
    </div>
  </div>
}

