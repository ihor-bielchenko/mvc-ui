import React from 'react';
import Box from '@material-ui/core/Box';
import InputText from 'components/Input/Text';

let HashCrypto = () => {
	return <React.Fragment>
		<InputText
			menu
			name="prop-1"
			label="Пароль"
			helperText="Выберите созданный параметр или укажите значение вручную" />
		<Box mt={3}>
			<InputText
				menu
				name="prop-2"
				label="Ключ"
				helperText="Выберите созданный параметр или укажите значение вручную" />
		</Box>
	</React.Fragment>;
};

HashCrypto = React.memo(HashCrypto);
HashCrypto.defaultProps = {
};

export default HashCrypto;
