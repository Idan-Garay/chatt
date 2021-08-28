import TextField from '@material-ui/core/TextField';

const SelectUser = ({username, onTextChange, onSelect}) => {
  return (
    <div className="select-username" style={{width: "300px", margin: "200px auto 0"}}>
      <form
        onSubmit={onSelect}
      >
        <TextField required id="standard-required" onChange={onTextChange} label="Required" placeholder="John Doe" />
        <button disabled={!(username.length > 2)}>Submit User</button>
      </form>
    </div>
  )
}

export default SelectUser;