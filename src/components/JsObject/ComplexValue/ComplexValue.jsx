import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Store from 'components/Store';
import Remove from '../Remove';
import Key from '../Key';
import Type from '../Type';
import Divider from '../Divider';
import ComplexChip from '../ComplexChip';
import Values from './Values.jsx';
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
	const key = useSelector((state) => (((state.jsObject.data[id] || {}).value || {}).columns || {})[columnId]);
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
		maxWidth="max-content"
		pb={1}>
		<Remove
			parentId={parentId}
			id={id} />
		<Key
			parentId={parentId}
			id={id}
			KeyComponent={KeyComponent}
			value={key}
			onChange={_onChangeKey} />
		<Type
			parentId={parentId}
			id={id}
			TypeComponent={TypeComponent}
			value={dbColumnsData[columnId].type_id} />
		<Divider
			parentId={parentId}
			id={id} />
		<Values
			typeId={dbColumnsData[columnId].type_id}
			value={dbColumnsData[columnId].default_value} />
		{last
			? <React.Fragment />
			: <Box 
				position="relative"
				textAlign="center"
				minWidth="8px"
				maxWidth="8px"
				pt="12px">
				<Typography variant="h5">
					,
				</Typography>
			</Box>}
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
	className,
}) => {
	const isCollection = useSelector((state) => ((state.jsObject.data[id] || {}).value || {}).is_collection);
	const columnsKeys = useSelector((state) => Object.keys(((state.jsObject.data[id] || {}).value || {}).columns || {}));
	
	return <React.Fragment>
		{isCollection
			? <React.Fragment />
			: <ComplexChip id={id} />}
		{(() => {
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
						last={i === columnsLength - 1 && last}
						KeyComponent={KeyComponent}
						ValueComponent={ValueComponent}
						TypeComponent={TypeComponent} />);
				i++;
			}
			return collector;
		})()}
	</React.Fragment>;
};

ComplexValue = React.memo(ComplexValue);
ComplexValue.defaultProps = {
	id: 0,
	parentId: 0,
};

export default ComplexValue;
