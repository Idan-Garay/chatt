// import TextField from "@material-ui/core/TextField"
import { useEffect, useState } from "react";
import SelectUser from "./SelectUser";
import socket from './socket';
import Chat from './Chat';

const App = () => {
	const [isUserSelected, setIsUserSelected] = useState(false);
	const [username, setUsername] = useState('');

	const onUsernameSelection = (username) => {
		setIsUserSelected(true);
		socket.auth = {username};
		socket.connect();
	}

	useEffect(() => {
		socket.on("connect_error", (err) => {
			if (err.message === "invalid username") {
				setIsUserSelected(false)
			}
		});

		return () => socket.off('connect_error');
	})

	return (
		<div className="app">
			{!isUserSelected
				?<SelectUser username={username} onSelect={onUsernameSelection} onTextChange={e => setUsername(e.target.value)} />
				:<Chat />
			}

		</div>
	)
}

export default App;