import React from 'react';
import TextField from '@material-ui/core/TextField';

let Passwords = ({ password }) => {
	const error = Boolean(password);

	return <React.Fragment>
		<TextField
			required
			fullWidth
			error={error}
			id="password"
			name="password"
			type="password"
			label="Придумайте пароль"
			variant="outlined"
			margin="normal" />
		<TextField
			required
			fullWidth
			error={error}
			id="confirm_password"
			name="confirm_password"
			type="password"
			label="Повторите пароль"
			variant="outlined"
			margin="normal"
			helperText={password} />
	</React.Fragment>;
};

Passwords = React.memo(Passwords);

export default Passwords;
