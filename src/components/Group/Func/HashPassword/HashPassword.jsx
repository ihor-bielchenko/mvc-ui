import React from 'react';
// import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputNumeric from 'components/Input/Numeric';

let HashPassword = ({ scriptId }) => {
	return <React.Fragment>
		<InputNumeric
			menu
			name="prop-1"
			label="Длина пароля (минимум 5 символов)"
			placeholder="5"
			helperText="Выберите созданный параметр или укажите значение вручную" />
		<Box mt={2}>
			<FormControlLabel
				control={<Checkbox
					name="prop-2" />}
				label="Включить специальные символы" />
		</Box>
		<Box mt={2}>
			<FormControlLabel
				control={<Checkbox
					name="prop-2" />}
				label="Включить использование заглавных букв" />
		</Box>
		<Box mt={2}>
			<FormControlLabel
				control={<Checkbox
					name="prop-3" />}
				label="Включить использование цифр" />
		</Box>
	</React.Fragment>;
};

HashPassword = React.memo(HashPassword);
HashPassword.defaultProps = {
	scriptId: 0,
};

export default HashPassword;

