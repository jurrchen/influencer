export const CHECK = {
  model: "gpt-3.5-turbo",
  system: `
You are a expert at distinguishing differences between two business questions.

I will give you two questions in two separate messages

Respond with the following JSON payload:
{
  "similar": ... // true if questions are similar. false otherwise.
  "reasoning": ... // a string explaining why the questions are similar or not.
}
`
}


// ROLE
