import { Configuration, OpenAIApi } from 'openai';
import { calculateCosineSimilarity } from "./cosine";
import BRANDS from '../data/brands.json';


const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  organization: import.meta.env.VITE_OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

export async function selectBrandGuidelines(
  description: string,
  messages: string,
) {
  const { data } = await openai.createEmbedding({
    input: `${description}`,
    model: 'text-embedding-ada-002',
  });

  const { embedding } = data.data[0];

  const similarities = BRANDS.map((brand) => {
    return {
      ...brand,
      embedding: [], // de-uglify
      similarity: calculateCosineSimilarity(embedding, brand.embedding)
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

  // top 3
  return similarities.slice(0, 3)

}