"use server";

import { createStreamableValue } from "ai/rsc";
import OpenAI from "openai";

// Make sure your environment variable is set
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export const chat = async (_messages: { role: string; content: string }[]) => {
  const stream = createStreamableValue<string>();
  (async () => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: _messages,
        stream: true,
      });

      for await (const chunk of response) {
        const content = chunk.choices?.[0]?.delta?.content;
        if (content) stream.update(content);
      }
      stream.done();
    } catch (err) {
      console.error("OpenAI API error:", err);
      stream.update("Sorry, there was an error getting a response.");
      stream.done();
    }
  })();

  return { newMessage: stream.value };
};
