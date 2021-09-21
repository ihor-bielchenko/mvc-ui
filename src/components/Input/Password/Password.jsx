import React from 'react';
import Input from '../Input.jsx';

let Password = (props) => {
	return <Input 
		{ ...props } 
		type="password" />;
};

Password = React.memo(Password);
Password.defaultProps = {
	placeholder: 'Пароль',
};

export default Password;