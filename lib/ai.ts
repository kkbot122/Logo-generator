import Groq from "groq-sdk";
import { InferenceClient } from "@huggingface/inference";

// 1. LLM Client
export const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 2. Image Client
export const hf = new InferenceClient(process.env.HF_API_TOKEN);