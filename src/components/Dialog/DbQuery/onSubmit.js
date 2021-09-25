import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { DIALOG_DB_QUERY } from 'consts/dialog.js';

const onSubmit = (e, logicValue, setLogicValue = () => {}) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;
	const target = e.currentTarget;
	const id = Number(target.elements['id'].value);
	const value = logicValue || target.elements['value'].value;
	const left = target.elements['left'].checked;
	const right = target.elements['right'].checked;

	if (!jsObject.tempValue['query']) {
		jsObject.tempValue['query'] = {};
	}
	if (id > 0 && jsObject.tempValue.query[id]) {
		jsObject.tempValue.query[id]['value'] = value;
		jsObject.tempValue.query[id]['left'] = left;
		jsObject.tempValue.query[id]['right'] = right;
		setLogicValue(undefined);
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
		onClose(DIALOG_DB_QUERY)();
	}
	else if (id === 0) {
		const _id = Date.now();

		jsObject.tempValue.query[_id] = {
			id: _id,
			value,
			left,
			right,
		};
		setLogicValue(undefined);
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
		onClose(DIALOG_DB_QUERY)();
	}
};

export default onSubmit;
