import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Store from 'components/Store';
import SelectColumn from 'components/Select/Column';
import InputColumn from 'components/Input/Column';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_SCRIPT } from 'structures/source.js';
import typeFormatValidating from '../typeFormatValidating.js';
import onAddColumn from './onAddColumn.js';
import onSelectColumn from './onSelectColumn.js';
import onDeleteColumn from './onDeleteColumn.js';
import onChange from './onChange.js';
import onChangeByLogic from './onChangeByLogic.js';
import onClear from './onClear.js';

const _onChangeByLogic = (key) => (e, scriptId, typeId, id) => onChangeByLogic(e, scriptId, typeId, id, key);
let DbCreate = ({ scriptId }) => {
	const props = useSelector((state) => state.func[scriptId].props);
	const _onAddColumn = React.useCallback((e) => onAddColumn(e, scriptId), [
		scriptId,
	]);
	const _onSelectColumn = React.useCallback((key) => (e) => onSelectColumn(e, scriptId, key), [
		scriptId,
	]);
	const _onDeleteColumn = React.useCallback((key) => (e) => onDeleteColumn(e, scriptId, key), [
		scriptId,
	]);
	const _onClear = React.useCallback((key) => (e) => onClear(e, scriptId, key), [
		scriptId,
	]);
	const _onMenu = React.useCallback((key) => (e) => onDialog(SOURCE_SCRIPT.id, {
		scriptId,
		onClickEntity: _onChangeByLogic(key),
		formatValidating: () => {
			const {
				func,
				dbColumns,
			} = Store().getState();
			const columnId = func[scriptId].props[key].column_id;
			const typeId = dbColumns.data[columnId].type_id;

			return typeFormatValidating(typeId)();
		},
	})(e), [
		scriptId,
	]);
	const _onChange = React.useCallback((key) => (e) => onChange(e, scriptId, key), [
		scriptId,
	]);
	const dbColumns = Store().getState().dbColumns.data;

	return <React.Fragment>
		{Object
			.keys(props)
			.map((key) => {
				return <Grid
					key={key} 
					container
					alignItems="center"
					spacing={3}>
					<Grid 
						item
						xs={4}>
						<SelectColumn
							name={'prop-'+ key +'-column_id'}
							value={props[key].column_id.toString()}
							onSelect={_onSelectColumn(key)} />
					</Grid>
					<Grid 
						item
						xs={true}>
						{props[key].column_id >= 1
							? <React.Fragment>
								<InputColumn
									menu
									onMenu={_onMenu(key)}
									onDelete={_onClear(key)}
									onChange={_onChange(key)}
									defaultValue={props[key].value}
									columnTypeId={dbColumns[props[key].column_id].type_id}
									name={'prop-'+ key +'-value'}
									label="Значение" />
							</React.Fragment>
							: <React.Fragment />}
					</Grid>
					<Grid 
						item
						xs="auto">
						<IconButton 
							color="secondary"
							onClick={_onDeleteColumn(key)}>
							<CloseIcon />
						</IconButton>
					</Grid>
				</Grid>
			})}
		<Box my={2} />
		<Button
			variant="outlined"
			color="primary"
			startIcon={<AddIcon fontSize="small" />}
			onClick={_onAddColumn}>
			Добавить поле
		</Button>
	</React.Fragment>;
};

DbCreate = React.memo(DbCreate);
DbCreate.defaultProps = {
	scriptId: 0,
};

export default DbCreate;
