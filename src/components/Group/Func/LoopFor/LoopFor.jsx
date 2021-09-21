import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Script from 'components/Script';
import { SCRIPT_LOOP } from 'consts/script.js';

let LoopFor = ({ scriptId }) => {
	return <React.Fragment>
		<Button
			variant="outlined"
			color="primary"
			startIcon={<AddIcon fontSize="small" />}>
			Добавить параметр из логики
		</Button>
		<Typography
			component="div"
			variant="caption"
			color="textSecondary"
			style={{
				margin: '24px 0 0 14px',
			}}>
			Зацикленная программа:
		</Typography>
		<Box 
			style={{ 
				border: '1px solid rgba(0, 0, 0, .12)', 
				borderRadius: 5,
				padding: '8px 0 24px',
			}}>
			<Script 
				type={SCRIPT_LOOP}
				scriptId={scriptId + 1} />
		</Box>
	</React.Fragment>;
};

LoopFor = React.memo(LoopFor);
LoopFor.defaultProps = {
	scriptId: 0,
};

export default LoopFor;

