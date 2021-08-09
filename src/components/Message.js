
export default function Message({text, date}) {
  return (
    <div className="bg-blue-300 text-white">
      {text}<br/>
      <pre>{date}</pre>
    </div>
  )
}