import './YoutubeFeed.css';

const Videos = [
  {
    title: "Singer Songwriter Thuy Talks Favorite Vietnamese Food, Tour Life, and Family",
    thumbnail: "https://i.ytimg.com/vi/FkmDl9UfSTk/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=FkmDl9UfSTk"
  },
  {
    title: "@Doobydobap on Opening Her Own Restaurant, Food Science, and Mcdonalds",
    thumbnail: "https://i.ytimg.com/vi/hQwtEZUgJ28/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=hQwtEZUgJ28"
  },
  {
    title: "Eddie Huang Talks Why They Sleep In Separate Bedrooms",
    thumbnail: "https://i.ytimg.com/vi/hM-yk82TUZw/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=hM-yk82TUZw"
  },
];

const YoutubeFeed = (props: {
  [key: string]: string
}) => {
  return (
    <div style={{width: '900px', margin: 'auto'}}>
      <div className="youtube-header">
        <h2>{props.heading}</h2>
        <a href="https://www.youtube.com/channel/UCWJQeV1fVrBnUXHtWmfUUfA" target="_blank" rel="noopener noreferrer">
          <button>Visit Channel</button>
        </a>
      </div>
      <div className="youtube-feed">
        {Videos.slice(0, parseInt(props.number_of_videos)).map((video, index) => (
          <div key={index} className="youtube-video">
            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
              <div className="youtube-thumbnail">
                <img src={video.thumbnail} alt="video thumbnail" />
                <div className="play-button"></div>
              </div>
              <div className="youtube-title">{video.title}</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeFeed;