import TextField from '@material-ui/core/TextField';


const SelectUser = ({onSelect, onTextChange}) => {
  return (
    <form
      onSubmit={onSelect}
    >
      <TextField required id="standard-required" onChange={onTextChange} label="Required" placeholder="John Doe" />
      <button>Submit User</button>
    </form>
  )
}

export default SelectUser;