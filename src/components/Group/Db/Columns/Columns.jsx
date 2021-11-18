import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import onDialog from 'components/Dialog/onDialog.js';
import loadColumnInputs from 'utils/loadColumnInputs.js';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import onUnmount from 'components/Dialog/DbRow/onUnmount.js';
import dataTypes, {
	DATA_TYPE_ID,
	DATA_TYPE_NUMBER,
} from 'structures/dataTypes.js';
import { 
	DIALOG_DB_COLUMN,
	DIALOG_DELETE_CONFIRM,
} from 'consts/dialog.js';
import onRow from './onRow.js';
import onDelete from './onDelete.js';
import onEdit from './onEdit.js';
import onMount from './onMount.js';

let Column = ({
	tableId,
	columnId,
}) => {
	const dataTypeId = useSelector((state) => (state.db.tempValue || {})[columnId].data_type_id);
	const name = useSelector((state) => (state.db.tempValue || {})[columnId].name);
	const description = useSelector((state) => (state.db.tempValue || {})[columnId].description);
	const defaultValue = useSelector((state) => (state.db.tempValue || {})[columnId].default_value);
	const required = useSelector((state) => (state.db.tempValue || {})[columnId].required);
	const Component = React.useMemo(() => React.lazy(loadColumnInputs(dataTypeId)), [
		dataTypeId,
	]);
	const _onDelete = React.useCallback((e) => onDelete(e, tableId, columnId), [
		tableId,
		columnId,
	]);
	const _onEdit = React.useCallback((e) => onEdit(e, tableId, columnId), [
		tableId,
		columnId,
	]);

	return <Box
		display="flex"
		alignItems="flex-start"
		py="12px">
		<Box 
			width="24px"
			pt="16px">
			{required
				? <CheckBoxIcon 
					fontSize="small"
					color="secondary" />
				: <CheckBoxOutlineBlankIcon fontSize="small" />}
		</Box>
		<Box width="calc(100% - 120px)">
			<React.Suspense fallback={<Typography>Подождите...</Typography>}>
				<Component
					name={'column-'+ columnId}
					label={name +' ('+ dataTypes[dataTypeId === DATA_TYPE_ID.id
						? DATA_TYPE_NUMBER.id
						: dataTypeId].text() +')'}
					helperText={description}
					defaultValue={defaultValue} />
			</React.Suspense>
		</Box>
		<Box
			display="flex"
			width="96px">
			<IconButton
				color="primary"
				onClick={_onEdit}>
				<EditIcon />
			</IconButton>
			<IconButton
				disabled={dataTypeId === DATA_TYPE_ID.id}
				color="secondary"
				onClick={onDialog(DIALOG_DELETE_CONFIRM, {
					onDelete: _onDelete,
				})}>
				<CloseIcon />
			</IconButton>
		</Box>
	</Box>;
};
Column = React.memo(Column);
Column.defaultProps = {
	tableId: 0,
	columnId: 0,
};

let Columns = ({ id }) => {
	const isCollection = useSelector((state) => (state.db.tables[id] || {}).is_collection);
	const columns = useSelector((state) => ({ ...state.db.tempValue || {} }));
	const _onRow = React.useCallback((e) => onRow(e, id), [
		id,
	]);
	const columnKeys = Object.keys(columns);

	React.useEffect(() => {
		onMount();
	}, []);

	React.useEffect(() => () => {
		onUnmount();
	}, []);

	return <React.Fragment>
		<Box
			my={2}
			display="flex"
			justifyContent="space-between"
			alignItems="center">
			<FormControlLabel
				control={<Switch 
					id="is_collection"
					name="is_collection"
					checked={!!isCollection}
					onChange={_onRow} />}
					label="Включить список" />
			<Button
				variant="outlined"
				color="primary"
				startIcon={<AddIcon />}
				onClick={onDialog(DIALOG_DB_COLUMN)}>
				Добавить поле
			</Button>
		</Box>
		{columnKeys.map((columnId) => {
			return <React.Fragment key={columnId}>
				{columns[columnId].name
					? <Column 
						tableId={id}
						columnId={columnId} />
					: <React.Fragment />}
			</React.Fragment>;
		})}
	</React.Fragment>;
};

Columns = React.memo(Columns);
Columns.defaultProps = {
	id: 0,
};

export default Columns;
