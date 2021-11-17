import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Store from 'components/Store';
import InputNumeric from 'components/Input/Numeric';
import onDialog from 'components/Dialog/onDialog.js';
import onValidateSource from 'components/Group/Func/onValidate.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { 
	DATA_TYPE_ID,
	DATA_TYPE_NUMBER, 
} from 'structures/dataTypes.js';
import onCollection from './onCollection.js';
import onChangeOffset from './onOffset.js';
import onChangeLimit from './onLimit.js';
import onCheckColumn from './onColumn.js';
import onValueScript from './onValueScript.js';
import onClear from './onClear.js';

let Select = ({ 
	id,
	isCollection, 
}) => {
	const dbColumnsKeys = useSelector((state) => Object.keys(state.db.columns));
	const _isCollection = useSelector((state) => isCollection || state.jsObject.tempValue.is_collection);
	const offset = useSelector((state) => state.jsObject.tempValue.offset);
	const limit = useSelector((state) => state.jsObject.tempValue.limit);
	const selectData = useSelector((state) => state.jsObject.tempValue.select || []);
	const _onCollection = React.useCallback((e) => onCollection(e, id), [
		id,
	]);
	const _onCheckColumn = React.useCallback((e) => onCheckColumn(e, id), [
		id,
	]);
	const _onClearOffset = React.useCallback((e) => onClear(e, id, 'offset'), [
		id,
	]);
	const _onClearLimit = React.useCallback((e) => onClear(e, id, 'limit'), [
		id,
	]);
	const _onMenuOffset = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(id, 'offset'),
		dataTypeValidating: onValidateSource(DATA_TYPE_NUMBER.id),
	})(e), [
		id,
	]);
	const _onMenuLimit = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(id, 'limit'),
		dataTypeValidating: onValidateSource(DATA_TYPE_NUMBER.id),
	})(e), [
		id,
	]);

	// onMount
	React.useEffect(() => {
		typeof isCollection === 'boolean' && onCollection(isCollection);
	}, [
		isCollection,
	]);

	return <React.Fragment>
		<Box py={3}>
			<Grid 
				container
				alignItems="center">
				<Grid
					item
					xs={6}> 
					<Box py={2}>
						<FormControlLabel
							label="Получать из базы коллекцию элементов"
							name="is_collection"
							control={<Switch 
								{ ...typeof isCollection === 'boolean'
									? { checked: !!_isCollection }
									: {
										checked: !!_isCollection,
										onChange: _onCollection,
									} } />} />
					</Box>
				</Grid>
				{_isCollection
					? <Grid
						item
						container
						xs={6}
						spacing={2}>
						<Grid
							item
							xs={6}>
							<InputNumeric
								menu
								onMenu={_onMenuOffset}
								onValue={_onMenuOffset}
								onDelete={_onClearOffset}
								name="offset"
								label="Начало выборки (offset)"
								placeholder="0"
								defaultValue={offset}
								onChange={onChangeOffset} />
						</Grid>
						<Grid
							item
							xs={6}>
							<InputNumeric
								menu
								onMenu={_onMenuLimit}
								onValue={_onMenuLimit}
								onDelete={_onClearLimit}
								name="limit"
								label="Лимит"
								placeholder="10"
								defaultValue={limit}
								onChange={onChangeLimit} />
						</Grid>
					</Grid>
					: <React.Fragment />}
			</Grid>
		</Box>
		<Divider />
		<Box 
			mt={3}
			mb={2}>
			<Typography 
				variant="subtitle2"
				color="textSecondary">
				Какие поля нужно выбрать из базы данных?
			</Typography>
		</Box>
		<FormGroup>
			{dbColumnsKeys.map((key) => {
				const dbColumnsData = Store().getState().db.columns;

				return <FormControlLabel
					key={key}
					control={<Checkbox 
						value={key}
						checked={selectData.indexOf(Number(key)) > -1}
						onChange={_onCheckColumn} />}
					label={<Typography 
						variant="h6"
						color={dbColumnsData[key].data_type_id === DATA_TYPE_ID.id
							? 'secondary'
							: 'initial'}>
						<b>{dbColumnsData[key].name}</b>
					</Typography>} />
			})}
		</FormGroup>
	</React.Fragment>;
};

Select = React.memo(Select);
Select.defaultProps = {
	id: 0,
};

export default Select;
