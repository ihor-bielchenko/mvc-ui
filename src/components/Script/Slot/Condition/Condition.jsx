import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import onDelete from 'components/Dialog/Prop/onDelete.js';
import funcTemplates from 'structures/funcTemplates.js';
import { DIALOG_IF } from 'consts/dialog.js';
import Slot from '../Slot';
import OptionDataType from '../OptionDataType.jsx';

let Condition = ({
	scriptId,
	workspaceId,
	id,
	entityId,
	isSource,
	dataTypeValidating,
	onClickAsSource,
}) => {
	const name = useSelector((state) => state.script[workspaceId].data[entityId].entity_func.name);
	const templateId = useSelector((state) => state.script[workspaceId].data[entityId].entity_func.template_id);
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
			backgroundColor="#ab47bc"
			scriptId={scriptId}
			workspaceId={workspaceId}
			id={id}
			entityId={entityId}
			dialogId={DIALOG_IF}
			isSource={isSource}
			dataTypeId={dataTypeId}
			dataTypeValidating={dataTypeValidating}
			onDelete={_onDelete}
			onClick={_onClick}>
			<Box
				display="flex"
				alignItems="flex-start"
				py="2px">
				<DoneAllIcon 
					fontSize="small"
					style={{ color: '#FFF' }} />
				<Typography 
					component="span"
					style={{ 
						color: '#FFF',
						paddingLeft: 4, 
						lineHeight: '16px',
					}}>
					{name} <span style={{ fontSize: 11 }}>
						({funcTemplates[templateId].text()})
					</span>
				</Typography>
			</Box>
			{dataTypeId >= -1
				? <OptionDataType dataTypeId={dataTypeId} />
				: <React.Fragment />}
		</Slot>
	</React.Fragment>;
};

Condition = React.memo(Condition);
Condition.defaultProps = {
	scriptId: 0,
	workspaceId: 0,
	id: 0,
	entityId: 0,
	isSource: false,
	dataTypeValidating: () => ([]),
	onClickAsSource: () => {},
};

export default Condition;
