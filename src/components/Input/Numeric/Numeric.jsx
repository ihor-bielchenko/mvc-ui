import React from 'react';
import { getLang } from 'components/Language';
import Input from '../Input.jsx';
import onValidate from './onValidate.js';

let Numeric = ({ onInput, ...props }) => {
	const _onInput = React.useCallback((e) => {
		onValidate(e);

		if (typeof onInput === 'function') {
			onInput(e);
		}
	}, [
		onInput,
	]);

	return <Input { ...props } onInput={_onInput} />;
};

Numeric = React.memo(Numeric);
Numeric.defaultProps = {
	placeholder: getLang('cmpInputNumericOnly'),
};

export default Numeric;