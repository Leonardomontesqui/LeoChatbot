"use server";
import { ChatMessage } from "cohere-ai/api";
import cohere from "../cohere";

export const generate = async (prompt: string, chatHistory: ChatMessage[]) => {
  try {
    const response = await cohere.chat({
      model: "command-r-plus",
      message: prompt,
      chatHistory: [
        {
          role: "SYSTEM",
          message:
            "You know Leonardo Montes very well. He is young innovator from Peru with big dreams.Leonardo is a hardworking individual with a lot of ambition. He is going into his second year of Computer Engineering at Queen's University",
        },
        ...chatHistory,
      ],
      connectors: [
        {
          id: "linkedin.com/in/leo-mont",
        },
      ],
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};
