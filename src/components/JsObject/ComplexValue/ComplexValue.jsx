import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Store from 'components/Store';
import Remove from '../Remove';
import Key from '../Key';
import Type from '../Type';
import Divider from '../Divider';
import onChangeKey from './onChangeKey.js';

let ComplexItem = ({
	id,
	parentId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
	columnId,
}) => {
	const value = useSelector((state) => (((state.jsObject.data[id] || {}).value || {}).columns || {})[columnId]);
	const dbColumnsData = Store().getState().dbColumns.data;
	const _onChangeKey = React.useCallback((e) => onChangeKey(e, id, columnId), [
		id,
		columnId,
	]);

	return <Box
		key={id +'-'+ columnId}
		position="relative"
		display="flex"
		alignItems="flex-start"
		width="100%"
		pb={1}>
		<Remove
			parentId={parentId}
			id={id} />
		<Key
			parentId={parentId}
			id={id}
			KeyComponent={KeyComponent}
			value={value}
			onChange={_onChangeKey} />
		<Type
			parentId={parentId}
			id={id}
			TypeComponent={TypeComponent}
			value={dbColumnsData[columnId].type_id} />
		<Divider
			parentId={parentId}
			id={id} />
	</Box>;
};
ComplexItem = React.memo(ComplexItem);
ComplexItem.defaultProps = {
	id: 0,
	parentId: 0,
	columnId: 0,
};

let ComplexValue = ({
	id,
	parentId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
}) => {
	const columnsKeys = useSelector((state) => Object.keys(((state.jsObject.data[id] || {}).value || {}).columns || {}));
	const columnsLength = columnsKeys.length;
	let i = 0,
		collector = [];

	while (i < columnsLength) {
		const _columnId = Number(columnsKeys[i]);

		collector.push(
			<ComplexItem 
				key={id +'-'+ _columnId}
				id={id}
				parentId={parentId}
				columnId={_columnId}
				last={last}
				KeyComponent={KeyComponent}
				ValueComponent={ValueComponent}
				TypeComponent={TypeComponent} />);
		i++;
	}
	return collector;
};

ComplexValue = React.memo(ComplexValue);
ComplexValue.defaultProps = {
	id: 0,
	parentId: 0,
};

export default ComplexValue;
