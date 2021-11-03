import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import onDelete from 'components/Dialog/Prop/onDelete.js';
import Slot from '../Slot.jsx';
import OptionDataType from '../OptionDataType.jsx';
import { DIALOG_PROP } from 'consts/dialog.js';

let Prop = ({
	scriptId,
	workspaceId,
	id,
	entityId,
	isSource,
	dataTypeValidating,
	onClickAsSource,
}) => {
	const name = useSelector((state) => state.script[workspaceId].data[entityId].entity_prop.name);
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
			backgroundColor="#4db6ac"
			scriptId={scriptId}
			workspaceId={workspaceId}
			id={id}
			entityId={entityId}
			dialogId={DIALOG_PROP}
			isSource={isSource}
			dataTypeId={dataTypeId}
			dataTypeValidating={dataTypeValidating}
			onDelete={_onDelete}
			onClick={_onClick}>
			<Box
				display="flex"
				alignItems="center"
				py="2px">
				<DescriptionIcon 
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
			{dataTypeId >= -1
				? <OptionDataType dataTypeId={dataTypeId} />
				: <React.Fragment />}
		</Slot>
	</React.Fragment>;
};

Prop = React.memo(Prop);
Prop.defaultProps = {
	scriptId: 0,
	workspaceId: 0,
	id: 0,
	entityId: 0,
	isSource: false,
	dataTypeValidating: () => ([]),
	onClickAsSource: () => {},
};

export default Prop;
