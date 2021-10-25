import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { DATA_TYPE_ARRAY } from 'structures/dataTypes.js';
import onChangeLocal from './onChange.js';

let Key = ({
	id,
	parentId,
	dataTypeId,
	parentDataTypeId,
	KeyComponent,
	value,
	disabledRemove,
	onChange,
}) => {
	const _parentDataTypeId = useSelector((state) => parentDataTypeId ?? (state.jsObject.data[parentId] || {}).data_type_id);
	const _dataTypeId = useSelector((state) => dataTypeId ?? (state.jsObject.data[id] || {}).data_type_id);
	const _key = useSelector((state) => value ?? (state.jsObject.data[id] || {}).key);
	const _disabledRemove = useSelector((state) => disabledRemove ?? (state.jsObject.data[id] || {}).disabledRemove);
	const _onChange = React.useCallback((e) => typeof onChange === 'function'
		? onChange(e, id)
		: onChangeLocal(e, id), [
		id,
		onChange,
	]);

	return <Box
		position="relative"
		textAlign="center"
		pr={_parentDataTypeId === DATA_TYPE_ARRAY.id
			? '6px'
			: '0px'}
		pl={_disabledRemove
			? '30px'
			: '0px'}
		minWidth={102}
		maxWidth={102}
		style={{
			whiteSpace: 'nowrap',
		}}>
		{typeof KeyComponent === 'object'
			&& typeof KeyComponent['$$typeof'] === 'symbol'
				? <React.Fragment>
					<KeyComponent
						parentId={parentId}
						parentDataTypeId={_parentDataTypeId}
						id={id}
						dataTypeId={_dataTypeId}
						value={_key}
						onChange={_onChange} />
				</React.Fragment>
				: <Typography color="primary">
					{(_key || '').toString()}
				</Typography>}
	</Box>;
};

Key = React.memo(Key);
Key.defaultProps = {
	id: 0,
	parentId: 0,
};

export default Key;
