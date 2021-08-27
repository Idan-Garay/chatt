import TextField from "@material-ui/core/TextField"
import { useState } from "react";
import SelectUser from "./SelectUser";
import socket from './socket';

const App = () => {
	const [isUserSelected, setIsUserSelected] = useState(false);
	const [username, setUsername] = useState('');

	const onUsernameSelection = (username) => {
		setIsUserSelected(true);
		socket.auth = {username: username}
	}

	return (
		<div>
			<SelectUser onSelect={onUsernameSelection}/>
		</div>
	)
}

export default App;