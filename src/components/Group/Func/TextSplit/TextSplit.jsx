import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputText from 'components/Input/Text';

let TextSplit = () => {
	return <React.Fragment>
		<Box mt={2} />
		<Grid 
			container
			spacing={3}>
			<Grid 
				item
				xs={8}>
				<InputText
					menu
					name="prop-1"
					label="Значение"
					placeholder="Текст или число"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
			<Grid 
				item
				xs={4}>
				<InputText
					menu
					name="prop-2"
					label="Символ разделения"
					placeholder="Текст или число"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
		</Grid>
	</React.Fragment>;
};

TextSplit = React.memo(TextSplit);
TextSplit.defaultProps = {
};

export default TextSplit;
