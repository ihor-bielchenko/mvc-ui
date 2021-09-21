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
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from 'components/Header';
import InputText from 'components/Input/Text';
import SelectType from 'components/Select/Type';
import Transition from 'components/Dialog/Transition.jsx';
import onDialog from 'components/Dialog/onDialog.js';
import columnTypes, { 
	COLUMN_OBJ,
	COLUMN_ARR, 
} from 'structures/columnTypes.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import { 
	DIALOG_PROP,
	DIALOG_DELETE_CONFIRM, 
} from 'consts/dialog.js';
import Body from './Body.jsx';
import onMount from './onMount.js';
import onClose from './onClose.js';
import onAddValue from './onAddValue.js';
import onChangeName from './onChangeName.js';
import onSave from './onSave.js';
import onDelete from './onDelete.js';
import onSelectFormatId from './onSelectFormatId.js';

let Prop = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_PROP]);
	const existId = (dialog || {}).id || 0;
	const id = useSelector((state) => state.prop.id);
	const name = useSelector((state) => state.prop.name || '');
	const formatId = useSelector((state) => state.prop.format_id || FORMAT_ATOMIC.id);
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
						<Box py={2}>
							<InputText 
								required
								name="name"
								label="Название"
								helperText="Для быстрого поиска параметра придумайте название или краткое описание"
								value={name}
								onChange={onChangeName} />
						</Box>
						<Box
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							height="80px"
							pt={8}
							pb={4}>
							<Typography variant="h6">
								Содержимое параметра:
							</Typography>
							<Box
								position="relative"
								width="300px">
								<SelectType
									label="Многомерный формат"
									name="format_id"
									value={formatId}
									onSelect={onSelectFormatId}
									onFilter={(key) => columnTypes[key].id === COLUMN_OBJ.id
										|| columnTypes[key].id === COLUMN_ARR.id}>
									<MenuItem value={FORMAT_ATOMIC.id}>
										{FORMAT_ATOMIC.text()}
									</MenuItem>
								</SelectType>
							</Box>
						</Box>
						{formatId === COLUMN_OBJ.id
							? <Typography 
								variant="h4"
								color="textSecondary"
								style={{ lineHeight: '0px' }}>
								<b>{'{'}</b>
							</Typography>
							: formatId === COLUMN_ARR.id
								? <Typography
									variant="h4"
									color="textSecondary"
									style={{ lineHeight: '0px' }}>
									<b>{'['}</b>
								</Typography>
								: <React.Fragment />}
						<Body formatId={formatId} />
						{formatId === COLUMN_OBJ.id
							? <Typography 
								variant="h4"
								color="textSecondary">
								<b>{'}'}</b>
							</Typography>
							: formatId === COLUMN_ARR.id
								? <Typography 
									variant="h4"
									color="textSecondary">
									<b>{']'}</b>
								</Typography>
								: <React.Fragment />}
						<Box py={1}>
							<Button 
								variant="outlined"
								color="primary"
								startIcon={<AddIcon />}
								onClick={onAddValue}>
								Добавить элемент
							</Button>
						</Box>
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
