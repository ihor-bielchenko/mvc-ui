import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SelectDataType from 'components/Select/DataType';
import { StyledChip } from 'components/Input/LogicValue.jsx';
import dataTypes, {
	DATA_TYPE_ATOMIC,
	DATA_TYPE_ID,
} from 'structures/dataTypes.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import onMount from './onMount.js';
import onSelect from './onSelect.js';
// import onChange from '../onChange.js';
import onUnmount from '../onUnmount.js';

let IfType = ({ 
	scriptId,
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop1 = useSelector((state) => ((state.jsObject.blocks[0] || [])[0] || {}).value);
	const prop2 = useSelector((state) => ((state.jsObject.blocks[0] || [])[1] || {}).value ?? '');
	const _onSelect1 = React.useCallback((e) => onSelect(e, id, 0), [
		id,
	]);
	// const _onChange2 = React.useCallback((e) => onChange(e, id, 1), [
	// 	id,
	// ]);

	React.useEffect(() => {
		!renderFlag && onMount();
	}, [
		renderFlag,
	]);

	React.useEffect(() => () => {
		onUnmount();
	}, []);

	return <React.Fragment>
		<Box mt={2} />
		<Grid 
			container
			spacing={3}
			alignItems="center">
			<Grid 
				item
				xs={4}>
				<SelectDataType 
					name="prop-1"
					value={prop1}
					onSelect={_onSelect1}
					onFilter={(key) => dataTypes[key].id !== DATA_TYPE_ATOMIC.id
						&& dataTypes[key].id !== DATA_TYPE_ID.id} />
			</Grid>
			<Grid 
				item
				xs={true}
				style={{
					position: 'relative',
					height: '60px',
				}}>
				{prop2
					? <StyledChip 
						label={SOURCE_TYPE_SCRIPT.text()} />
					: <Button
						disabled={typeof prop1 === 'undefined'}
						variant="outlined"
						color="primary"
						startIcon={<AddIcon fontSize="small" />}>
						Выбрать параметр
					</Button>}
			</Grid>
		</Grid>
	</React.Fragment>;
};

IfType = React.memo(IfType);
IfType.defaultProps = {
	scriptId: 0,
	id: 0,
};

export default IfType;
