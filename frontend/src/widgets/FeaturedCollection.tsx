import { Product } from "../lib/types";
import "./FeaturedCollection.css"

export default function FeaturedCollection(props: {
  number_of_items: string,
  products: Product[]
}) {
  return <div className="featured-collection">
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
}

