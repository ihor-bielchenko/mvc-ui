import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextsmsIcon from '@material-ui/icons/Textsms'
import onDelete from 'components/Dialog/Json/onDelete.js';
import Slot from '../Slot.jsx';
import OptionDataType from '../OptionDataType.jsx';
import { DIALOG_JSON } from 'consts/dialog.js';

let Json = ({
	scriptId,
	workspaceId,
	id,
	entityId,
	index,
	isSource,
	dataTypeValidating,
	onClickAsSource,
}) => {
	const name = useSelector((state) => state.script[workspaceId].data[entityId].entity_json.name);
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
			backgroundColor="#ff9800"
			scriptId={scriptId}
			workspaceId={workspaceId}
			id={id}
			entityId={entityId}
			index={index}
			dialogId={DIALOG_JSON}
			isSource={isSource}
			dataTypeId={dataTypeId}
			dataTypeValidating={dataTypeValidating}
			onDelete={_onDelete}
			onClick={_onClick}>
			<Box
				display="flex"
				alignItems="flex-start"
				py="2px">
				<TextsmsIcon 
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
			{dataTypeId >= -1
				? <OptionDataType dataTypeId={dataTypeId} />
				: <React.Fragment />}
		</Slot>
	</React.Fragment>;
};

Json = React.memo(Json);
Json.defaultProps = {
	scriptId: 0,
	workspaceId: 0,
	id: 0,
	entityId: 0,
	index: 0,
	isSource: false,
	dataTypeValidating: () => ([]),
	onClickAsSource: () => {},
};

export default Json;
