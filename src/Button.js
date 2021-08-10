
export default function Button({handleClick, children}) {
  return <button onClick={handleClick} className="shadow-md p-2 bg-green-100 font-semibold" >{children}</button>
}