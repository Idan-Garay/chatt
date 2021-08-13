
import Channel from "./Channel"

export default function Chat({sender, receiver}) {
  return (
    <div className=" h-5/6 rounded  mx-20 mt-3 border-green-900 border-t-2 bg-opacity-95" >
      <Channel sender={sender} receiver={receiver} />
    </div>
  )
}