import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from 'components/Header';
import JsObject from 'components/JsObject';
import InputText from 'components/Input/Text';
import SelectDataType from 'components/Select/DataType';
import SelectResponseCode from 'components/Select/ResponseCode';
import Transition from 'components/Dialog/Transition.jsx';
import onDialog from 'components/Dialog/onDialog.js';
import dataTypes, { 
	DATA_TYPE_ATOMIC,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY, 
} from 'structures/dataTypes.js';
import { 
	DIALOG_JSON,
	DIALOG_DELETE_CONFIRM, 
} from 'consts/dialog.js';
import onChangeName from '../Func/onChangeName.js';
import KeyComponent from './KeyComponent.jsx';
import ValueComponent from './ValueComponent.jsx';
import TypeComponent from './TypeComponent.jsx';
import onMount from './onMount.js';
import onClose from './onClose.js';
import onSave from './onSave.js';
import onDelete from './onDelete.js';
import onSelectDataTypeId from './onSelectDataTypeId.js';
import onSelectCode from './onSelectCode.js';

let Json = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_JSON]);
	const existId = (dialog || {}).id || 0;
	const scriptId = (dialog || {}).scriptId ?? 0;
	const workspaceId = (dialog || {}).workspaceId ?? 0;
	const fromEntityId = (dialog || {}).fromEntityId ?? 0;
	const fromArrowTypeId = (dialog || {}).fromArrowTypeId ?? process.env.ARROW_TYPE_DEFAULT;
	const id = useSelector((state) => state.json.id);
	const name = useSelector((state) => state.json.name || '');
	const code = useSelector((state) => state.json.code || 200);
	const dataTypeId = useSelector((state) => (state.jsObject.data[0] || {}).data_type_id ?? DATA_TYPE_ATOMIC.id);
	const _onDelete = React.useCallback((e) => onDelete(e, scriptId, workspaceId, id), [
		scriptId,
		workspaceId,
		id,
	]);
	const _onSave = React.useCallback((e) => onSave(e, scriptId, workspaceId, fromEntityId, fromArrowTypeId), [
		scriptId,
		workspaceId,
		fromEntityId,
		fromArrowTypeId,
	]);
	const _dialogOpenFlag = !!dialog;

	// onMount
	React.useEffect(() => {
		if (_dialogOpenFlag && existId > 0) {
			onMount(existId, scriptId, workspaceId);
		}
	}, [
		_dialogOpenFlag,
		existId,
		scriptId,
		workspaceId,
	]);

	return _dialogOpenFlag
		? <Dialog
			fullScreen
			TransitionComponent={Transition}
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="lg"
			open={_dialogOpenFlag}
			onClose={onClose}>
			<DialogTitle>
				<Header onClose={onClose}>
					{id >= 1
						? 'JSON-ответ: '+ name
						: 'Добавить JSON-ответ'}
				</Header>
			</DialogTitle>
			{_dialogOpenFlag
				? <React.Fragment>
					<DialogContent dividers>
						<Box py={2}>
							<InputText 
								required
								name="name"
								label="Название"
								helperText="Для быстрого поиска придумайте название или краткое описание"
								value={name}
								onChange={onChangeName('json')} />
						</Box>
						<Box
							py={2}
							position="relative">
							<SelectResponseCode
								value={code}
								onSelect={onSelectCode} />
						</Box>
						<Box
							py={2}
							position="relative">
							<SelectDataType
								label="Формат данных"
								name="data_type_id"
								value={dataTypeId}
								onSelect={onSelectDataTypeId}
								onFilter={(key) => {
									return dataTypes[key].id === DATA_TYPE_ATOMIC.id
										|| dataTypes[key].id === DATA_TYPE_OBJECT.id
										|| dataTypes[key].id === DATA_TYPE_ARRAY.id
								}} />
						</Box>
						<Box 
							pt={4}
							pb={2}>
							<Typography variant="h6">
								Данные:
							</Typography>
						</Box>
						<JsObject 
							KeyComponent={KeyComponent}
							ValueComponent={ValueComponent}
							TypeComponent={TypeComponent} />
					</DialogContent>
					<DialogActions>
					<Box 
						p={2}
						width="100%"
						display="flex"
						justifyContent="space-between">
						<Button 
							variant="outlined"
							color="secondary"
							startIcon={<CloseIcon />}
							onClick={onClose}>
							Отмена
						</Button>
						{id >= 1
							? <ButtonGroup>
								<Button
									disabled={!name}
									variant="outlined"
									color="primary"
									startIcon={<SaveIcon />}
									onClick={_onSave}>
									Сохранить
								</Button>
								<Button
									variant="outlined"
									color="secondary"
									startIcon={<DeleteIcon />}
									onClick={onDialog(DIALOG_DELETE_CONFIRM, {
										onDelete: _onDelete,
									})}>
									Удалить
								</Button>
							</ButtonGroup>
							: <Button
								disabled={!name}
								variant="outlined"
								color="primary"
								startIcon={<SaveIcon />}
								onClick={_onSave}>
								Сохранить
							</Button>}
					</Box>
					</DialogActions>
				</React.Fragment>
				: <React.Fragment />}
		</Dialog>
		: <React.Fragment />;
};

Json = React.memo(Json);
Json.defaultProps = {
};

export default Json;
