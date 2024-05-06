import React from "react";

const ChatBotMessage = ({ message }: { message: string }) => {
  return (
    <div className="bg-gray-800 text-white w-fit border border-zinc-700 p-3 rounded-3xl rounded-bl-none my-2">
      {message}
    </div>
  );
};

export default ChatBotMessage;
