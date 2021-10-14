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
import SelectFormat from 'components/Select/Format';
import Transition from 'components/Dialog/Transition.jsx';
import onDialog from 'components/Dialog/onDialog.js';
import format, { 
	FORMAT_ATOMIC,
	FORMAT_OBJ,
	FORMAT_ARR, 
} from 'structures/format.js';
import { 
	DIALOG_PROP,
	DIALOG_DELETE_CONFIRM, 
} from 'consts/dialog.js';
import KeyComponent from './KeyComponent.jsx';
import ValueComponent from './ValueComponent.jsx';
import TypeComponent from './TypeComponent.jsx';
import onMount from './onMount.js';
import onClose from './onClose.js';
import onChangeName from './onChangeName.js';
import onSave from './onSave.js';
import onDelete from './onDelete.js';
import onSelectFormatId from './onSelectFormatId.js';
import onCheckVariable from './onCheckVariable.js';

let Prop = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_PROP]);
	const existId = (dialog || {}).id || 0;
	const id = useSelector((state) => state.prop.id);
	const name = useSelector((state) => state.prop.name || '');
	const asVariable = useSelector((state) => !!state.prop.as_variable);
	const formatId = useSelector((state) => (state.jsObject.data[0] || {}).type_id ?? FORMAT_ATOMIC.id);
	const _onDelete = React.useCallback((e) => onDelete(e, id), [
		id,
	]);
	const _dialogOpenFlag = !!dialog;

	// onMount
	React.useEffect(() => {
		if (_dialogOpenFlag && existId > 0) {
			onMount(existId);
		}
	}, [
		_dialogOpenFlag,
		existId,
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
								helperText="Для быстрого поиска параметра придумайте название или краткое описание"
								value={name}
								onChange={onChangeName} />
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
							height="80px"
							pt={5}
							pb={4}>
							<Typography variant="h6">
								Контент:
							</Typography>
							<Box
								position="relative"
								width="300px">
								<SelectFormat
									label="Многомерный формат"
									name="format_id"
									value={formatId}
									onSelect={onSelectFormatId}
									onFilter={(key) => format[key].id === FORMAT_ATOMIC.id
										|| format[key].id === FORMAT_OBJ.id
										|| format[key].id === FORMAT_ARR.id} />
							</Box>
						</Box>
						<JsObject 
							typeId={formatId}
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
									onClick={onSave}>
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
								onClick={onSave}>
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
