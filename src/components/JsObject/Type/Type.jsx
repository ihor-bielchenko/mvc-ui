import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import dataTypes, { 
	DATA_TYPE_ID,
	DATA_TYPE_NUMBER,
	DATA_TYPE_MIXED,
} from 'structures/dataTypes.js';
import onSelectLocal from './onSelect.js';

let Type = ({
	parentId,
	id,
	parentDataTypeId,
	value,
	TypeComponent,
	onSelect,
}) => {
	const _parentDataTypeId = useSelector((state) => parentDataTypeId ?? (state.jsObject.data[parentId] || {}).data_type_id);
	const _dataTypeId = useSelector((state) => value ?? (state.jsObject.data[id] || {}).data_type_id);
	const _onSelect = React.useCallback((e) => typeof onSelect === 'function'
		? onSelect(e, id)
		: onSelectLocal(e, id), [
		id,
		onSelect,
	]);

	return <Box
		position="relative"
		width="14%"
		minWidth="108px">
		{(typeof TypeComponent === 'object'
			&& typeof TypeComponent['$$typeof'] === 'symbol')
			? <TypeComponent
				parentId={parentId}
				parentDataTypeId={_parentDataTypeId}
				id={id}
				dataTypeId={_dataTypeId}
				onSelect={_onSelect} />
			: <Typography>
				{_dataTypeId === DATA_TYPE_MIXED.id
					? DATA_TYPE_MIXED.text()
					: (dataTypes[_dataTypeId === DATA_TYPE_ID.id
						? DATA_TYPE_NUMBER.id
						: _dataTypeId].text())}
			</Typography>}
	</Box>;
};

Type = React.memo(Type);
Type.defaultProps = {
	parentId: 0,
	id: 0,
};

export default Type;
