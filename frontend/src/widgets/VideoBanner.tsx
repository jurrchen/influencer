import './VideoBanner.css'

export default function VideoBanner() {
  return <div className="video-banner">
    <video playsInline autoPlay muted loop>
      <source src="https://themes.fourthwall.com/themes/assets/db2c1500-ba02-4f1a-ab7f-2c560ae47c35/assets/video-1.mp4"/>
    </video>
    <div className="content">
      <h1>MY NEW COLLECTION IS OUT NOW</h1>
      <p>Check out our new, amazing summer collection with brilliant hoodies, t-shirts, hats, shoes and blazers.</p>        
      <div className="buttons">
        <button className="shop-now">Shop Now</button>
        <button className="visit-channel">Visit Channel</button>
      </div>
    </div> 
  </div>
}
