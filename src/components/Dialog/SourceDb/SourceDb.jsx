import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Header from 'components/Header';
import Select from 'components/Group/Db/Select';
import Filter from 'components/Group/Db/Filter';
import Sort from 'components/Group/Db/Sort';
import Query from 'components/Group/Db/Query';
import onUnmount from 'components/Dialog/SourceCookie/onUnmount.js';
import { SOURCE_TYPE_DB } from 'structures/sourceTypes.js';
import onClose from '../onClose.js';
import onSave from './onSave.js';
import onEdit from './onEdit.js';

let SourceDb = () => {
	const dialog = useSelector((state) => state.dialogs[SOURCE_TYPE_DB.id]);
	const id = (dialog || {}).id;
	const isEditFlag = (dialog || {}).isEditFlag || false;
	const isCollection = (dialog || {}).isCollection;
	const issetSelectData = useSelector((state) => (state.jsObject.tempValue.select || []).length > 0);
	const filterFormId = useSelector((state) => state.jsObject.filterFormId);
	const sortFormId = useSelector((state) => state.jsObject.sortFormId);
	const [ step, setStep ] = React.useState(() => 0);
	const _onNext = React.useCallback(() => setStep((value) => value < 3
		? (value + 1)
		: value), [
		setStep,
	]);
	const _onBack = React.useCallback(() => setStep((value) => value > 0
		? (value - 1)
		: value), [
		setStep,
	]);
	const _onClose = React.useCallback((e, reason) => {
		onClose(SOURCE_TYPE_DB.id)(e, reason);
		setStep(0);
		onUnmount();
	}, [
		setStep,
	]);
	const _onSave = React.useCallback((e) => isEditFlag
		? onEdit(e, id, _onClose)
		: onSave(e, id, _onClose), [
		isEditFlag,
		id,
		_onClose,
	]);

	return !!dialog
		? <Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="md"
			open={!!dialog}
			onClose={_onClose}>
			<DialogTitle>
				<Header onClose={_onClose}>
					Значение из базы данных
				</Header>
			</DialogTitle>
			<DialogContent dividers>
				<Stepper 
					orientation="vertical"
					activeStep={step}>
					<Step>
						<StepLabel>
							<Typography variant="h6">
								Настройка данных
							</Typography>
						</StepLabel>
						<StepContent>
							<Select 
								id={id}
								isCollection={isCollection} />
						</StepContent>
					</Step>
					<Step>
						<StepLabel>
							<Typography variant="h6">
								Фильтры
							</Typography>
						</StepLabel>
						<StepContent>
							<Filter />
						</StepContent>
					</Step>
					<Step>
						<StepLabel>
							<Typography variant="h6">
								Сортировка
							</Typography>
						</StepLabel>
						<StepContent>
							<Sort />
						</StepContent>
					</Step>
					<Step>
						<StepLabel>
							<Typography variant="h6">
								Поиск
							</Typography>
						</StepLabel>
						<StepContent>
							<Query />
						</StepContent>
					</Step>
				</Stepper>
				<DialogActions style={{ justifyContent: 'space-between' }}>
					<Button 
						disabled={step <= 0 || filterFormId >= 0 || sortFormId >= 0}
						variant="outlined"
						color="secondary"
						startIcon={<NavigateBeforeIcon />}
						onClick={_onBack}>
						Назад
					</Button>
					{step >= 3
						? <Button 
							variant="outlined"
							color="primary"
							endIcon={<NavigateNextIcon />}
							onClick={_onSave}>
							Сохранить
						</Button>
						: <Button 
							disabled={!issetSelectData || filterFormId >= 0 || sortFormId >= 0}
							variant="outlined"
							color="primary"
							endIcon={<NavigateNextIcon />}
							onClick={_onNext}>
							Далее
						</Button>}
				</DialogActions>
			</DialogContent>
		</Dialog>
		: <React.Fragment />;
};

SourceDb = React.memo(SourceDb);
SourceDb.defaultProps = {
};

export default SourceDb;
