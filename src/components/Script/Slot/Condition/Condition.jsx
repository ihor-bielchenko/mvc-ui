import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import onDelete from 'components/Dialog/Condition/onDelete.js';
import Slot from '../Slot';
import { DIALOG_IF } from 'consts/dialog.js';

let Condition = ({
	scriptId,
	id,
	entityId,
}) => {
	const name = useSelector((state) => state.script[scriptId].data[entityId].entity_func.name);
	const dataTypeId = useSelector((state) => state.script[scriptId].data[entityId].data_type_id);
	const _onDelete = React.useCallback((e) => onDelete(e, id), [
		id,
	]);

	return <React.Fragment>
		<Slot 
			withControl
			backgroundColor="#ab47bc"
			scriptId={scriptId}
			id={id}
			entityId={entityId}
			dialogId={DIALOG_IF}
			dataTypeId={dataTypeId}
			onDelete={_onDelete}>
			<Box
				display="flex"
				alignItems="center"
				py="2px">
				<DoneAllIcon 
					fontSize="small"
					style={{ color: '#FFF' }} />
				<Typography 
					style={{ 
						color: '#FFF',
						paddingLeft: 4, 
					}}>
					{name}
				</Typography>
			</Box>
		</Slot>
	</React.Fragment>;
};

Condition = React.memo(Condition);
Condition.defaultProps = {
	scriptId: 0,
	id: 0,
	entityId: 0,
};

export default Condition;
