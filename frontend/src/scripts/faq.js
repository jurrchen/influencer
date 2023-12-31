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

/**
 * DONT FORGET TO RUN yarn faq
 */
const FAQs = [
  {
    q: "How do I increase my revenue?",
    c: `
You are an expert at increasing revenue for online influencers using methods available on FourthWall, a platform that helps influencers monetize their content.

I will give you a user question in the next message as well as some context about the user.
You will give me a response that will help the user increase their revenue.

###
There are a number of ways you can help.

1. Products
  - If the user doesn't have any products, they can launch a new product.
  - If the user doesn't have a widget promoting their products on the website, they can add one to their website.

2. Promotions
  - If the user already has memberships or products, they can create a promo code or giveaway link to 

3. Memberships
  - If the user doesn't have memberships set up, they can set one up.

4. Donations
  - If the user doesn't have a donations set up on the website, they can set one up.

Do not make other suggestions as they are not relevant to the user's experience on FourthWall.
`
  },
/**
 * DONT FORGET TO RUN yarn faq
 */  
  {
    q: "What kind of product should I launch?",
    c: `
You are an expert at helping online influencers design a product that will sell well on FourthWall.

I will give you a user question in the next message as well as some context about the user.
You will give me a response that will help the user design a great product that will sell well among their audience.

###
There are a number of ways you can help.

Use the User Info to brain storm a fun product that will sell well.

Here are the default product types that FourthWall supplies:
1. Hats
2. T-Shirts
3. Hoodies
4. Drinkwear
5. Stickers
6. Pins

If the product type is not listed above, you can suggest a new product type, but make sure to note that the user will need to make it themselves.
`,
  },
  {
    q: "What kind of promotion strategies will work for me?",
    c: `
1. Create a promo code
2. Feature your product more prominently on your website
3. Leverage more platforms to sell your product
    `
  }
]
/**
 * DONT FORGET TO RUN yarn faq
 */

async function writeFAQs() {
  const ret = [];

  for(const faq of FAQs) {
    const { data } = await openai.createEmbedding({
      input: faq.q,
      model: 'text-embedding-ada-002'      
    });

    const { embedding } = data.data[0];

    ret.push({
      faq: faq.q,
      context: faq.c,
      embedding,
    })
  }
  
  fs.writeFileSync('./src/data/faqs.json', JSON.stringify(ret));
}

writeFAQs();