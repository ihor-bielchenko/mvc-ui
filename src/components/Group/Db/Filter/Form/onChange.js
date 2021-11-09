import Store from 'components/Store';
import setDefaultItem from './setDefaultItem.js';

const onChange = (e, id) => {
	const jsObject = Store().getState().jsObject;

	jsObject.tempValue = setDefaultItem(jsObject.tempValue, id);
	jsObject.tempValue.filter[id].value = e.target.value;
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onChange;
