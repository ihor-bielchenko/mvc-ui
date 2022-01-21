import React from 'react';
import TextField from '@material-ui/core/TextField';
import { getLang } from 'components/Language';

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
			label={getLang('pageSigUpPasswordCreate')}
			variant="outlined"
			margin="normal" />
		<TextField
			required
			fullWidth
			error={error}
			id="confirm_password"
			name="confirm_password"
			type="password"
			label={getLang('pageSigUpPasswordRepeat')}
			variant="outlined"
			margin="normal"
			helperText={password} />
	</React.Fragment>;
};

Passwords = React.memo(Passwords);

export default Passwords;
