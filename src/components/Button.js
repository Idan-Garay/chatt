
export default function Button ({handleClick, children}) {
  return (<Button onClick={handleClick}>{...children}</Button>)
}