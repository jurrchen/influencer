import './ImageBanner.css'

export default function ImageBanner() {
  return <div className="image-banner">
    <img src="https://imgproxy.fourthwall.com/Vm6oydSBaTSLcegRAzqQAGEHaCQUqz_6RdXzvDQcCgQ/w:1920/plain/https://storage.googleapis.com/popshopprod-shop-renderer-assets-q9gk7sc6/themes/assets/db2c1500-ba02-4f1a-ab7f-2c560ae47c35/assets/photo-1.jpg" alt="Banner" />
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
