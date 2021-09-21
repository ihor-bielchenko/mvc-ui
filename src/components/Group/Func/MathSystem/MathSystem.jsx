import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputNumeric from 'components/Input/Numeric';

let MathSystem = ({ scriptId }) => {
	return <React.Fragment>
		<Box mt={2} />
		<Box pb={3}>
			<Grid 
				container
				spacing={3}>
				<Grid 
					item
					xs={6}>
					<InputNumeric
						menu
						name="prop-1"
						label="Число для преобразования"
						placeholder="Число"
						helperText="Выберите созданный параметр или укажите значение вручную" />
				</Grid>
				<Grid 
					item
					xs={6} />
			</Grid>
		</Box>
		<Grid 
			container
			spacing={3}>
			<Grid 
				item
				xs={6}>
				<InputNumeric
					menu
					name="prop-2"
					label="Основание системы счисления"
					placeholder="Число"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
			<Grid 
				item
				xs={6}>
				<InputNumeric
					menu
					name="prop-3"
					label="Основание системы счисления для преобразования"
					placeholder="Число"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
		</Grid>
	</React.Fragment>;
};

MathSystem = React.memo(MathSystem);
MathSystem.defaultProps = {
	scriptId: 0,
};

export default MathSystem;
