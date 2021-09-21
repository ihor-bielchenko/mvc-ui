import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { DIALOG_DB_QUERY } from 'consts/dialog.js';

const onSubmit = (e, logicValue, setLogicValue = () => {}) => {
	e.preventDefault();

	const prop = Store().getState().prop;
	const target = e.currentTarget;
	const id = Number(target.elements['id'].value);
	const value = logicValue || target.elements['value'].value;
	const left = target.elements['left'].checked;
	const right = target.elements['right'].checked;

	if (!prop.tempValue['query']) {
		prop.tempValue['query'] = {};
	}
	if (id > 0 && prop.tempValue.query[id]) {
		prop.tempValue.query[id]['value'] = value;
		prop.tempValue.query[id]['left'] = left;
		prop.tempValue.query[id]['right'] = right;
		setLogicValue(undefined);
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
		onClose(DIALOG_DB_QUERY)();
	}
	else if (id === 0) {
		const _id = Date.now();

		prop.tempValue.query[_id] = {
			id: _id,
			value,
			left,
			right,
		};
		setLogicValue(undefined);
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
		onClose(DIALOG_DB_QUERY)();
	}
};

export default onSubmit;
