"use client";

import ChatBotMessage from "@/app/components/ChatBotMessage";
import UserMessage from "@/app/components/UserMessage";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "cohere-ai/api";
import { ArrowBottomRightIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/app/components/Modal";

export default function Home() {
  const bottomOfConversation = useRef<HTMLDivElement | null>(null);
  const [number, setNumber] = useState(0);

  const handleClick = (increment: number) => {
    const updatedNumber = number + increment;

    if (updatedNumber >= 0 && updatedNumber <= 10) {
      setNumber(updatedNumber);
    } else if (updatedNumber < 0) {
      setNumber(0);
    } else {
      setNumber(10);
    }
  };

  // interface ChatMessage { We no longer need this as the cohere api has defined its own ChatMessage type
  //   role: string;
  //   message: string;
  // }

  const [conversation, setConversation] = useState<ChatMessage[]>([
    { role: "CHATBOT", message: "Hey, what would you like to know about Leo?" },
    // { role: "USER", message: "I need to fix my tiresssssss" },
  ]);

  useEffect(() => {
    bottomOfConversation.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const [prompt, setPrompt] = useState<string>("");

  const handlePrompt = async (prompt: string) => {
    setConversation((prev) => [...prev, { role: "USER", message: prompt }]);
    setPrompt("");

    const responseData = await fetch("/api/cohere-generate", {
      //we are sending in this information to fetch a response from the api
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt, conversation }),
    });

    const response = await responseData.json();

    setConversation((prev) => [
      ...prev,
      {
        role: "CHATBOT",
        message: response.text,
      },
    ]);
  };

  return (
    <main className="bg-gray-950 flex flex-col items-center justify-end text-white h-screen">
      <div className="absolute top-0 flex justify-between bg-gray-900 w-full max-w-[900px] rounded-b-lg border border-zinc-700">
        <h1 className="p-5">Learn about Leo</h1>
        <div className="flex p-5 gap-2">
          <h2>Rate this website</h2>
          <button onClick={() => handleClick(-1)}>-</button>
          <p className="w-4">{number}</p>
          <button onClick={() => handleClick(1)}>+</button>
        </div>
      </div>
      <div className="flex flex-col h-auto w-full max-w-[900px] overflow-y-scroll">
        {conversation.map((item, i) =>
          item.role === "CHATBOT" ? (
            <ChatBotMessage key={i} message={item.message} />
          ) : (
            <UserMessage key={i} message={item.message} />
          )
        )}
        <div ref={bottomOfConversation} />
      </div>
      <div className="flex flex-col justify-end pb-5 gap-2 w-full max-w-[900px] items-center">
        <div className="flex justify-center rounded-full p-2 gap-4 border border-zinc-700 bg-gray-900 w-[80%] text-white">
          <input
            className="w-[90%] bg-gray-900 outline-none"
            type="text"
            placeholder="Why is Leo so cool?"
            value={prompt} //the value of prompt gets reset in handleprompt
            onChange={(e) => setPrompt(e.target.value)} //changing the value of prompt
            onKeyDown={(e) => (e.key === "Enter" ? handlePrompt(prompt) : null)} //sending that new value of prompt to handle prompt. This and the button have the same functionality
          />
          <button className="" onClick={() => handlePrompt(prompt)}>
            <PaperPlaneIcon />
          </button>
        </div>
        <div>
          <Dialog>
            <DialogTrigger className="border border-zinc-700 p-2 px-3 bg-gray-900 rounded-full text-zinc-100">
              More about Leo
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="pb-1 text-gray-700">
                  Leonardo Montes Quiliche
                </DialogTitle>
                <DialogDescription className="flex">
                  <p className="pr-5 text-justify">
                    Leonardo is an aspiring software engineer who looks to
                    create products with a positive impact in his community. He
                    is currently earning his bachelors degree in Computer
                    Engineering at Queen&apos;s University. Additionally, he is
                    the incoming Director of External Relations at Canada&apos;s
                    premier organization on Artificial Intelligence,{" "}
                    <a
                      href="https://qmind.ca/"
                      target="none"
                      className="text-gray-700 underline"
                    >
                      QMIND
                    </a>
                    . Leonardo is a hardworker, ambitious, and a change maker.
                  </p>
                  <div>
                    <img
                      src="/assets/me.jpeg"
                      className="border border-gray-200 rounded-md"
                      alt="Picture of me"
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}
