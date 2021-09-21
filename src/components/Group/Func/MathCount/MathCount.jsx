import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SelectArithmetic from 'components/Select/Arithmetic';
import InputNumeric from 'components/Input/Numeric';

let MathCount = ({ scriptId }) => {
	return <React.Fragment>
		<Box mt={2} />
		<Grid 
			container
			spacing={3}>
			<Grid 
				item
				xs={true}>
				<InputNumeric
					menu
					name="prop-1"
					label="Первое значение"
					placeholder="Число"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
			<Grid 
				item
				xs={3}>
				<SelectArithmetic name="prop-2" />
			</Grid>
			<Grid 
				item
				xs={true}>
				<InputNumeric
					menu
					name="prop-3"
					label="Второе значение"
					placeholder="Число"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
		</Grid>
	</React.Fragment>;
};

MathCount = React.memo(MathCount);
MathCount.defaultProps = {
	scriptId: 0,
};

export default MathCount;
