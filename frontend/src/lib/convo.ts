import { Configuration, OpenAIApi } from 'openai';
import FAQ from '../data/faqs.json';
import { CHECK } from '../prompts/check';
import { MessageDirection } from '@chatscope/chat-ui-kit-react/src/types/unions';
import { CONVO } from '../prompts/convo';
import { WebsiteDefinition } from './types';
import { calculateCosineSimilarity } from './cosine';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  organization: import.meta.env.VITE_OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

export async function runConversation(
  question: string,
  website: WebsiteDefinition,
  appendMessage: (a: string, b: MessageDirection, s?: string) => void,
) {

  const { data } = await openai.createEmbedding({
    input: question,
    model: 'text-embedding-ada-002',
  });

  const { embedding } = data.data[0];

  const similarities = FAQ.map((f) => {
    return {
      faq: f.faq,
      context: f.context,
      similarity: calculateCosineSimilarity(embedding, f.embedding)
    };
  });

  // min cosine similarity
  similarities.sort((a, b) => {
    if (a.similarity > b.similarity) {
      return -1;
    } else if (a.similarity < b.similarity) {
      return 1;
    } else {
      return 0;
    }
  });

  // add more to prompt

  const mostSimilar = similarities[0];

  if (!mostSimilar) {
    throw new Error("FAIL")
  }

  const check = await openai.createChatCompletion({
    model: CHECK.model,
    messages: [
      {role: "system", content: CHECK.system},
      {role: "user", content: mostSimilar.faq},
      {role: "user", content: question}
    ],
  });

  const checkPayload = JSON.parse(check.data.choices[0].message?.content || '{}');

  appendMessage(`${mostSimilar.faq}`, "incoming")
  if (!checkPayload.similar) {
    appendMessage(JSON.stringify(checkPayload), "incoming")

    return "";
  }

  const convo = await openai.createChatCompletion({
    model: CONVO.model,
    messages: [
      {role: "system", content: mostSimilar.context},
      {role: "system", content: CONVO.system},
      {role: "user", content: CONVO.user(question)},
      {role: "user", content: CONVO.context(website)}
    ],
  });

  const convoPayload = convo.data.choices[0].message?.content || ''

  appendMessage(convoPayload, "incoming")
}
