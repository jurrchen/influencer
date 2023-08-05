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

const BRANDS = [
  {
    "category": "Fitness Guru",
    "description": "Influencers who specialize in fitness, gym routines, and wellness.",
    "guidelines": {
      "products": "Gym wear (e.g., leggings, sports bras, tank tops), branded water bottles, resistance bands, protein powders.",
      "membershipTiers": "Basic (basic workout plans), Premium (advanced routines + nutrition), Elite (1-on-1 coaching, personalized plans)."
    }
  },
  {
    "category": "Tech Reviewer",
    "description": "Influencers focused on reviewing and showcasing tech products and gadgets.",
    "guidelines": {
      "products": "Branded tech accessories (e.g., phone cases, laptop stickers, earbuds), DIY tech kits.",
      "membershipTiers": "Basic (early video access), Advanced (ad-free content, Q&A sessions), Expert (exclusive reviews, beta testing opportunities)."
    }
  },
  {
    "category": "Gourmet Foodie",
    "description": "Influencers who cook, review restaurants, and showcase food trends.",
    "guidelines": {
      "products": "Recipe books, branded cooking utensils, gourmet food kits, branded water bottles",
      "membershipTiers": "Standard (exclusive recipes), Premium (virtual cooking classes), Platinum (monthly gourmet ingredient boxes, 1-on-1 culinary coaching)."
    }
  },
  {
    "category": "Eco-Warrior",
    "description": "Influencers advocating for environmental causes and green living.",
    "guidelines": {
      "products": "Reusable bags, eco-friendly household products, branded stainless steel straws.",
      "membershipTiers": "Green (eco-tip newsletters), Super Green (eco-friendly DIY projects, product discounts), Ultra Green (personalized sustainability plans, exclusive webinars)."
    }
  },
  {
    "category": "Fashion Trendsetter",
    "description": "Influencers who set or showcase the latest fashion trends.",
    "guidelines": {
      "products": "Exclusive clothing line drops, fashion accessories, digital look-books.",
      "membershipTiers": "Basic (seasonal fashion tips), Stylish (virtual styling sessions, early access to line drops), Elite (personal shopping assistance, exclusive meet-and-greets)."
    }
  },
  {
    "category": "Adventure Traveller",
    "description": "Influencers who travel to exotic locations and showcase travel tips, tricks, and locales.",
    "guidelines": {
      "products": "Branded travel gear (e.g., backpacks, travel pouches), photo presets, travel journals.",
      "membershipTiers": "Explorer (travel tips newsletter), Adventurer (exclusive travel videos, discounts on affiliated travel brands), Nomad (itinerary planning, 1-on-1 travel coaching)."
    }
  },
  {
    "category": "DIY Crafter",
    "description": "Influencers who specialize in crafting, DIY projects, and creative arts.",
    "guidelines": {
      "products": "DIY kits, crafting tools, digital tutorial booklets.",
      "membershipTiers": "Crafter (monthly DIY ideas), Artisan (exclusive crafting webinars, discount on products), Master (personalized project guidance, community features)."
    }
  },
  {
    "category": "Parenting Expert",
    "description": "Influencers who give advice on parenting, child care, and related topics.",
    "guidelines": {
      "products": "Branded child care products (e.g., bibs, baby carriers), e-books on parenting, children's storybooks.",
      "membershipTiers": "Parent (monthly parenting tips), Super Parent (webinars, product discounts), Ultimate Parent (personalized consultations, exclusive community forums)."
    }
  },
  {
    "category": "Personal Finance Coach",
    "description": "Influencers offering guidance on personal finance, investments, and budgeting.",
    "guidelines": {
      "products": "Financial planners, e-books on finance, budgeting apps/tools.",
      "membershipTiers": "Budgeter (monthly finance newsletters), Investor (investment tips, webinar access), Wealth Builder (1-on-1 finance coaching, exclusive tools)."
    }
  },
  {
    "category": "Esports Gamer",
    "description": "Influencers who play, review, or analyze video games, especially competitive esports titles.",
    "guidelines": {
      "products": "Branded gaming accessories (e.g., mousepads, headsets), exclusive in-game skins, merch (t-shirts, posters).",
      "membershipTiers": "Gamer (early video access), Pro Gamer (exclusive gameplay sessions, ad-free content), Elite Gamer (1-on-1 game coaching, tournament access)."
    }
  }
];

/**
 * DONT FORGET TO RUN yarn faq
 */

async function writeFAQs() {
  const ret = [];

  for(const brand of BRANDS) {
    const { data } = await openai.createEmbedding({
      input: `${brand.name} ${brand.description}`,
      model: 'text-embedding-ada-002'      
    });

    const { embedding } = data.data[0];

    ret.push({
      ...brand,
      embedding,
    })
  }
  
  fs.writeFileSync('./src/data/brands.json', JSON.stringify(ret));
}

writeFAQs();