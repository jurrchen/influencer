import './ImageBanner.css'

export default function ImageBanner(props: {
  [key: string]: string
}) {
  return <div className="image-banner">
    <img src={props.background} alt="Banner" />
    <div className="content">
      <h1>{props.header}</h1>
      <p>{props.subtitle}</p>
      <div className="buttons">
        <button className="shop-now">{props.call_to_action_1}</button>
        <button className="visit-channel">Visit Channel</button>
      </div>
    </div> 
  </div>
}
