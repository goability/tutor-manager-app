import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime';


export type generator = {
  model: BedrockRuntimeClient;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
};

export default generator;
