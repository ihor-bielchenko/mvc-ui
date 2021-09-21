import React from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import AlertLab from '@material-ui/lab/Alert';
import onClose from './onClose.js';

let Alert = ({ children }) => {
	const flag = useSelector((state) => state.alert.flag);
	const message = useSelector((state) => state.alert.message);
	const vertical = useSelector((state) => state.alert.vertical || 'bottom');
	const horizontal = useSelector((state) => state.alert.horizontal || 'right');

	React.useEffect(() => {
		if (flag) {
			onClose(3000);
		}
	}, [
		flag,
	]);

	return <React.Fragment>
		{children}
		{message
			? <Snackbar
				anchorOrigin={{ 
					vertical, 
					horizontal, 
				}}
				open={flag}
				onClose={onClose}>
				<AlertLab 
					elevation={6} 
					variant="filled"
					severity="warning">
					{message}
				</AlertLab>
			</Snackbar>
			: <React.Fragment />}
	</React.Fragment>;
};

Alert = React.memo(Alert);

export default Alert;
