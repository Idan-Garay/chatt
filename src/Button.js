
export default function Button({handleClick, children}) {
  return <button onClick={handleClick} className="shadow-md px-4 py-2 rounded bg-green-100 font-semibold" >{children}</button>
}