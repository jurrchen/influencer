import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai";

import { CLASSIFIER } from "../prompts/classifier";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import { GlobalSetters, GlobalsDelta, MembershipTier, Product, ProductWizard, Section, UserInfo, WebsiteDefinition } from "./types";
import { GLOBAL } from "../prompts/global";
import { EDITOR } from "../prompts/editor";
import { runConversation } from "./convo";
import { MEMBERSHIPS } from "../prompts/memberships";
import { PRODUCTS } from "../prompts/products";
import { THEME } from "../prompts/theme";
import { selectThemes } from "./themes";
import { PRODUCT_WIZARD } from "../prompts/product-wizard";
import { PRODUCT_WIZARD_CLASSIFIER } from "../prompts/product-wizard-classifier";
import { USER_INFO } from "../prompts/user-info";
import { selectBrandGuidelines } from "./brand";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  // organization: import.meta.env.VITE_OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);



function isCompleteProduct(p: ProductWizard) {
  return !!(p.type && p.title && p.colors && p.slogan);
}

async function productMessage(
  productWizardState: ProductWizard,  
  userInfo: UserInfo,
  //
  message: string, 
  //
  appendMessage: (a: string, b: MessageDirection, s?: string) => void,
  setWizardState: (s: string) => void,
  setProductWizardState: (s: ProductWizard) => void,
  setUserInfo: (u: UserInfo) => void,
  //
) {

  const classifier = await openai.createChatCompletion({
    model: PRODUCT_WIZARD_CLASSIFIER.model,
    messages: [
      {role: "system", content: PRODUCT_WIZARD_CLASSIFIER.system},
      {role: "user", content: PRODUCT_WIZARD_CLASSIFIER.user(message, isCompleteProduct(productWizardState))}
    ],
  });

  const classifierPayload = JSON.parse(classifier.data.choices[0].message?.content || '{}')
  console.warn(classifierPayload)

  appendMessage(classifierPayload.category, 'incoming', 'product-wizard')

  if (!classifierPayload.category) {
    appendMessage('error', 'incoming')
    throw new Error("fail")
  }  

  let brand = userInfo;
  if(classifierPayload.category === "user") {
    const wizard = await openai.createChatCompletion({
      model: USER_INFO.model,
      messages: [
        {role: "system", content: USER_INFO.system},
        {role: "user", content: USER_INFO.user(userInfo.brandName, userInfo.description, message)}
      ],
    });

    appendMessage(wizard.data.choices[0].message?.content || '{}', 'incoming', 'product-wizard')

    const payload = JSON.parse(wizard.data.choices[0].message?.content || '{}')

    appendMessage(JSON.stringify(payload, null, 2), 'incoming', 'product-wizard')

    setUserInfo({
      brandName: payload.brandName,
      description: payload.description,
    })
    brand = payload;
  }

  if (classifierPayload.category === "product" || classifierPayload.category === "user") {
    if(!brand.brandName || !brand.description) {
      appendMessage('Tell me a bit more about your brand', 'incoming', 'product-wizard')

      return null;
    }

    const topBrands = await selectBrandGuidelines(`${brand.brandName} ${brand.description}`, message)
    const candidates = topBrands.map((brand,) => {
      return { name: brand.category, description: brand.description, products: brand.guidelines.products};
    });

    const wizard = await openai.createChatCompletion({
      model: PRODUCT_WIZARD.model,
      messages: [
        {role: "system", content: PRODUCT_WIZARD.system},
        {role: "user", content: PRODUCT_WIZARD.user(message, userInfo, candidates)},
      ],
    });

    appendMessage(PRODUCT_WIZARD.user(message, userInfo, candidates), 'incoming')

    appendMessage(wizard.data.choices[0].message?.content || '{}', 'incoming', 'product-wizard')
    const payload = JSON.parse(wizard.data.choices[0].message?.content || '{}')

    if (payload.error) {
      appendMessage(payload.error, 'incoming', 'product-wizard')
      return null;
    }

    appendMessage(JSON.stringify(payload, null, 2), 'incoming', 'product-wizard')
    return null;
  }

  return null;


  // for each message, infer information and update the productWizardState

  // appendMessage("Tell me about yourself and your business.", 'incoming', 'product-wizard')


  // appendMessage(JSON.stringify(payload, null, 2), 'incoming', 'product-wizard')

  // // follow up messages

  // console.warn(payload);

  // return null;

}

async function membershipMessage(
  message: string, 
  appendMessage: (a: string, b: MessageDirection, s?: string) => void,
  setSections: (s: Section[]) => void,
  setMemberships: (m: MembershipTier[]) => void,
  setProducts: (p: Product[]) => void,
  setGlobals: GlobalSetters,
  setGlobalsBatch: (g: GlobalsDelta) => void,
  setWizardState: (s: string) => void,
  current: WebsiteDefinition,
  memberships: MembershipTier[],
  products: Product[],  
) {
}

async function rootMessage(
  message: string,
  appendMessage: (a: string, b: MessageDirection, s?: string) => void,
  setSections: (s: Section[]) => void,
  setMemberships: (m: MembershipTier[]) => void,
  setProducts: (p: Product[]) => void,
  setGlobals: GlobalSetters,
  setGlobalsBatch: (g: GlobalsDelta) => void,
  setWizardState: (s: string) => void,
  setProductWizardState: (s: ProductWizard) => void,  
  setUserInfo: (u: UserInfo) => void,
  // true state
  current: WebsiteDefinition,
  memberships: MembershipTier[],
  products: Product[],  
  userInfo: UserInfo,  
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

  if(payload.category === "product-wizard") {
    appendMessage('Okay. I can help with that!', 'incoming', payload.category)

    const empty = {
      type: null,
      title: null,
      colors: null,
      slogan: null,      
    }

    await setWizardState("product")
    await setProductWizardState(empty)

    await productMessage(
      empty,
      userInfo,
      message,
      appendMessage,
      setWizardState,
      setProductWizardState,
      setUserInfo,
    )

    return null;
  }

  if(payload.category === "membership-wizard") {
    appendMessage('Okay. I can help with that!', 'incoming', payload.category)

    await setWizardState("membership")
    return null;
  }
  
  appendMessage('NOT IMPLEMENTED', 'incoming', payload.category)
}

// TODO: make this a class
export default async function openAIMessage(
  // convo state
  wizardState: string | null,
  productWizardState: ProductWizard,
  //
  message: string, 
  // actions
  appendMessage: (a: string, b: MessageDirection, s?: string) => void,
  setSections: (s: Section[]) => void,
  setMemberships: (m: MembershipTier[]) => void,
  setProducts: (p: Product[]) => void,
  setGlobals: GlobalSetters,
  setGlobalsBatch: (g: GlobalsDelta) => void,
  setWizardState: (s: string) => void,
  setProductWizardState: (s: ProductWizard) => void,
  setUserInfo: (u: UserInfo) => void,
  // true state
  current: WebsiteDefinition,
  memberships: MembershipTier[],
  products: Product[],
  userInfo: UserInfo,
) {

  if (wizardState === "product") {
    return await productMessage(
      productWizardState,
      userInfo,
      message,
      appendMessage,
      setWizardState,
      setProductWizardState,
      setUserInfo
    );
  } else if (wizardState === "membership") {
    return await membershipMessage(
      message,
      appendMessage,
      setSections,
      setMemberships,
      setProducts,
      setGlobals,
      setGlobalsBatch,
      setWizardState,
      current,
      memberships,
      products,
    );
  } else {
    // TODO: actually fall through dangerous here?
    return await rootMessage(
      message,
      appendMessage,
      setSections,
      setMemberships,
      setProducts,
      setGlobals,
      setGlobalsBatch,
      setWizardState,
      setProductWizardState,
      setUserInfo,
      current,
      memberships,
      products,
      userInfo,
    )
  }
}
