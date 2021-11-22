import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import CloseIcon from '@material-ui/icons/Close';
import Title from 'components/Title';
import onClose from '../onClose.js';
import { DIALOG_BUILD } from 'consts/dialog.js';
import onMount from './onMount.js';

let Build = ({ history }) => {
	const [ progress, setProgress ] = React.useState(() => ({
		value: 0,
		logs: [],
	}));
	const dialog = useSelector((state) => state.dialogs[DIALOG_BUILD]);
	const _dialogOpenFlag = !!dialog;

	React.useEffect(() => {
		_dialogOpenFlag
			? onMount(setProgress)
			: setProgress(0);
	}, [
		_dialogOpenFlag,
		setProgress,
	]);

	return _dialogOpenFlag
		? <React.Fragment>
			<Dialog
				aria-labelledby="dialog-title"
				aria-describedby="dialog-description"
				fullWidth
				maxWidth="sm"
				open={_dialogOpenFlag}
				onClose={onClose(DIALOG_BUILD)}>
				<DialogTitle>
					<Title onClose={onClose(DIALOG_BUILD)}>
						Сборка сервиса
					</Title>
				</DialogTitle>
				<DialogContent dividers>
					{progress.value < 0
						? <Box>
							<Typography 
								variant="h6"
								color="secondary">
								Возникла критическая ошибка в сборке сервиса. Пожалуйста, обратитесь в техническую поддержку
							</Typography>
						</Box>
						: <LinearProgress 
							variant="determinate"
							value={progress.value} />}
				</DialogContent>
				<DialogActions
					style={{
						justifyContent: 'flex-start',
					}}>
					<Button 
						variant="outlined"
						color="secondary"
						startIcon={<CloseIcon />}
						onClick={onClose(DIALOG_BUILD)}>
						Отмена
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
		: <React.Fragment />;
};

Build = React.memo(Build);
Build.defaultProps = {
};

export default Build;
