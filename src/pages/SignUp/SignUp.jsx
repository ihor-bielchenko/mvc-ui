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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grid from '@material-ui/core/Grid';
import Info from './Info.jsx';
import Passwords from './Passwords.jsx';
import onNext from './onNext.js';
import onBack from './onBack.js';
import { 
	URL_PAGE_SIGN_IN,
	URL_PAGE_RECOVERY,
} from 'consts/url.js';
import onSubmit from './onSubmit.js';

let SignUp = ({ history }) => {
	const recaptchaRef = React.createRef();
	const [ state, setState ] = React.useState(() => ({
		activeStep: 0,
		email: '',
		name: '',
		password: '',
	}));
	const _onNext = React.useCallback((...rest) => onNext(...rest, setState), [
		setState,
	]);
	const _onBack = React.useCallback((...rest) => onBack(...rest, setState), [
		setState,
	]);
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
						Регистрация
					</Typography>
					<Stepper activeStep={state.activeStep}>
						<Step>
							<StepLabel>
								Данные
							</StepLabel>
						</Step>
						<Step>
							<StepLabel>
								Пароль
							</StepLabel>
						</Step>
					</Stepper>
					<form 
						noValidate 
						onSubmit={_onSubmit}>
						<Box 
							display={state.activeStep === 0 
								? 'block' 
								: 'none'}>
							<Info
								email={state.email}
								name={state.name} />
						</Box>
						<Box 
							display={state.activeStep === 1 
								? 'block' 
								: 'none'}>
							<Passwords password={state.password} />
							<Box mt={1} />
							<ReCAPTCHA 
								sitekey={process.env.CAPTCHA_KEY}
								ref={recaptchaRef} />
						</Box>
						<Box my={4} />
						<Grid 
							container
							display="flex"
							justifyContent="space-between">
							<Button
								disabled={state.activeStep === 0}
								onClick={_onBack}
								variant="contained"
								color="primary">
								Назад
							</Button>
							{state.activeStep === 0
								? <Button
									onClick={_onNext}
									variant="contained"
									color="primary">
									Далее
								</Button>
								: <Button
									type="submit"
									variant="contained"
									color="primary">
									Создать
								</Button>}
						</Grid>
					</form>
				</Box>
			</Paper>
		</Box>
		{/*TODO: to separate component*/}
		<Box mt={6} mb={2}>
			<Typography 
				component={Link}
				to={URL_PAGE_SIGN_IN}
				variant="body2">
				Вход
			</Typography>
		</Box>
		<Link to={URL_PAGE_RECOVERY}>
			<Typography variant="body2">
				Восстановить аккаунт
			</Typography>
		</Link>
	</Container>;
};

SignUp = React.memo(withRouter(SignUp));

export default SignUp;
