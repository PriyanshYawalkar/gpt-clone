"use server";

import { createStreamableValue } from "ai/rsc";
import { Message } from "@/components/chat-box";

export const chat = async (_messages: Message[]) => {
  console.log(_messages);

  const stream = createStreamableValue<string>();

  (async () => {
    const reply = "Sure! Here's the data you requested...";
    for (const char of reply) {
      await new Promise((r) => setTimeout(r, 20));
      stream.update(char);
    }
    stream.done();
  })();

  return { newMessage: stream.value };
};
