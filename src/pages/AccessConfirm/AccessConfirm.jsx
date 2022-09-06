import React from 'react';
import { withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from 'components/Link';
import {
	URL_PAGE_SIGN_IN,
	URL_PAGE_RECOVERY,
} from 'consts/url.js';
import { getLang } from 'components/Language';

let AccessConfirm = ({ history }) => {
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
						{getLang('ConfRegistration')}
					</Typography>
					<Box my={3}>
						<Typography>
							{getLang('Instructions')}
						</Typography>
					</Box>
				</Box>
			</Paper>
		</Box>
		<Box mt={6} mb={2}>
			<Typography 
				component={Link}
				to={URL_PAGE_SIGN_IN}
				variant="body2">
				{getLang('AccLogin')}
			</Typography>
		</Box>
		<Link to={URL_PAGE_RECOVERY}>
			<Typography variant="body2">
				{getLang('Restore')}
			</Typography>
		</Link>
	</Container>;
};

AccessConfirm = withRouter(AccessConfirm);
AccessConfirm = React.memo(AccessConfirm);

export default AccessConfirm;
