import React from "react";

const UserMessage = ({ message }: { message: string }) => {
  return (
    <div className="text-white bg-gray-600 ml-auto border border-zinc-700 rounded-3xl rounded-br-none w-fit p-3 my-2">
      {message}
    </div>
  );
};

export default UserMessage;
