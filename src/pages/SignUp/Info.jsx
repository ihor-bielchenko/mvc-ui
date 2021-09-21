import React from 'react';
import TextField from '@material-ui/core/TextField';

let SignUp = ({ email, name }) => {
	return <React.Fragment>
		<TextField
			required
			fullWidth
			error={Boolean(email)}
			id="email"
			name="email"
			autoComplete="email"
			label="Email адрес"
			variant="outlined"
			margin="normal"
			helperText={email} />
		<TextField
			required
			fullWidth
			error={Boolean(name)}
			id="name"
			name="name"
			label="Имя пользователя"
			variant="outlined"
			margin="normal"
			helperText={name} />
	</React.Fragment>;
};

SignUp = React.memo(SignUp);

export default SignUp;
