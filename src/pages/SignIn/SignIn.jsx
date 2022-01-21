import React from 'react';
import { 
	withRouter,
	Link, 
} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { getLang } from 'components/Language';
import {
	URL_PAGE_SIGN_UP,
	URL_PAGE_RECOVERY,
} from 'consts/url.js';
import onSubmit from './onSubmit.js';

let SignIn = ({ history }) => {
	const _onSubmit = React.useCallback((e) => onSubmit(e, history.push), [
		history.push,
	]);

	return <Container maxWidth="xs">
		<Box mt={6}>
			<Paper variant="outlined">
				<Box 
					p={2}
					align="center">
					<Typography 
						component="h1" 
						variant="h5"
						align="center">
						{getLang('pageSigIn')}
					</Typography>
					<form 
						noValidate 
						onSubmit={_onSubmit}>
						<TextField
							required
							fullWidth
							id="email"
							name="email"
							autoComplete="email"
							label="Email адрес"
							variant="outlined"
							margin="normal" />
						<TextField
							required
							fullWidth
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							label={getLang('pageSigInPassword')}
							variant="outlined"
							margin="normal" />
						<FormControlLabel
							control={<Checkbox
							name="remember"
							value="remember"
							color="primary" />}
							label={getLang('pageSigInRemember')} />
						<Box my={4} />
						<Button
							fullWidth
							type="submit"
							variant="contained"
							color="primary">
							{getLang('pageSigIn2')}
						</Button>
					</form>
				</Box>
			</Paper>
		</Box>
		<Box mt={6} mb={2}>
			<Typography 
				component={Link}
				to={URL_PAGE_SIGN_UP}
				variant="body2">
				{getLang('pageSigInCreate')}
			</Typography>
		</Box>
		<Link to={URL_PAGE_RECOVERY}>
			<Typography variant="body2">
				{getLang('pageSigInRecovery')}
			</Typography>
		</Link>
	</Container>;
};

SignIn = withRouter(SignIn);
SignIn = React.memo(SignIn);

export default SignIn;
