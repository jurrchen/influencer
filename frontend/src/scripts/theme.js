import { Configuration, OpenAIApi } from "openai";

import { config } from 'dotenv';
config()

import fs from 'fs';

import process from "process";


const configuration = new Configuration({
  apiKey: process.env.VITE_OPENAI_API_KEY,
  organization: process.env.VITE_OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

const THEMES = [
  {
    "name": "Sleek Corporate",
    "description": "A clean, professional theme perfect for corporate websites or professional portfolios. The neutral palette suggests reliability, making it great for business-to-business interfaces.",
    "backgroundColor": "#F2F4F6",
    "font": "Roboto",
    "fontColor": "#333333",
    "ctaBackgroundColor": "#007BFF",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Retro Vibes",
    "description": "A nostalgic theme reminiscent of the '80s and '90s. Suitable for retro-themed stores, personal blogs, or any project wanting to capture a vintage feel.",
    "backgroundColor": "#FFDDAA",
    "font": "Pacifico",
    "fontColor": "#5C4742",
    "ctaBackgroundColor": "#FF6B6B",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Minimalist Monochrome",
    "description": "A crisp, monochromatic theme that emphasizes simplicity. Best for minimalist blogs, portfolios, and art galleries.",
    "backgroundColor": "#FFFFFF",
    "font": "Open Sans",
    "fontColor": "#000000",
    "ctaBackgroundColor": "#000000",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Tropical Paradise",
    "description": "A vibrant and lively theme reminiscent of a tropical getaway. Ideal for travel blogs, beach resorts, or any vacation-focused business.",
    "backgroundColor": "#E3FCEF",
    "font": "Dancing Script",
    "fontColor": "#056676",
    "ctaBackgroundColor": "#FF8C42",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Tech Noir",
    "description": "Inspired by futuristic cyberpunk aesthetics, this theme suits tech startups, gaming platforms, or any site seeking a modern, sci-fi look.",
    "backgroundColor": "#232834",
    "font": "Orbitron",
    "fontColor": "#B0B7C3",
    "ctaBackgroundColor": "#FF2079",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Warm & Cozy",
    "description": "A heartwarming theme that encapsulates the comforts of home. Great for personal blogs, cafes, or any business wanting a cozy, inviting feel.",
    "backgroundColor": "#FFF5E1",
    "font": "Cormorant Garamond",
    "fontColor": "#4A4A4A",
    "ctaBackgroundColor": "#D57358",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Edgy Darkmode",
    "description": "A stylish dark theme with muted color contrasts. Perfect for modern businesses, photographers, or anyone looking for a contemporary, moody vibe.",
    "backgroundColor": "#282828",
    "font": "Raleway",
    "fontColor": "#A9A9A9",
    "ctaBackgroundColor": "#FF4500",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Serene Wellness",
    "description": "Evoking a sense of peace and tranquility, this theme is perfect for wellness centers, yoga studios, and therapeutic services.",
    "backgroundColor": "#E0F2F1",
    "font": "Josefin Sans",
    "fontColor": "#3D5A80",
    "ctaBackgroundColor": "#98C1D9",
    "ctaFontColor": "#293241"
  },
  {
    "name": "Whimsical Fairytale",
    "description": "A magical theme capturing childlike wonder. Ideal for children's websites, toy stores, or any business aiming to appeal to a younger audience.",
    "backgroundColor": "#FFF7DC",
    "font": "Courgette",
    "fontColor": "#4B4441",
    "ctaBackgroundColor": "#FEC89A",
    "ctaFontColor": "#7B3E19"
  },
  {
    "name": "Urban Pulse",
    "description": "Capturing the essence of city life, this theme fits urban blogs, event platforms, or any business that thrives on the city's energetic pulse.",
    "backgroundColor": "#EAEAEA",
    "font": "Montserrat",
    "fontColor": "#4A4A4A",
    "ctaBackgroundColor": "#E63946",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Mystical Forest",
    "description": "A theme echoing the deep mysteries and calm of a forest. Great for eco-friendly businesses, nature bloggers, or woodland retreats.",
    "backgroundColor": "#DFF2D8",
    "font": "Baskervville",
    "fontColor": "#38543D",
    "ctaBackgroundColor": "#679436",
    "ctaFontColor": "#F5F5F5"
  },
  {
    "name": "Cosmic Voyage",
    "description": "Transport your audience to outer space with this starry theme. Ideal for astronomy blogs, planetariums, or sci-fi bookstores.",
    "backgroundColor": "#2E294E",
    "font": "Stardos Stencil",
    "fontColor": "#D9D872",
    "ctaBackgroundColor": "#F25C54",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Bohemian Art",
    "description": "Celebrate creativity and free spirit with this bohemian theme. Great for art studios, indie musicians, or handcrafted jewelry stores.",
    "backgroundColor": "#FEF9EB",
    "font": "Permanent Marker",
    "fontColor": "#774F38",
    "ctaBackgroundColor": "#E98074",
    "ctaFontColor": "#F2EAE4"
  },
  {
    "name": "Nautical Breeze",
    "description": "A theme inspired by the open sea. Suitable for sailing clubs, seafood restaurants, or marine conservation blogs.",
    "backgroundColor": "#D6EAF8",
    "font": "Saira Stencil One",
    "fontColor": "#2E4057",
    "ctaBackgroundColor": "#1F77B4",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Gothic Elegance",
    "description": "A dark and refined theme channeling gothic beauty. Perfect for alternative fashion blogs, history podcasts, or antique shops.",
    "backgroundColor": "#2B2B2D",
    "font": "Cinzel",
    "fontColor": "#B5A9A7",
    "ctaBackgroundColor": "#965D62",
    "ctaFontColor": "#F5ECEC"
  },
  {
    "name": "Sunset Safari",
    "description": "Channel the majestic landscapes of the savannah with warm hues. Ideal for wildlife photographers, adventure travel blogs, or safari lodges.",
    "backgroundColor": "#FFE8D6",
    "font": "Changa",
    "fontColor": "#A66634",
    "ctaBackgroundColor": "#D64513",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Digital Denim",
    "description": "A modern twist on a classic fabric texture, this theme fits urban fashion blogs, e-commerce apparel sites, or denim enthusiasts.",
    "backgroundColor": "#3A506B",
    "font": "Oswald",
    "fontColor": "#EAE7DC",
    "ctaBackgroundColor": "#1C7293",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Frosty Mint",
    "description": "Cool, refreshing, and modern – this theme is great for spa websites, beauty blogs, or artisanal mint candy shops.",
    "backgroundColor": "#E3F9F1",
    "font": "Poppins",
    "fontColor": "#2B5656",
    "ctaBackgroundColor": "#17A299",
    "ctaFontColor": "#F7FFF7"
  },
  {
    "name": "Harvest Gold",
    "description": "Embodying the rich colors of autumn harvest, this theme is suited for organic farms, autumn festivals, or homemade pie shops.",
    "backgroundColor": "#FFF5DA",
    "font": "Amatic SC",
    "fontColor": "#7E5917",
    "ctaBackgroundColor": "#E59500",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Bridal Blush",
    "description": "Soft, romantic hues perfect for wedding planners, bridal boutiques, or any business connected to romantic events.",
    "backgroundColor": "#FEF2F2",
    "font": "Tangerine",
    "fontColor": "#7D5A5A",
    "ctaBackgroundColor": "#FFB6C1",
    "ctaFontColor": "#5E3030"
  },
  {
    "name": "Jazz Age",
    "description": "Evoke the roaring twenties with a theme that's perfect for jazz clubs, vintage fashion, or any business wanting to channel the energy of the Jazz Age.",
    "backgroundColor": "#FAE3D9",
    "font": "Playfair Display",
    "fontColor": "#5E320F",
    "ctaBackgroundColor": "#B6472E",
    "ctaFontColor": "#F4E1D2"
  },
  {
    "name": "Winter Wonderland",
    "description": "Capture the serene beauty of snowfall. This theme is ideal for ski resorts, winter apparel, or events taking place in the colder months.",
    "backgroundColor": "#DEF2F1",
    "font": "Quicksand",
    "fontColor": "#394240",
    "ctaBackgroundColor": "#3CAEA3",
    "ctaFontColor": "#F6F6F6"
  },
  {
    "name": "Desert Mirage",
    "description": "Channel the vastness and beauty of the desert. Suited for desert tour operators, southwestern boutiques, or anything inspired by arid landscapes.",
    "backgroundColor": "#FFF5E1",
    "font": "Kalam",
    "fontColor": "#A57C65",
    "ctaBackgroundColor": "#E88413",
    "ctaFontColor": "#FFF8E7"
  },
  {
    "name": "Industrial Chic",
    "description": "A theme capturing the essence of raw, exposed craftsmanship. Perfect for modern lofts, bespoke furniture makers, or urban photographers.",
    "backgroundColor": "#3B3B3D",
    "font": "Anton",
    "fontColor": "#C9D1D3",
    "ctaBackgroundColor": "#F9AA33",
    "ctaFontColor": "#29292B"
  },
  {
    "name": "Mediterranean Blues",
    "description": "Reflecting the blue seas and skies of the Mediterranean, suitable for seaside resorts, Greek taverns, or travel bloggers focused on coastal Europe.",
    "backgroundColor": "#E1F5FE",
    "font": "Philosopher",
    "fontColor": "#01477A",
    "ctaBackgroundColor": "#0277BD",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Forest Dawn",
    "description": "Early morning in a serene forest is captured in this theme. Best for nature retreats, mindfulness blogs, or woodland conservation projects.",
    "backgroundColor": "#E4F9E8",
    "font": "Cedarville Cursive",
    "fontColor": "#425847",
    "ctaBackgroundColor": "#81B622",
    "ctaFontColor": "#F3FFF3"
  },
  {
    "name": "Midnight City",
    "description": "Embrace the allure of the city under the moonlight. Ideal for nightlife promoters, urban event venues, or cityscape photographers.",
    "backgroundColor": "#242526",
    "font": "Electrolize",
    "fontColor": "#B1B2B5",
    "ctaBackgroundColor": "#5865F2",
    "ctaFontColor": "#E5E5E5"
  },
  {
    "name": "Pastel Dream",
    "description": "Soft, dreamy colors that evoke a sense of calm and creativity. Great for craft blogs, baby clothing stores, or patisseries.",
    "backgroundColor": "#FFF0F5",
    "font": "Dawning of a New Day",
    "fontColor": "#A397B2",
    "ctaBackgroundColor": "#FFB7C5",
    "ctaFontColor": "#5A3D55"
  },
  {
    "name": "Mountain Retreat",
    "description": "Channel the solitude and majesty of the mountains. Perfect for mountain lodges, hiking blogs, or adventure equipment stores.",
    "backgroundColor": "#EAF2EF",
    "font": "Arimo",
    "fontColor": "#4D4F56",
    "ctaBackgroundColor": "#1A5276",
    "ctaFontColor": "#F0F3F4"
  },
  {
    "name": "Lavish Gold",
    "description": "A luxurious theme exuding opulence. Ideal for high-end boutiques, jewelry stores, or premium event planners.",
    "backgroundColor": "#FEF3E0",
    "font": "Marcellus SC",
    "fontColor": "#8A5B39",
    "ctaBackgroundColor": "#D4AC0D",
    "ctaFontColor": "#FFF5E1"
  },
  {
    "name": "Tropical Paradise 2",
    "description": "Evokes the sun-kissed beaches and clear turquoise waters of the tropics. Perfect for beach resorts, tropical travel bloggers, or summer product stores.",
    "backgroundColor": "#E0FEFE",
    "font": "Pacifico",
    "fontColor": "#05668D",
    "ctaBackgroundColor": "#02C39A",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Elegant Ebony",
    "description": "Channel the minimalist beauty of dark, sleek design. Suitable for upscale dining, luxury car brands, or contemporary art galleries.",
    "backgroundColor": "#2C2C2E",
    "font": "Josefin Sans",
    "fontColor": "#BFBFC1",
    "ctaBackgroundColor": "#E76F51",
    "ctaFontColor": "#F5F5F5"
  },
  {
    "name": "Vivid Vignette",
    "description": "A vibrant, color-packed theme that screams energy. Great for creative agencies, animation studios, or pop-art galleries.",
    "backgroundColor": "#FFFEF5",
    "font": "Chilanka",
    "fontColor": "#FF4F58",
    "ctaBackgroundColor": "#FFCA3A",
    "ctaFontColor": "#333333"
  },
  {
    "name": "Orchard Fresh",
    "description": "Embody the crispness of freshly picked fruits. Ideal for farmers' markets, organic food blogs, or health-focused eateries.",
    "backgroundColor": "#F3F8F2",
    "font": "Raleway",
    "fontColor": "#4A7254",
    "ctaBackgroundColor": "#68A691",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Steampunk Saga",
    "description": "An amalgamation of the Victorian era with steam-powered tech aesthetics. Perfect for novelists, alternate history forums, or vintage clockmakers.",
    "backgroundColor": "#F4E8D5",
    "font": "Special Elite",
    "fontColor": "#684A23",
    "ctaBackgroundColor": "#B68D4C",
    "ctaFontColor": "#FFFFFF"
  },
  {
    "name": "Aurora Dreams",
    "description": "Channel the mesmerizing beauty of the Northern Lights. Suitable for holistic retreats, nature photographers, or ambient music creators.",
    "backgroundColor": "#373B44",
    "font": "Quattrocento Sans",
    "fontColor": "#89A7A7",
    "ctaBackgroundColor": "#78E0D3",
    "ctaFontColor": "#1D1E22"
  },
  {
    "name": "Café Noir",
    "description": "Immerse in the comforting aromas and hues of a Parisian café. Ideal for coffee shops, bookstores, or intimate gig venues.",
    "backgroundColor": "#3E2723",
    "font": "Petit Formal Script",
    "fontColor": "#F7DDC7",
    "ctaBackgroundColor": "#854442",
    "ctaFontColor": "#F5E1D7"
  },
  {
    "name": "Space Odyssey",
    "description": "A leap into the vastness of the cosmos. Perfect for tech startups, science blogs, or space exploration enthusiasts.",
    "backgroundColor": "#1C1D33",
    "font": "Orbitron",
    "fontColor": "#8D8DB8",
    "ctaBackgroundColor": "#7266BA",
    "ctaFontColor": "#F5F5F5"
  },
  {
    "name": "Retro Radiance",
    "description": "A nod to the 70s and 80s, capturing the era's unmistakable charm. Suitable for vintage stores, classic film forums, or retro game shops.",
    "backgroundColor": "#FDFD96",
    "font": "Press Start 2P",
    "fontColor": "#FF6B6B",
    "ctaBackgroundColor": "#FF952D",
    "ctaFontColor": "#1A1A1D"
  },
  {
    "name": "Zen Serenity",
    "description": "Embrace the calmness of Zen gardens and eastern meditation. Ideal for yoga studios, mindfulness apps, or tea houses.",
    "backgroundColor": "#FEFCEA",
    "font": "Sawarabi Mincho",
    "fontColor": "#595B56",
    "ctaBackgroundColor": "#A8D5BA",
    "ctaFontColor": "#3F403E"
  }
]


/**
 * DONT FORGET TO RUN yarn faq
 */

async function writeFAQs() {
  const ret = [];

  for(const theme of THEMES) {
    if (theme.embedding) {
      continue;
    }

    const { data } = await openai.createEmbedding({
      input: theme.description,
      model: 'text-embedding-ada-002'      
    });

    const { embedding } = data.data[0];

    ret.push({
      ...theme,
      embedding,
    })
  }
  
  fs.writeFileSync('./src/data/themes.json', JSON.stringify(ret));
}

writeFAQs();