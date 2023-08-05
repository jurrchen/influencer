import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai";

import { CLASSIFIER } from "../prompts/classifier";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import { GlobalSetters, GlobalsDelta, MembershipTier, Product, Section, WebsiteDefinition } from "./types";
import { GLOBAL } from "../prompts/global";
import { EDITOR } from "../prompts/editor";
import { runConversation } from "./convo";
import { MEMBERSHIPS } from "../prompts/memberships";
import { PRODUCTS } from "../prompts/products";
import { THEME } from "../prompts/theme";
import { selectThemes } from "./themes";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  // organization: import.meta.env.VITE_OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

// TODO: make this a class
export default async function openAIMessage(
  message: string, 
  appendMessage: (a: string, b: MessageDirection, s?: string) => void,
  setSections: (s: Section[]) => void,
  setMemberships: (m: MembershipTier[]) => void,
  setProducts: (p: Product[]) => void,
  setGlobals: GlobalSetters,
  setGlobalsBatch: (g: GlobalsDelta) => void,
  current: WebsiteDefinition,
  memberships: MembershipTier[],
  products: Product[],
) {

  const classifier = await openai.createChatCompletion({
    model: CLASSIFIER.model,
    messages: [
      {role: "system", content: CLASSIFIER.system},
      {role: "user", content: message}
    ],
  });

  const payload = JSON.parse(classifier.data.choices[0].message?.content || '{}')

  if (!payload.category) {
    throw new Error("FAIL")
  }

  console.warn(payload);
  
  if (payload.category === "global") {
    const global = await openai.createChatCompletion({
      model: GLOBAL.model,
      messages: [
        {role: "system", content: GLOBAL.system},
        {role: "user", content: GLOBAL.user(message, current)}
      ],
    });

    const globalPayload = JSON.parse(global.data.choices[0].message?.content || '{}')
    console.warn(globalPayload)

    globalPayload.forEach((change: any) => {
      appendMessage(`Setting: ${change.setting} to ${change.value}`, 'incoming', 'globals')
      if (!change.setting) {
        appendMessage(`Failure: ${change}`, 'incoming', 'globals')
        return;
      }

      if (!change.value) {
        appendMessage(`No value specified: ${change}`, "incoming", 'globals')
        return;
      }

      if (change.setting === "font") {
        setGlobals.setFont(change.value)
        return;
      }

      if (change.setting === "backgroundColor") {
        setGlobals.setBackgroundColor(change.value)
        return;
      }

      if (change.setting === "fontColor") {
        setGlobals.setFontColor(change.value)
        return;
      }    
    })

    return null;
  }

  if(payload.category === "editor") {

    const editor = await openai.createChatCompletion({
      model: EDITOR.model,
      messages: [
        {role: "system", content: EDITOR.system},
        {role: "user", content: EDITOR.user(message, current.sections)}
      ],
    });

    const editorPayload = JSON.parse(editor.data.choices[0].message?.content || '{}')

    appendMessage(editorPayload.reasoning, 'incoming', 'editor');

    // gets in an array
    // and then spits out an array
    setSections(editorPayload.widgets)

    return null;
  }

  if(payload.category === "memberships") {

    const members = await openai.createChatCompletion({
      model: MEMBERSHIPS.model,
      messages: [
        {role: "system", content: MEMBERSHIPS.system},
        {role: "user", content: MEMBERSHIPS.user(message, memberships)}
      ],
    });

    const memberPayload = JSON.parse(members.data.choices[0].message?.content || '{}')

    console.warn(memberPayload);

    appendMessage(memberPayload.reasoning, 'incoming', 'memberships');    

    setMemberships(memberPayload.tiers)

    return null;
  }

  if (payload.category === "products") {
    const pp = await openai.createChatCompletion({
      model: PRODUCTS.model,
      messages: [
        {role: "system", content: PRODUCTS.system},
        {role: "user", content: PRODUCTS.user(message, products)}
      ],
    });

    const productsPayload = JSON.parse(pp.data.choices[0].message?.content || '{}')

    console.warn(productsPayload);

    appendMessage(productsPayload.reasoning, 'incoming', 'products');

    setProducts(productsPayload.products)

    return null;
  }

  if(payload.category === "convo") {
    
    await runConversation(message, current, appendMessage)

    return null;
  }

  if(payload.category === "theme") {

    const topThemes = await selectThemes(message)
    console.warn(JSON.stringify(current, null, 2))
    const candidates: {role: ChatCompletionRequestMessageRoleEnum, content: string }[] = topThemes.map((theme, i) => {
      console.warn(JSON.stringify(theme, null, 2))
      return {role: "user", content: THEME.theme(theme, `Candidate ${i+1}: ${theme.name}`, theme.description)}
    });
    
    const theme = await openai.createChatCompletion({
      model: PRODUCTS.model,
      messages: [
        {role: "system", content: THEME.system},
        {role: "user", content: THEME.theme(current, 'Existing settings', 'These are the current settings')},
        ...candidates,
        {role: "user", content: THEME.message(message)}
      ],
    });

    const themePayload = JSON.parse(theme.data.choices[0].message?.content || '{}')
    appendMessage(themePayload.reasoning, 'incoming', 'theme')

    setGlobalsBatch(themePayload)

    return null;
  }  
  
  appendMessage('NOT IMPLEMENTED', 'incoming')
}
