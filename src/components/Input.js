import { useState } from "react";

export default function Input({ user, content, setContent, onSubmit }) {
  const onTextChange = (e) => setContent(e.target.value);

  return (
    <form
      onSubmit={onSubmit}
      className="border-2 flex justify-center h-auto bg-green-100 h-auto"
    >
      <input type="text" className="border-1 w-3/4" onChange={onTextChange} />
      <button className="w-20 bg-blue-200 p-1 ml-3">Send</button>
    </form>
  );
}
