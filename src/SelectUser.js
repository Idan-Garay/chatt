import socket from './socket'

const SelectUser = ({username, onTextChange, onSelect}) => {

  return (
    <div>
      <form onSubmit={onSelect}>
        <input type="text" onChange={onTextChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default SelectUser;