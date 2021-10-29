import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import onDelete from 'components/Dialog/Func/onDelete.js';
import Slot from '../Slot';
import { DIALOG_FUNC } from 'consts/dialog.js';

let Func = ({
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
			backgroundColor="#ef5350"
			id={id}
			entityId={entityId}
			dialogId={DIALOG_FUNC}
			dataTypeId={dataTypeId}
			onDelete={_onDelete}>
			<Box
				display="flex"
				alignItems="center"
				py="2px">
				<AirportShuttleIcon 
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

Func = React.memo(Func);
Func.defaultProps = {
	scriptId: 0,
	id: 0,
	entityId: 0,
};

export default Func;
