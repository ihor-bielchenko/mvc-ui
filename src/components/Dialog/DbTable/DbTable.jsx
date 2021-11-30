import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Title from 'components/Title';
import InputText from 'components/Input/Text';
import GroupDbColumns from 'components/Database/Columns';
import GroupDbList from 'components/Database/List';
import Transition from 'components/Dialog/Transition.jsx';
import onDialog from 'components/Dialog/onDialog.js';
import { 
	DIALOG_DB_TABLE,
	DIALOG_DELETE_CONFIRM, 
} from 'consts/dialog.js';
import onClose from '../onClose.js';
import onSave from './onSave.js';

let DbTable = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_DB_TABLE]);
	const _dialogOpenFlag = !!dialog;
	const id = (dialog || {}).id;
	const tableName = useSelector((state) => (state.db.tables[id] || {}).name);
	const [ tab, setTab ] = React.useState((state) => 0);
	const _onTab = React.useCallback((e, newValue) => setTab(newValue), [
		setTab,
	]);
	const _onSave = React.useCallback((e) => onSave(e, id), [
		id,
	]);
	const _onDelete = React.useCallback((e) => {}, []);

	return _dialogOpenFlag
		? <Dialog
			fullScreen
			TransitionComponent={Transition}
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="lg"
			open={_dialogOpenFlag}
			onClose={onClose(DIALOG_DB_TABLE)}>
			<DialogTitle>
				<Title onClose={onClose(DIALOG_DB_TABLE)}>
					{tableName
						? <React.Fragment>
							Таблица <b>{tableName}</b>
						</React.Fragment>
						: 'Новая таблица'}
				</Title>
			</DialogTitle>
			{_dialogOpenFlag
				? <React.Fragment>
					<DialogContent dividers>
						<Box 
							pt={2}
							pb={4}>
							<InputText
								disabled
								name="name"
								label="Название таблицы"
								defaultValue={tableName} />
						</Box>
						<Tabs 
							indicatorColor="secondary"
							value={tab}
							onChange={_onTab}>
							<Tab 
								value={0}
								label="Структура" />
							<Tab
								value={1} 
								label="Список данных" />
						</Tabs>
						{tab === 0
							? <GroupDbColumns id={id} />
							: <React.Fragment />}
						{tab === 1
							? <GroupDbList id={id} />
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
							onClick={onClose(DIALOG_DB_TABLE)}>
							Отмена
						</Button>
						{tab === 0
							? id >= 1
								? <ButtonGroup>
									<Button
										variant="outlined"
										color="primary"
										startIcon={<SaveIcon />}
										onClick={_onSave}>
										Сохранить
									</Button>
									<Button
										disabled={true}
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
									variant="outlined"
									color="primary"
									startIcon={<SaveIcon />}
									onClick={_onSave}>
									Сохранить
								</Button>
							: <React.Fragment />}
					</Box>
					</DialogActions>
				</React.Fragment>
				: <React.Fragment />}
		</Dialog>
		: <React.Fragment />;
};

DbTable = React.memo(DbTable);
DbTable.defaultProps = {
};

export default DbTable;
