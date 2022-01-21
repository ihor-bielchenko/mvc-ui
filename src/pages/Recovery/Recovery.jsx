import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { getLang } from 'components/Language';
import {
	URL_PAGE_SIGN_UP,
	URL_PAGE_SIGN_IN,
} from 'consts/url.js';
import onSubmit from './onSubmit.js';

let Recovery = () => {
	const [ state, setState ] = React.useState(() => ({
		success: false,
	}));
	const _onSubmit = React.useCallback((e) => onSubmit(e, setState), [
		setState,
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
						{getLang('pageRecovery')}
					</Typography>
					{state.success
						? <Box my={2}>
							<Typography>
								{getLang('pageRecoveryForEmail')}
							</Typography>
						</Box>
						: <form 
							noValidate 
							onSubmit={_onSubmit}>
							<TextField
								required
								fullWidth
								id="email"
								name="email"
								autoComplete="email"
								label="Email address"
								variant="outlined"
								margin="normal" />
							<Box my={4} />
							<Button
								fullWidth
								type="submit"
								variant="contained"
								color="primary">
								{getLang('pageRecoveryNext')}
							</Button>
						</form>}
				</Box>
			</Paper>
		</Box>
		<Box 
			mt={6} 
			mb={2}>
			<Typography 
				component={Link}
				to={URL_PAGE_SIGN_UP}
				variant="body2">
				{getLang('pageRecoveryCreate')}
			</Typography>
		</Box>
		<Link to={URL_PAGE_SIGN_IN}>
			<Typography variant="body2">
				{getLang('pageRecoverySignIn')}
			</Typography>
		</Link>
	</Container>;
};

Recovery = React.memo(Recovery);

export default Recovery;
