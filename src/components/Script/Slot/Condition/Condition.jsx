import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import onDelete from 'components/Dialog/Func/onDelete.js';
import Slot from '../Slot';
import { DIALOG_IF } from 'consts/dialog.js';

let Condition = ({
	scriptId,
	workspaceId,
	id,
	entityId,
	index,
	isSource,
	dataTypeValidating,
	onClickAsSource,
}) => {
	const name = useSelector((state) => state.script[workspaceId].data[entityId].entity_func.name);
	const dataTypeId = useSelector((state) => state.script[workspaceId].data[entityId].data_type_id);
	const _onDelete = React.useCallback((e) => onDelete(e, scriptId, workspaceId, id), [
		scriptId,
		workspaceId,
		id,
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
			backgroundColor="#ab47bc"
			scriptId={scriptId}
			workspaceId={workspaceId}
			id={id}
			entityId={entityId}
			index={index}
			dialogId={DIALOG_IF}
			isSource={isSource}
			dataTypeId={dataTypeId}
			dataTypeValidating={dataTypeValidating}
			onDelete={_onDelete}
			onClick={_onClick}>
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
	workspaceId: 0,
	id: 0,
	entityId: 0,
	index: 0,
	isSource: false,
	dataTypeValidating: () => ([]),
	onClickAsSource: () => {},
};

export default Condition;
