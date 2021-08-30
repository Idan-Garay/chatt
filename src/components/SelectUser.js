import socket from "../socket";

export default function SelectUser({ username, setIsUsernameSet }) {
  const onSubmit = (e) => {
    e.preventDefault();
    setIsUsernameSet(true);
    socket.connect();
    socket.auth = { username: username[0] };
  };

  const onTextChange = (e) => username[1](e.target.value);

  return (
    <div className="text-center mt-10">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="btn border-2 mx-1 rounded"
          value={username[0]}
          onChange={onTextChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
