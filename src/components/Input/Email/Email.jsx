import React from 'react';
import { getLang } from 'components/Language';
import Input from '../Input.jsx';
import onValidate from './onValidate.js';

let Email = ({ 
	onInput,
	...props 
}) => {
	const _onInput = React.useCallback((e) => {
		onValidate(e);
		if (typeof onInput === 'function') {
			onInput(e);
		}
	}, [
		onInput,
	]);
	
	return <Input 
		{ ...props } 
		type="text"
		onInput={_onInput} />;
};

Email = React.memo(Email);
Email.defaultProps = {
	label: getLang('cmpInputEmail'),
	placeholder: 'example@mail.com',
	onInput: () => {},
};

export default Email;