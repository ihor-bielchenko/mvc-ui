import React from 'react';
import TextField from '@material-ui/core/TextField';
import { getLang } from 'components/Language';

let SignUp = ({ email, name }) => {
	return <React.Fragment>
		<TextField
			required
			fullWidth
			error={Boolean(email)}
			id="email"
			name="email"
			autoComplete="email"
			label={getLang('pageSigUpInfoEmail')}
			variant="outlined"
			margin="normal"
			helperText={email} />
		<TextField
			required
			fullWidth
			error={Boolean(name)}
			id="name"
			name="name"
			label={getLang('pageSigUpInfoName')}
			variant="outlined"
			margin="normal"
			helperText={name} />
	</React.Fragment>;
};

SignUp = React.memo(SignUp);

export default SignUp;
