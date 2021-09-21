import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputText from 'components/Input/Text';

let TextReplace = () => {
	return <React.Fragment>
		<Box mt={2} />
		<Grid 
			container
			spacing={3}>
			<Grid 
				item
				xs={8}>
				<Box>
					<InputText
						menu
						name="prop-1"
						label="Значение"
						placeholder="Текст или число"
						helperText="Выберите созданный параметр или укажите значение вручную" />
				</Box>
				<Box mt={4}>
					<InputText
						menu
						name="prop-3"
						label="Новое значение после замены"
						placeholder="Текст или число"
						helperText="Выберите созданный параметр или укажите значение вручную" />
				</Box>
			</Grid>
			<Grid 
				item
				xs={4}>
				<InputText
					menu
					name="prop-2"
					label="Что нужно заменить"
					placeholder="Часть текста или регулярное выражение"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
		</Grid>
	</React.Fragment>;
};

TextReplace = React.memo(TextReplace);
TextReplace.defaultProps = {
};

export default TextReplace;
