import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import onDelete from 'components/Dialog/Prop/onDelete.js';
import Slot from '../Slot';
import { DIALOG_PROP } from 'consts/dialog.js';

let Prop = ({
	scriptId,
	id,
	entityId,
}) => {
	const name = useSelector((state) => state.script[scriptId].data[entityId].entity_prop.name);
	const dataTypeId = useSelector((state) => state.script[scriptId].data[entityId].data_type_id);
	const _onDelete = React.useCallback((e) => onDelete(e, id), [
		id,
	]);

	return <React.Fragment>
		<Slot 
			withControl
			backgroundColor="#4db6ac"
			scriptId={scriptId}
			id={id}
			entityId={entityId}
			dialogId={DIALOG_PROP}
			dataTypeId={dataTypeId}
			onDelete={_onDelete}>
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
		</Slot>
	</React.Fragment>;
};

Prop = React.memo(Prop);
Prop.defaultProps = {
	scriptId: 0,
	id: 0,
	entityId: 0,
};

export default Prop;
