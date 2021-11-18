import Store from 'components/Store';
import setDefaultItem from './setDefaultItem.js';

const onOperatorIf = (e, id) => {
	const value = Number(e.target.value);
	const jsObject = Store().getState().jsObject;

	if (value >= 0) {
		jsObject.tempValue = setDefaultItem(jsObject.tempValue, id);
		jsObject.tempValue.filter[id].operator_if_id = Number(e.target.value);
		
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onOperatorIf;
