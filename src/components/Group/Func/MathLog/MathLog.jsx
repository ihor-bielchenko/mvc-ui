import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SelectMathLog from 'components/Select/MathLog';
import InputNumeric from 'components/Input/Numeric';
import onSelect from './onSelect.js';

let MathLog = ({ scriptId }) => {
	const mathLogId = useSelector((state) => ((state.func[scriptId] || {}).props || {}).math_log_id || '');
	const _onSelect = React.useCallback((e) => onSelect(e, scriptId), [
		scriptId,
	]);
	const checkMathLogId = mathLogId === 3;

	return <React.Fragment>
		<Box mt={2} />
		<Grid 
			container
			spacing={3}>
			<Grid 
				item
				xs={checkMathLogId
					? 4
					: 8}>
				<SelectMathLog 
					name="prop-1"
					value={mathLogId}
					onSelect={_onSelect} />
			</Grid>
			<Grid 
				item
				xs={checkMathLogId
					? 4
					: 4}>
				<InputNumeric
					required
					menu
					name="prop-2"
					label="Число, для которого необходимо вычислить логарифм"
					placeholder="Число"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
			{checkMathLogId
				? <Grid 
					item
					xs={4}>
					<InputNumeric
						menu
						name="prop-2"
						label="Необязательное основание логарифма"
						defaultValue={2.7182818}
						placeholder="Число"
						helperText="Выберите созданный параметр или укажите значение вручную" />
				</Grid>
				: <React.Fragment />}
		</Grid>
	</React.Fragment>;
};

MathLog = React.memo(MathLog);
MathLog.defaultProps = {
	scriptId: 0,
};

export default MathLog;
