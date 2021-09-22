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
import { SOURCE_DB } from 'structures/source.js';
import onClose from '../onClose.js';
import Select from './Select';
import Filter from './Filter';
import Sort from './Sort';
import Query from './Query';
import onSave from './onSave.js';
import onUnmount from './onUnmount.js';

let SourceDb = () => {
	const dialog = useSelector((state) => state.dialogs[SOURCE_DB.id]);
	const bodyId = (dialog || {}).name;
	const issetSelectData = useSelector((state) => (state.prop.tempValue.select || []).length > 0);
	const filterFormId = useSelector((state) => state.prop.filterFormId);
	const sortFormId = useSelector((state) => state.prop.sortFormId);
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
		onClose(SOURCE_DB.id)(e, reason);
		setStep(0);
		onUnmount();
	}, [
		setStep,
	]);
	const _onSave = React.useCallback((e) => onSave(e, bodyId, _onClose), [
		bodyId,
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
							<Select id={bodyId} />
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
