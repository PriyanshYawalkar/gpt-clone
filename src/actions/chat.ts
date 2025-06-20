"use server";

import { createStreamableValue } from "ai/rsc";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";

// Make sure your environment variable is set
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export const chat = async (_messages: ChatCompletionMessageParam[]) => {
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
      stream.update(
        "Sorry, our API credit limit is over please create an .env file with OPENAI_API_KEY and add your API key."
      );
      stream.done();
    }
  })();

  return { newMessage: stream.value };
};
