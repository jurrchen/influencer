import { GlobalsDelta } from "../lib/types"

export const THEME = {
  model: "gpt-3.5-turbo",
  theme: (theme: GlobalsDelta, name: string, description: string) => (`
  NAME: ${name}
  DESCRIPTION: ${description}
  SETTINGS: 
  {
    backgroundColor: ${theme.backgroundColor},
    font: ${theme.font},
    fontColor: ${theme.fontColor},
    ctaBackground: ${theme.ctaBackgroundColor},
    ctaFontColor: ${theme.ctaFontColor}
  }  
`),
  message: (message: string) => (`MESSAGE: ${message}`),
  system: `
  You are a helpful assistant that will assist me with modifying the theme for my website.

  ########

  Each theme has the following settings
  - backgroundColor: (string) The background color of the website
  - font: (string) The font used for the website. It is a Google font.
  - fontColor: (string) The main font color of the website
  - ctaBackground: (string) The background color used for call to actions (any buttons)
  - ctaColor: (string) The font color used for call to actions (any buttons)

  This will be provided in the following format:

  NAME: ... // (string) name of the theme
  DESCRIPTION: ... // (string) description of the theme
  SETTINGS: 
  {
    backgroundColor: ...,
    font: ...,
    fontColor: ...,
    ctaBackground: ...,
    ctaFontColor: ...    
  }

  ########

  I will provide the existing theme, some candidate themes, and the user message.

  Your goal is to understand the intent of the user message and choose the settings for a theme such that it matches the user intent.
  Consider the candidate themes, including whether the description of the theme matches the user message.
  If necessary, you can mix and match 

  ########

  Some pointers:
  1. Make sure the call to action background color contrasts with the call to action font color
  2. All colors must be a hex string representing the color like "#FFFFFF"

  ########

  Respond only with the following JSON:
  
  {
    "backgroundColor": "...",
    "font": "...",
    "fontColor": "...",
    "ctaBackgroundColor": "...",
    "ctaFontColor": "...",
    "reasoning": "..."
  }
`
}
