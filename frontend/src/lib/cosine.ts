export function calculateCosineSimilarity(vectorA: number[], vectorB: number[]): number {
  if (vectorA.length !== vectorB.length) {
      throw new Error('Vectors must have the same length');
  }

  // Calculate dot product
  let dotProduct = 0;
  for (let i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
  }

  // Calculate magnitudes
  const magnitudeA = Math.sqrt(vectorA.reduce((acc, val) => acc + val ** 2, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((acc, val) => acc + val ** 2, 0));

  // Calculate cosine similarity
  const similarity = dotProduct / (magnitudeA * magnitudeB);

  return similarity;
}
