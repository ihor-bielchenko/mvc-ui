import React from 'react';
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import Filter from '../Filter';
import Sort from '../Sort';
import Query from '../Query';

const StepperWrapper = styled(Stepper)`
	& .MuiStepLabel-root.MuiStepLabel-vertical.not-current-step {
		cursor: pointer !important;
		&:hover {
			& .MuiTypography-root.MuiTypography-h6 {
				color: #f50057 !important;
			}
		}
	}
`;
let Search = () => {
	const [ step, setStep ] = React.useState(() => 0);

	return <React.Fragment>
		<StepperWrapper 
			orientation="vertical"
			activeStep={step}>
			<Step>
				<StepLabel 
					onClick={() => step !== 0 && setStep(0)}
					className={step === 0 
						? 'current-step' 
						: 'not-current-step'}>
					<Typography variant="h6">
						Фильтры:
					</Typography>
				</StepLabel>
				<StepContent>
					<Filter />
				</StepContent>
			</Step>
			<Step>
				<StepLabel 
					onClick={() => step !== 1 && setStep(1)}
					className={step === 1
						? 'current-step' 
						: 'not-current-step'}>
					<Typography variant="h6">
						Сортировка:
					</Typography>
				</StepLabel>
				<StepContent>
					<Sort />
				</StepContent>
			</Step>
			<Step>
				<StepLabel 
					onClick={() => step !== 2 && setStep(2)}
					className={step === 2
						? 'current-step' 
						: 'not-current-step'}>
					<Typography variant="h6">
						Поисковой запрос:
					</Typography>
				</StepLabel>
				<StepContent>
					<Query />
				</StepContent>
			</Step>
		</StepperWrapper>
	</React.Fragment>;
};

Search = React.memo(Search);
Search.defaultProps = {
};

export default Search;
