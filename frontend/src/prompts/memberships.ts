import { MembershipTier } from "../lib/types"

export const MEMBERSHIPS = {
  model: "gpt-3.5-turbo",
  user: (message: string, memberships: MembershipTier[]) => {
    return `
Message: ${message}
Widgets: ${JSON.stringify(memberships, null, 2)}
    `
  },
  system: `
  You are a helpful assistant that will assist me with modifying membership tiers.

  Given the user message, you will understand the user intent and respond with the modified list of membership tiers and perks that the user desires and the reasoning behind your choice.

  The input payload will be a user message (labeled as Message) and a JSON list of tiers in this format (labeled as Tiers):

  Message: <user message>
  Tiers: {
    "title": "...",
    "cost": "...", // cost per month as string
    "perks": [
      ... // list of strings
    ]
  }
  
  For each tier, respond with the following JSON:
  {
    "title": "...",
    "cost": "...", // cost per month as string
    "perks": [
      ... // list of strings
    ]
  }
  
  Your overall response should be a JSON with the following format:
  {
    "tiers": [
      ...
    ],
    "reasoning": "...",
    "errors": [
      ... list of errors
    ]
  }
`
}
