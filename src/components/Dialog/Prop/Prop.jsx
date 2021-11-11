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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
// import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from 'components/Header';
import JsObject from 'components/JsObject';
import InputText from 'components/Input/Text';
import SelectDataType from 'components/Select/DataType';
import Transition from 'components/Dialog/Transition.jsx';
import onDialog from 'components/Dialog/onDialog.js';
import dataTypes, { 
	DATA_TYPE_ATOMIC,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY, 
} from 'structures/dataTypes.js';
import { 
	DIALOG_PROP,
	DIALOG_DELETE_CONFIRM, 
} from 'consts/dialog.js';
import KeyComponent from './KeyComponent.jsx';
import ValueComponent from './ValueComponent.jsx';
import TypeComponent from './TypeComponent.jsx';
import onMount from './onMount.js';
import onClose from './onClose.js';
import onChangeName from '../Func/onChangeName.js';
import onSave from './onSave.js';
import onDelete from './onDelete.js';
import onSelectDataTypeId from './onSelectDataTypeId.js';
import onCheckVariable from './onCheckVariable.js';

let Prop = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_PROP]);
	const existId = (dialog || {}).id || 0;
	const workspaceId = (dialog || {}).workspaceId ?? 0;
	const scriptId = (dialog || {}).scriptId ?? 0;
	const fromEntityId = (dialog || {}).fromEntityId ?? 0;
	const fromArrowTypeId = (dialog || {}).fromArrowTypeId ?? process.env.ARROW_TYPE_DEFAULT;
	const id = useSelector((state) => state.prop.id);
	const name = useSelector((state) => state.prop.name || '');
	const asVariable = useSelector((state) => !!state.prop.as_variable);
	const dataTypeId = useSelector((state) => ((state.jsObject.data || {})[0] || {}).data_type_id ?? DATA_TYPE_ATOMIC.id);
	console.log('fromEntityId', fromEntityId);
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
	const _onClose = React.useCallback((e) => onClose(e, workspaceId), [
		workspaceId
	]);
	const _dialogOpenFlag = !!dialog;

	// onMount
	// TODO: если fromEntityId и fromArrowTypeId undefined закрывать окно
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
			onClose={_onClose}>
			<DialogTitle>
				<Header onClose={_onClose}>
					{id >= 1
						? 'Параметр: '+ name
						: 'Добавить параметр'}
				</Header>
			</DialogTitle>
			{_dialogOpenFlag
				? <React.Fragment>
					<DialogContent dividers>
						<Box 
							pt={2}
							pb={6}>
							<InputText 
								required
								name="name"
								label="Название"
								helperText="Для быстрого поиска придумайте название или краткое описание"
								value={name}
								onChange={onChangeName('prop')} />
						</Box>
						<Divider />
						<Box py={2}>
							<FormControlLabel
								onChange={onCheckVariable}
								label={<React.Fragment>
									<Typography>
										Переменная
									</Typography>
									<Typography variant="caption">
										Возможность перезаписывать контент пераметра во время выполнения программы
									</Typography>
								</React.Fragment>}
								control={<Checkbox 
									name="as_variable"
									checked={asVariable} />} />
						</Box>
						<Divider />
						<Box
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							pt={4}
							pb={2}>
							<Typography variant="h6">
								Данные:
							</Typography>
							<Box
								position="relative"
								width="300px">
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
							onClick={_onClose}>
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

Prop = React.memo(Prop);
Prop.defaultProps = {
};

export default Prop;
