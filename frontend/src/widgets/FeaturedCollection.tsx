import "./FeaturedCollection.css"

const Products = [
  {
      image: 'https://imgproxy.fourthwall.com/YMHcqXbGGZDyaKA9HndSawFKCRvS4zPel7nKo2OUvmI/w:720/plain/https://storage.googleapis.com/cdn.fourthwall.com/offer/demo_products/demo_water_bottle.png',
      title: 'Example product 1',
      price: '$18.00',
  },
  {
      image: 'https://imgproxy.fourthwall.com/KCojgAUp0hzbz4va65HSIXD2PEzqxNvIf9tmvBCceyo/w:720/plain/https://storage.googleapis.com/cdn.fourthwall.com/offer/demo_products/demo_hoodie.png',
      title: 'Example product 2',
      price: '$50.00',
  },
  {
      image: 'https://imgproxy.fourthwall.com/eOKxJFTS0r5tkwjD0bzzbgKeOlV2oCt9MUEPMZ3RL6g/w:720/plain/https://storage.googleapis.com/cdn.fourthwall.com/offer/demo_products/demo_t-shirt.png',
      title: 'Example product 3',
      price: '$25.00',
  },
  {
      image: 'https://imgproxy.fourthwall.com/Ttq9mgaiwW1oI42HpIDWY3P4KIBC22RGo2NNB9a106w/w:720/plain/https://storage.googleapis.com/cdn.fourthwall.com/offer/demo_products/demo_mug.png',
      title: 'Example product 4',
      price: '$15.00',
  },
  {
    image: 'https://imgproxy.fourthwall.com/YMHcqXbGGZDyaKA9HndSawFKCRvS4zPel7nKo2OUvmI/w:720/plain/https://storage.googleapis.com/cdn.fourthwall.com/offer/demo_products/demo_water_bottle.png',
    title: 'Example product 1',
    price: '$18.00',
  },
  {
      image: 'https://imgproxy.fourthwall.com/KCojgAUp0hzbz4va65HSIXD2PEzqxNvIf9tmvBCceyo/w:720/plain/https://storage.googleapis.com/cdn.fourthwall.com/offer/demo_products/demo_hoodie.png',
      title: 'Example product 2',
      price: '$50.00',
  },
];


export default function FeaturedCollection() {
  return <div className="featured-collection">
    {Products.map((product, index) => (
        <div className="product-card" key={index}>
            <div className="product-image">
                <img src={product.image} alt={product.title} />
                <button className="see-more-button">See More</button>
            </div>
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">{product.price}</p>
        </div>
    ))}
  </div> 
}

