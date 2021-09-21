import React from 'react';
import { 
	withRouter,
	Link, 
} from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Passwords from 'pages/SignUp/Passwords.jsx';
import {
	URL_PAGE_SIGN_UP,
	URL_PAGE_SIGN_IN,
} from 'consts/url.js';
import onSubmit from './onSubmit.js';

let Reset = ({ history }) => {
	const recaptchaRef = React.createRef();
	const [ state, setState ] = React.useState(() => ({
		password: '',
	}));
	const _onSubmit = React.useCallback((e) => onSubmit(e, setState, recaptchaRef, history.push), [
		setState,
		recaptchaRef,
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
						Обновите доступы
					</Typography>
					<form 
						noValidate 
						onSubmit={_onSubmit}>
						<Passwords password={state.password} />
						<Box my={3}>
							<ReCAPTCHA 
								sitekey={process.env.CAPTCHA_KEY}
								ref={recaptchaRef} />
						</Box>
						<Button
							fullWidth
							type="submit"
							variant="contained"
							color="primary">
							Подтвердить
						</Button>
					</form>
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
				Создать аккаунт
			</Typography>
		</Box>
		<Link to={URL_PAGE_SIGN_IN}>
			<Typography variant="body2">
				Вход
			</Typography>
		</Link>
	</Container>;
};

Reset = React.memo(withRouter(Reset));

export default Reset;
