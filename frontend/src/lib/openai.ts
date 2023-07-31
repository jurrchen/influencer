import { Configuration, OpenAIApi } from "openai";

import { CLASSIFIER } from "../prompts/classifier";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import { ADDER } from "../prompts/adder";
import { Section } from "./types";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  organization: import.meta.env.VITE_OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

export default async function openAIMessage(
  message: string, 
  appendMessage: (a: string, b: MessageDirection) => void,
  appendSection: (s: Section) => void,
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
  
  if (payload.category === "adder") {
    const adder = await openai.createChatCompletion({
      model: ADDER.model,
      messages: [
        {role: "system", content: ADDER.system},
        {role: "user", content: message}
      ],
    });

    const adderPayload = JSON.parse(adder.data.choices[0].message?.content || '{}')

    await appendMessage(JSON.stringify(adderPayload, null, 2), 'incoming')

    if (!adderPayload.widget || adderPayload.widget === "unknown") {
      throw new Error("FAIL")
    }

    appendSection({sectionType: adderPayload.widget})

  } else {
    appendMessage('DUNNO HOMIE', 'incoming')
  }

}
