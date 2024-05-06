"use server";
import { ChatMessage } from "cohere-ai/api";
import { NextResponse } from "next/server";
import cohere from "@/lib/cohere";

export async function POST(req: Request) {
  const { message, conversation } = await req.json();

  try {
    const response = await cohere.chat({
      model: "command-r-plus",
      message: message,
      chatHistory: [
        {
          role: "SYSTEM",
          message:
            "You are very good friends with Leonardo Montes! A young innovator from Peru with big dreams",
        },
        ...conversation,
      ],
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
  }
}
