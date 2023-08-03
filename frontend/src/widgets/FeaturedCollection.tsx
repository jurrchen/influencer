import { Product } from "../lib/types";
import "./FeaturedCollection.css"

export default function FeaturedCollection(props: {
  number_of_items: string,
  heading: string | null,
  products: Product[]
}) {
  return <div style={{width: '900px', margin: 'auto'}}>
    <h1 style={{textAlign: 'center'}}>{props.heading}</h1>
    <div className="featured-collection">
      {props.products.slice(0, parseInt(props.number_of_items)).map((product, index) => (
          <div className="product-card" key={index}>
              <div className="product-image">
                  <img src={product.image} alt={product.title} />
                  <button className="see-more-button">See More</button>
              </div>
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.cost}</p>
          </div>
      ))}
    </div>
  </div> 
}

