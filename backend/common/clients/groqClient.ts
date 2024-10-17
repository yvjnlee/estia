/* eslint-disable no-undef */
import { Groq } from 'groq-sdk';

export const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY as string,
});
