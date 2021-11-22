import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import onDelete from 'components/Dialog/Prop/onDelete.js';
import Slot from '../Slot';
import { DIALOG_FUNC } from 'consts/dialog.js';

let Func = ({
	scriptId,
	workspaceId,
	id,
	entityId,
	isSource,
	dataTypeValidating,
	onClickAsSource,
}) => {
	const name = useSelector((state) => state.script[workspaceId].data[entityId].entity_func.name);
	const dataTypeId = useSelector((state) => state.script[workspaceId].data[entityId].data_type_id);
	const _onDelete = React.useCallback((e) => onDelete(e, scriptId, workspaceId, entityId), [
		scriptId,
		workspaceId,
		entityId,
	]);
	const _onClick = React.useCallback((e) => onClickAsSource(e, scriptId, workspaceId, entityId, dataTypeId), [
		onClickAsSource,
		scriptId,
		workspaceId,
		entityId,
		dataTypeId,
	]);

	return <React.Fragment>
		<Slot 
			withControl
			backgroundColor="#ef5350"
			scriptId={scriptId}
			workspaceId={workspaceId}
			id={id}
			entityId={entityId}
			dialogId={DIALOG_FUNC}
			isSource={isSource}
			dataTypeId={dataTypeId}
			dataTypeValidating={dataTypeValidating}
			onDelete={_onDelete}
			onClick={_onClick}>
			<Box
				display="flex"
				alignItems="flex-start"
				py="2px">
				<AirportShuttleIcon 
					fontSize="small"
					style={{ color: '#FFF' }} />
				<Typography 
					style={{ 
						color: '#FFF',
						paddingLeft: 4, 
						lineHeight: '16px',
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
	workspaceId: 0,
	id: 0,
	entityId: 0,
	isSource: false,
	dataTypeValidating: () => ([]),
	onClickAsSource: () => {},
};

export default Func;
