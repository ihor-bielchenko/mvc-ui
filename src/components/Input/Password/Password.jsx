import React from 'react';
import { getLang } from 'components/Language';
import Input from '../Input.jsx';

let Password = (props) => {
	return <Input 
		{ ...props } 
		type="password" />;
};

Password = React.memo(Password);
Password.defaultProps = {
	placeholder: getLang('cmpInputPassword'),
};

export default Password;