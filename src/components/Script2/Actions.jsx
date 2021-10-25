import React from 'react';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ClassIcon from '@material-ui/icons/Class';
import CodeIcon from '@material-ui/icons/Code';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import SelectScale from 'components/Select/Scale';
import onDialog from 'components/Dialog/onDialog.js';
import {
	DIALOG_PROP,
	DIALOG_FUNC,
	DIALOG_JSON,
} from 'consts/dialog.js';

let Actions = ({ emptyScript }) => {
	return <React.Fragment>
		<Box 
			position="relative"
			pt={2}>
			{!emptyScript
				? <Box 
					px="48px"
					display="flex"
					justifyContent="space-between"
					alignItems="center">
					<ButtonGroup size="small">
						<Button disabled>
							<ArrowBackIcon />
						</Button>
						<Button disabled>
							<ArrowForwardIcon />
						</Button>
						<Button 
							disabled
							startIcon={<DeleteForeverIcon />}>
							Очистить
						</Button>
						<SelectScale />
					</ButtonGroup>
					<ButtonGroup>
						<Button 
							onClick={onDialog(DIALOG_PROP)}
							startIcon={<ClassIcon />}
							style={{ color: '#00695c' }}>
							Параметр
						</Button>
						<Button 
							onClick={onDialog(DIALOG_FUNC)}
							color="secondary"
							startIcon={<CodeIcon />}>
							Действие
						</Button>
						<Button 
							onClick={onDialog(DIALOG_JSON)}
							startIcon={<VerticalSplitIcon />}
							style={{ color: '#000' }}>
							JSON-ответ
						</Button>
					</ButtonGroup>
				</Box>
				: <Box textAlign="center">
					<Box py={4}>
						<Typography 
							variant="h5"
							color="textSecondary">
							Программа пустая
						</Typography>
					</Box>
					<Box py={4}>
						<Typography color="textSecondary">
							Добавить:
						</Typography>
					</Box>
					<ButtonGroup>
						<Button 
							onClick={onDialog(DIALOG_PROP)}
							startIcon={<ClassIcon />}
							style={{ color: '#00695c' }}>
							Параметр
						</Button>
						<Button 
							onClick={onDialog(DIALOG_FUNC)}
							color="secondary"
							startIcon={<CodeIcon />}>
							Действие
						</Button>
						<Button 
							onClick={onDialog(DIALOG_JSON)}
							startIcon={<VerticalSplitIcon />}
							style={{ color: '#000' }}>
							JSON-ответ
						</Button>
					</ButtonGroup>
				</Box>}
		</Box>
	</React.Fragment>;
};

Actions = React.memo(Actions);
Actions.defaultProps = {
	emptyScript: false,
};

export default Actions;
