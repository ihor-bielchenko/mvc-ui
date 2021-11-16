import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { URL_PAGE_SCRIPT } from 'consts/url.js';

let Title = ({ 
	onClose,
	children 
}) => {
	return <Grid 
		container
		alignItems="center">
		<Grid 
			item
			xs={true}>
			<Typography
				color="primary"
				variant="h5">
				{children}
			</Typography>
		</Grid>
		<Grid 
			item
			xs="auto">
			<IconButton 
				color="secondary"
				{ ...typeof onClose === 'function'
					? { onClick: onClose }
					: {
						component: Link,
						to: `/${URL_PAGE_SCRIPT}/${(window.location.pathname.split('/'))[2]}`,
					} }>
				<CloseIcon fontSize="large" />
			</IconButton>
		</Grid>
	</Grid>;
};

Title = React.memo(Title);
Title.defaultProps = {
};

export default Title;
