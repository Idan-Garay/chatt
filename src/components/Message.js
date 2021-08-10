
export default function Message({text, date}) {
  return (
    <div className="
                    flex justify-end
                    px-2 pb-2
                    ">
      <div className="h-auto w-1/4 bg-blue-400 
                      w-100 rounded mt-2 p-2
                      text-right text-white
                      ">
        {text}<br/>
        <pre>{date}</pre>
      </div>
    </div>
  )
}