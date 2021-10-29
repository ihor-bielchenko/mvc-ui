import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextsmsIcon from '@material-ui/icons/Textsms'
import onDelete from 'components/Dialog/Json/onDelete.js';
import Slot from '../Slot';
import { DIALOG_JSON } from 'consts/dialog.js';

let Json = ({
	scriptId,
	id,
	entityId,
	x,
	y,
}) => {
	const name = useSelector((state) => state.script[scriptId].data[entityId].entity_json.name);
	const dataTypeId = useSelector((state) => state.script[scriptId].data[entityId].data_type_id);
	const _onDelete = React.useCallback((e) => onDelete(e, id), [
		id,
	]);

	return <React.Fragment>
		<Slot 
			withControl
			backgroundColor="#ff9800"
			id={id}
			entityId={entityId}
			dialogId={DIALOG_JSON}
			dataTypeId={dataTypeId}
			onDelete={_onDelete}>
			<Box
				display="flex"
				alignItems="center"
				py="2px">
				<TextsmsIcon 
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

Json = React.memo(Json);
Json.defaultProps = {
	scriptId: 0,
	id: 0,
	entityId: 0,
};

export default Json;
