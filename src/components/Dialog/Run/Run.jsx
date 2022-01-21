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
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import { getLang } from 'components/Language'
import Title from 'components/Title';
import onClose from '../onClose.js';
import { DIALOG_RUN } from 'consts/dialog.js';
import onMount from './onMount.js';

let Run = ({ history }) => {
	const [ progress, setProgress ] = React.useState(() => ({
		value: 0,
		logs: [],
	}));
	const dialog = useSelector((state) => state.dialogs[DIALOG_RUN]);
	const serverStatusId = (dialog || {}).serverStatusId;
	const _dialogOpenFlag = !!dialog;

	React.useEffect(() => {
		_dialogOpenFlag
			? onMount(serverStatusId, setProgress)
			: setProgress({
				value: 0,
				logs: [],
			});
	}, [
		_dialogOpenFlag,
		serverStatusId,
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
				onClose={onClose(DIALOG_RUN)}>
				<DialogTitle>
					<Title onClose={onClose(DIALOG_RUN)}>
						{getLang('cmpDialogRun')}
					</Title>
				</DialogTitle>
				<DialogContent dividers>
					{progress.value === -2
						? <Box pb="16px">
							<Typography 
								variant="h6"
								color="primary">
								{getLang('cmpDialogRunSuccess')}
							</Typography>
						</Box>
						: <React.Fragment />}
					{progress.value === -1
						? <Box>
							<Typography 
								variant="h6"
								color="secondary">
								{getLang('cmpDialogRunErr')}
							</Typography>
						</Box>
						: <LinearProgress 
							variant="determinate"
							value={progress.value === -2
								? 100
								: progress.value} />}
					<Divider style={{ marginTop: 16, }} />
					<Box 
						px="8px"
						py="4px"
						height="100px"
						minHeight="100px"
						overflow="auto">
						{progress
							.logs
							.map((logItem, i) => {
								return <Typography key={i}>
									{logItem}
								</Typography>;
						})}
					</Box>
					<Divider />
				</DialogContent>
				<DialogActions
					style={{
						justifyContent: 'flex-start',
					}}>
					<Button 
						variant="outlined"
						color="secondary"
						startIcon={<CloseIcon />}
						onClick={onClose(DIALOG_RUN)}>
						{progress.value === -2
							? getLang('cmpDialogRunClose')
							: getLang('cmpDialogRunCancel')}
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
		: <React.Fragment />;
};

Run = React.memo(Run);
Run.defaultProps = {
};

export default Run;
