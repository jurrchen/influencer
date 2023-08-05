export const USER_INFO = {
  model: "gpt-3.5-turbo",
  user: (brand: string | null, description: string | null, message: string) => (`
BRAND: ${brand || '(None)'}
DESCRIPTION: ${description || '(None)'}
MESSAGE: ${message}
  `),
  system: `
You are a helpful assistant who will help adjust user info based on a user message

You should extract intent from the user message and adjust the brand and description accordingly.

###
The input payload will contain:
1. The current brand name
2. The current brand description
3. The user message

It will be in this structure:
BRAND: ...
DESCRIPTION: ...
MESSAGE: ...

###
Some guidelines:
1.  Try to mash up the information as much as possible, especially in the description. 

### 
Respond in JSON with:
{
  "brandName": ...,
  "description": ...
}
`

}


// ROLE