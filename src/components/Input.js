export default function Input() {
  return (
    <form className="border-2 flex justify-center h-auto bg-green-100 h-auto">
      <input type="text" className="border-1 w-3/4" />
      <button className="w-20 bg-blue-200 p-1 ml-3">Send</button>
    </form>
  );
}
