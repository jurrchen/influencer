import './VideoBanner.css'

export default function VideoBanner(props: {
  ctaBackgroundColor: string,
  ctaColor: string,
  [key: string]: string
}) {
  return <div className="video-banner">
    <video playsInline autoPlay muted loop>
      <source src={props.background}/>
    </video>
    <div className="content" style={{color: props.text_color}}>
      <h1>{props.header}</h1>
      <p>{props.subtitle}</p>
      <div className="buttons">
        <button 
          className="shop-now" 
          style={{backgroundColor: props.ctaBackgroundColor, color: props.ctaColor}}
        >{props.call_to_action_1}</button>
        <button 
          className="visit-channel"
          style={{backgroundColor: props.ctaBackgroundColor, color: props.ctaColor}}
        >{props.call_to_action_2}</button>
      </div>
    </div> 
  </div>
}
