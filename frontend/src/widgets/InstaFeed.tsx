import "./InstaFeed.css";

const INSTAS = [
  {
    "image": "https://imgproxy.fourthwall.com/mVyC_7uFOCjLEj4ZPi1C15bTFNyr4b_8o7QwjqPMHc4/rs:fill:500:500/plain/https://storage.googleapis.com/popshopprod-shop-renderer-assets-q9gk7sc6/shop/social/instagram/images/284662292_414194563911654_6253572322912746688_n.jpg",
    "link": "https://www.instagram.com/p/CeNeCeavkQj-qB_33__zsLUlEpFweAV3Ggi3bQ0/"
  },
  {
    "image": "https://imgproxy.fourthwall.com/VagXQu75gyfsqPxaWKy2Fzl8RLXKIwMqEghJOWbFkKQ/rs:fill:500:500/plain/https://storage.googleapis.com/popshopprod-shop-renderer-assets-q9gk7sc6/shop/social/instagram/images/278509987_2713684355442849_8569319049548917881_n.webp",
    "link": "https://www.instagram.com/p/CcZptxNPRNrNMGuhxla509j1jU5zY4EKMY2JNU0/"
  },
  {
    "image": "https://imgproxy.fourthwall.com/QJqac24AlPWY76TW9aZ1McIsE3aP3AZqy7pA6dcBBhw/rs:fill:500:500/plain/https://storage.googleapis.com/popshopprod-shop-renderer-assets-q9gk7sc6/shop/social/instagram/images/271495381_118297694046557_6134251224057204294_n.jpg",
    "link": "https://www.instagram.com/p/CYiVLOelbz5gnie3yieRRQuHX6iAFuTZowgkCE0/"
  },
  {
    "image": "https://imgproxy.fourthwall.com/FY-NPGOT4xk9TB2ivJvN38aCPm-1JT41NeBpj4zWTAw/rs:fill:500:500/plain/https://storage.googleapis.com/popshopprod-shop-renderer-assets-q9gk7sc6/shop/social/instagram/images/70962021_451112695498453_7560401481455240155_n.jpg",
    "link": "https://www.instagram.com/p/B3YfUszF5s5770JFNGSyeD1eZF8jY8QBTIhcMc0/"
  },
  {
    "image": "https://imgproxy.fourthwall.com/8n2_cPq7nSIiXV0d_sHrCH4k8JVnDjGT3pUzEHFFR7E/rs:fill:500:500/plain/https://storage.googleapis.com/popshopprod-shop-renderer-assets-q9gk7sc6/shop/social/instagram/images/71525546_147554023119398_5116269395261704887_n.jpg",
    "link": "https://www.instagram.com/p/B21lXjLFvV4M_ewepr6Ie-RC3M8cZSVa2wr8A80/"
  },
  {
    "image": "https://imgproxy.fourthwall.com/Wljfsr2AUDwy1oxzU_BySVXciTde9GRXixQ-Tbktydc/rs:fill:500:500/plain/https://storage.googleapis.com/popshopprod-shop-renderer-assets-q9gk7sc6/shop/social/instagram/images/70331904_167316791056006_7807866758950912443_n.jpg",
    "link": "https://www.instagram.com/p/B2yz26cFV8IU1ED6Qwp6Eml-IbSF4HrXSboASA0/"
  }
]

const InstagramFeed = (props: {
  [key: string]: string
}) => {
  return (
    <div className="instagram-feed">
      <div className="instagram-header">
        <a href="https://www.instagram.com/yourInstagram/" target="_blank" rel="noopener noreferrer">
          <button>FOLLOW ON INSTAGRAM</button>
        </a>
      </div>
      <div className="instagram-posts">            
        {INSTAS.slice(0, parseInt(props.number_of_images)).map((post, index) => (
          <a key={index} href={post.link} target="_blank" rel="noopener noreferrer">
            <img src={post.image} alt="Instagram post" />
          </a>
        ))}
      </div>        
    </div>
  );
};

export default InstagramFeed;
