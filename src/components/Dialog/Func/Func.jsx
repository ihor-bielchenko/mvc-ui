import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from 'components/Header';
import InputText from 'components/Input/Text';
import SelectFuncCategory from 'components/Select/FuncCategory';
import SelectFuncTemplate from 'components/Select/FuncTemplate';
import GroupFunc from 'components/Group/Func';
import Transition from 'components/Dialog/Transition.jsx';
import onDialog from 'components/Dialog/onDialog.js';
import funcTemplates from 'structures/funcTemplates.js';
import { 
	DIALOG_FUNC,
	DIALOG_DELETE_CONFIRM, 
} from 'consts/dialog.js';
import onMount from './onMount.js';
import onClose from './onClose.js';
import onChangeName from './onChangeName.js';
import onSave from './onSave.js';
import onDelete from './onDelete.js';
import onSelectCategory from './onSelectCategory.js';
import onSelectTemplate from './onSelectTemplate.js';

let Func = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_FUNC]);
	const existId = (dialog || {}).id || 0;
	const workspaceId = (dialog || {}).workspaceId ?? 0;
	const scriptId = (dialog || {}).scriptId ?? 0;
	const fromEntityId = (dialog || {}).fromEntityId ?? 0;
	const fromArrowTypeId = (dialog || {}).fromArrowTypeId ?? process.env.ARROW_TYPE_DEFAULT;
	const id = useSelector((state) => state.func.id);
	const name = useSelector((state) => state.func.name || '');
	const templateId = useSelector((state) => state.func.template_id || '');
	const categoryId = useSelector((state) => state.func.category_id ?? funcTemplates[state.func.template_id].category_id);
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
						? 'Функция: '+ name
						: 'Добавить функцию'}
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
								onChange={onChangeName('func')} />
						</Box>
						<Box py={2}>
							<SelectFuncCategory
								value={categoryId}
								onSelect={onSelectCategory} />
						</Box>
						<Box py={2}>
							<SelectFuncTemplate
								categoryId={categoryId}
								value={templateId}
								onSelect={onSelectTemplate} />
						</Box>
						{templateId > 0
							? <GroupFunc 
								scriptId={scriptId}
								workspaceId={workspaceId}
								funcId={id}
								templateId={templateId} />
							: <React.Fragment />}
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

Func = React.memo(Func);
Func.defaultProps = {
};

export default Func;
