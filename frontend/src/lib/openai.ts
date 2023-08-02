import { Configuration, OpenAIApi } from "openai";

import { CLASSIFIER } from "../prompts/classifier";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import { GlobalSetters, Section, WebsiteDefinition } from "./types";
import { GLOBAL } from "../prompts/global";
import { EDITOR } from "../prompts/editor";
import { runConversation } from "./convo";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  organization: import.meta.env.VITE_OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

// TODO: make this a class
export default async function openAIMessage(
  message: string, 
  appendMessage: (a: string, b: MessageDirection) => void,
  setSections: (s: Section[]) => void,
  setGlobals: GlobalSetters,
  current: WebsiteDefinition,
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

  await appendMessage(JSON.stringify(payload, null, 2), 'incoming')
  
  if (payload.category === "global") {
    const global = await openai.createChatCompletion({
      model: GLOBAL.model,
      messages: [
        {role: "system", content: GLOBAL.system},
        {role: "user", content: GLOBAL.user(message, current)}
      ],
    });

    const globalPayload = JSON.parse(global.data.choices[0].message?.content || '{}')
    appendMessage(JSON.stringify(globalPayload, null, 2), 'incoming')

    globalPayload.forEach((change: any) => {
      appendMessage(`Setting: ${change.setting}`, 'incoming')
      if (!change.setting) {
        appendMessage(`Failure: ${change}`, 'incoming')
        return;
      }

      if (!change.value) {
        appendMessage(`No value specified: ${change}`, "incoming")
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

    appendMessage(JSON.stringify(editorPayload, null, 2), 'incoming')

    // gets in an array
    // and then spits out an array
    setSections(editorPayload.widgets)

    return null;
  }

  if(payload.category === "convo") {
    
    await runConversation(message, current, appendMessage)

    return null;
  }
  
  appendMessage('NOT IMPLEMENTED', 'incoming')
}
