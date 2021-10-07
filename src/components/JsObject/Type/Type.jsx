import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import columnTypes from 'structures/columnTypes.js';
import onSelectLocal from './onSelect.js';

let Type = ({
	parentId,
	id,
	parentTypeId,
	value,
	TypeComponent,
	onSelect,
}) => {
	const _parentTypeId = useSelector((state) => parentTypeId ?? (state.jsObject.data[parentId] || {}).type_id);
	const _typeId = useSelector((state) => value ?? (state.jsObject.data[id] || {}).type_id);
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
				parentTypeId={_parentTypeId}
				id={id}
				typeId={_typeId}
				onSelect={_onSelect} />
			: <Typography>
				{columnTypes[_typeId].text()}
			</Typography>}
	</Box>;
};

Type = React.memo(Type);
Type.defaultProps = {
	parentId: 0,
	id: 0,
};

export default Type;
