import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import { DIALOG_DB_QUERY } from 'consts/dialog.js';
import Filter from '../Filter';
import Sort from '../Sort';
import Query from '../Query';
import { getLang } from 'components/Language';

const StepperWrapper = styled(Stepper)`
	& .MuiStepLabel-root.MuiStepLabel-vertical.not-current-step {
		cursor: pointer !important;
		width: max-content;
		&:hover {
			& .MuiTypography-root.MuiTypography-h6 {
				color: #f50057 !important;
			}
		}
	}
`;
let Search = ({ 
	disabledQuery,
	disabledSource, 
	disabledSort,
}) => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_DB_QUERY]);
	const queryFormId = (dialog || {}).id || 0;
	const filterFormId = useSelector((state) => state.jsObject.filterFormId);
	const sortFormId = useSelector((state) => state.jsObject.sortFormId);
	const [ step, setStep ] = React.useState(() => 0);
	const disabled = queryFormId > 0
		|| filterFormId >= 0
		|| sortFormId >= 0;

	return <React.Fragment>
		<StepperWrapper 
			orientation="vertical"
			activeStep={step}>
			<Step>
				<StepLabel 
					className={disabled
						? ''
						: (step === 0 
							? 'current-step' 
							: 'not-current-step')}>
					<Typography 
						onClick={() => (!disabled && step !== 0) && setStep(0)}
						component="span"
						variant="h6">
						{getLang('Filters')}:
					</Typography>
				</StepLabel>
				<StepContent>
					<Filter disabledSource={disabledSource} />
				</StepContent>
			</Step>
			{disabledSort
				? <React.Fragment />
				: <Step>
					<StepLabel 
						className={disabled
							? ''
							: (step === 1
								? 'current-step' 
								: 'not-current-step')}>
						<Typography 
							onClick={() => (!disabled && step !== 1) && setStep(1)}
							component="span"
							variant="h6">
							{getLang('Sort')}:
						</Typography>
					</StepLabel>
					<StepContent>
						<Sort />
					</StepContent>
				</Step>}
			{disabledQuery 
				? <React.Fragment />
				: <Step>
					<StepLabel 
						className={disabled
							? ''
							: (step === 2
								? 'current-step' 
								: 'not-current-step')}>
						<Typography 
							onClick={() => (!disabled && step !== 2) && setStep(2)}
							component="span"
							variant="h6">
							{getLang('Quest2')}:
						</Typography>
					</StepLabel>
					<StepContent>
						<Query disabledSource={disabledSource} />
					</StepContent>
				</Step>}
		</StepperWrapper>
	</React.Fragment>;
};

Search = React.memo(Search);
Search.defaultProps = {
	disabledQuery: false,
	disabledSource: false,
	disabledSort: false,
};

export default Search;
