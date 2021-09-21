import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SelectType from 'components/Select/Type';
import { StyledChip } from 'components/Input/LogicValue.jsx';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_SCRIPT } from 'structures/source.js';
import onChangeByLogic from '../onChangeByLogic.js';
import onClear from '../onClear.js';
import typeFormatValidating from '../typeFormatValidating.js';
import onSelect from './onSelect.js';
import onMount from './onMount.js';

const _onChangeByLogic2 = (scriptId) => (e, sourceScriptId, typeId, id) => {
	return onChangeByLogic(e, scriptId, typeId, id, '2', sourceScriptId);
};
let IfType = ({ 
	scriptId,
	id, 
}) => {
	const prop1 = useSelector((state) => state.func[scriptId].props['1'] ?? '');
	const prop2 = useSelector((state) => state.func[scriptId].props['2']);
	const _onSelect1 = React.useCallback((e) => onSelect(e, scriptId, '1'), [
		scriptId,
	]);
	const _onClear2 = React.useCallback((e) => onClear(e, scriptId, '2'), [
		scriptId,
	]);
	const _onMenu2 = React.useCallback((e) => onDialog(SOURCE_SCRIPT.id, {
		scriptId,
		onClickEntity: _onChangeByLogic2(scriptId),
		formatValidating: typeFormatValidating(),
	})(e), [
		scriptId,
	]);

	React.useEffect(() => {
		!(id > 0) && onMount(scriptId);
	}, [
		scriptId,
		id,
	]);

	return <React.Fragment>
		<Box mt={2} />
		<Grid 
			container
			spacing={3}
			alignItems="center">
			<Grid 
				item
				xs={4}>
				<SelectType 
					name="prop-1"
					onSelect={_onSelect1}
					value={prop1}>
					<MenuItem 
						value={12}
						style={{
							fontStyle: 'italic',
						}}>
						Пустое значение
					</MenuItem>
				</SelectType>
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
						label={SOURCE_SCRIPT.text()}
						onDelete={_onClear2}
						onClick={_onMenu2} />
					: <Button
						disabled={typeof prop1 === 'undefined'}
						variant="outlined"
						color="primary"
						startIcon={<AddIcon fontSize="small" />}
						onClick={_onMenu2}>
						Выбрать параметр из логики
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
