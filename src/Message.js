
export default function Message({text}) {
  return (
    <div className="message p-2 rounded shadow-md w-40 bg-green-600 text-white mb-2">
      {text}
    </div>
  )
}