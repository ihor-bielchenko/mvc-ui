import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { 
	BrowserRouter,
	Switch,
	Route, 
} from 'react-router-dom';
import { Provider as StoreProvider } from 'components/Store';
import { Provider as MenuProvider } from 'components/Menu';
import Language from 'components/Language';
import Loader from 'components/Loader';
import Dialog from 'components/Dialog';
import Alert from 'components/Alert';
import Verify from 'pages/Verify';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import AccessConfirm from 'pages/AccessConfirm';
import Recovery from 'pages/Recovery';
import Reset from 'pages/Reset';
import PageAuth from 'pages/Auth';
import {
	URL_PAGE_SIGN_UP,
	URL_PAGE_SIGN_IN,
	URL_PAGE_VERIFY,
	URL_PAGE_RECOVERY,
	URL_PAGE_RESET,
	URL_PAGE_ACCESS_CONFIRM,
} from 'consts/url.js';
import theme from './theme.js';
import GlobalStyles from './globalStyles.js';

render(<ThemeProvider theme={theme}>
	<StoreProvider>
		<Loader>
			<Language>
				<BrowserRouter>
					<MenuProvider />
					<Dialog>
						<Alert>
							<Switch>
								<Route 
									exact 
									path={URL_PAGE_VERIFY}>
									<Verify />
								</Route>
								<Route 
									exact 
									path={URL_PAGE_SIGN_IN}>
									<SignIn />
								</Route>
								<Route 
									exact 
									path={URL_PAGE_SIGN_UP}>
									<SignUp />
								</Route>
								<Route 
									exact 
									path={URL_PAGE_ACCESS_CONFIRM}>
									<AccessConfirm />
								</Route>
								<Route 
									exact 
									path={URL_PAGE_RECOVERY}>
									<Recovery />
								</Route>
								<Route 
									exact 
									path={URL_PAGE_RESET}>
									<Reset />
								</Route>
								<Route path="/">
									<PageAuth />
								</Route>
							</Switch>
						</Alert>
					</Dialog>
				</BrowserRouter>
			</Language>
		</Loader>
	</StoreProvider>
	<GlobalStyles />
</ThemeProvider>, document.getElementById('root'));
