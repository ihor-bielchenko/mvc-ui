import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputText from 'components/Input/Text';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Store from 'components/Store';
import Header from 'components/Header';
import MenuSource from 'components/Menu/Source';
import Transition from 'components/Dialog/Transition.jsx';
import onMenu from 'components/Menu/onMenu.js';
import onDialog from 'components/Dialog/onDialog.js';
import { 
	DIALOG_PROP,
	DIALOG_DELETE_CONFIRM, 
} from 'consts/dialog.js';
import onMount from './onMount.js';
import onClose from './onClose.js';
import onAddValue from './onAddValue.js';
import onDeleteValue from './onDeleteValue.js';
import onComplexValue from './onComplexValue.js';
import onComplexDelete from './onComplexDelete.js';
import onChangeName from './onChangeName.js';
import onChangeValue from './onChangeValue.js';
import onSave from './onSave.js';
import onDelete from './onDelete.js';

let Body = () => {
	const bodyKeys = useSelector((state) => Object.keys(state.prop.body));
	const bodyData = Store().getState().prop.body;

	return bodyKeys.map((id) => {
		const _id = id.toString();

		return <Box 
			key={id}
			py={2}>
			<Grid 
				container
				spacing={2}>
				<Grid
					item
					xs={true}>
					<InputText
						menu
						onMenu={onMenu(_id)}
						onValue={onComplexValue}
						onDelete={onComplexDelete}
						name={_id}
						id={_id}
						defaultValue={bodyData[id]}
						onChange={onChangeValue(id)} />
					<MenuSource aria={_id} />
				</Grid>
				{bodyKeys.length > 1
					? <Grid
						item
						xs="auto">
						<IconButton 
							color="secondary"
							onClick={onDeleteValue(id)}>
							<DeleteIcon />
						</IconButton>
					</Grid>
					: <React.Fragment />}
			</Grid>
		</Box>;
	});
};
Body = React.memo(Body);
Body.defaultProps = {
};

let Prop = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_PROP]);
	const existId = (dialog || {}).id || 0;
	const id = useSelector((state) => state.prop.id);
	const name = useSelector((state) => state.prop.name || '');
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
						? 'Значение: '+ name
						: 'Добавить значение'}
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
								helperText="Для быстрого поиска значения придумайте название или краткое описание"
								value={name}
								onChange={onChangeName} />
						</Box>
						<Box py={2}>
							<Typography variant="h6">
								Данные:
							</Typography>
						</Box>
						<Body />
						<Box py={1}>
							<Button 
								variant="outlined"
								color="primary"
								startIcon={<AddIcon />}
								onClick={onAddValue}>
								Добавить поле
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
