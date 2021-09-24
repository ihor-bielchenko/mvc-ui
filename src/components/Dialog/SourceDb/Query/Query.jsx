import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Store from 'components/Store';
import onDialog from 'components/Dialog/onDialog.js';
import { 
	DIALOG_DB_QUERY,
	DIALOG_DELETE_CONFIRM, 
} from 'consts/dialog.js';
import { SOURCE_SCRIPT } from 'structures/source.js';
import onDelete from './onDelete.js';

let Query = () => {
	const queryKeys = useSelector((state) => Object.keys(state.jsObject.tempValue.query || {}));

	return <React.Fragment>
		{queryKeys.map((id) => {
			const queryItem = Store().getState().jsObject.tempValue.query[id];

			return <Box 
				key={id}
				py={1}>
				<Chip 
					onDelete={onDialog(DIALOG_DELETE_CONFIRM, {
						onDelete: onDelete(id),
					})}
					onClick={onDialog(DIALOG_DB_QUERY, { name: id })}
					label={<Typography variant="subtitle1">
						{queryItem.left
							? <b style={{ color: 'red' }}>┃</b>
							: <React.Fragment />}
						{(typeof queryItem.value === 'object' && 
							queryItem.value.source_id === SOURCE_SCRIPT.id)
							? SOURCE_SCRIPT.text()
							: queryItem.value}
						{queryItem.right
							? <b style={{ color: 'red' }}>┃</b>
							: <React.Fragment />}
					</Typography>} />
			</Box>
		})}
		<Button
			variant="outlined"
			color="primary"
			onClick={onDialog(DIALOG_DB_QUERY, { name: 0 })}>
			Добавить
		</Button>
	</React.Fragment>;
};

Query = React.memo(Query);
Query.defaultProps = {
};

export default Query;
