import React from 'react';
import Box from '@material-ui/core/Box';
import InputText from 'components/Input/Text';

let TextBase = () => {
	return <Box>
		<InputText
			menu
			name="prop-1"
			label="Какое значение нужно проверить?"
			placeholder="Текст"
			helperText="Выберите созданный параметр или укажите значение вручную" />
	</Box>;
};

TextBase = React.memo(TextBase);
TextBase.defaultProps = {
};

export default TextBase;
