import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { COLUMN_ARR } from 'structures/columnTypes.js';
import onChangeLocal from './onChange.js';

let Key = ({
	id,
	parentId,
	typeId,
	parentTypeId,
	KeyComponent,
	value,
	disabledRemove,
	onChange,
}) => {
	const _parentTypeId = useSelector((state) => parentTypeId ?? (state.jsObject.data[parentId] || {}).type_id);
	const _typeId = useSelector((state) => typeId ?? (state.jsObject.data[id] || {}).type_id);
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
		pr={_parentTypeId === COLUMN_ARR.id
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
						parentTypeId={_parentTypeId}
						id={id}
						typeId={_typeId}
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
