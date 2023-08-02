import { WebsiteDefinition } from "../lib/types";

export const CONVO = {
  model: "gpt-3.5-turbo",
  user: (question: string) => (`
Question: ${question}
  `),
  context: (website: WebsiteDefinition) => (`
Memberships: (None)
Products: (None)
Website Widgets: 
  ${website.sections.map((w) => (`- ${w.widget}`)).join("\n")}
User Info: Doobydobap is a 24 year old recipe developer and food scientist living in Seoul Korea making videos of cooking Korean food.

`),
  system: `
###
Here is the structure of the user context:

Memberships:
  ...
Products:
  ...
Website Widgets:
  ...
User Info:

### 
Respond with
{
  "suggestion": ..., // keep the suggestion short
  "reasoning": ... // reason step by step
}
`
}


// ROLE