import Store from 'components/Store';
import onValidate from 'components/Input/Validate/keyStr.js';

const onChangeKey = (e, id, columnId) => {
	const jsObject = Store().getState().jsObject;

	onValidate(e);

	if (typeof jsObject.data[id] === 'object'
		&& typeof jsObject.data[id].value === 'object'
		&& typeof jsObject.data[id].value.columns === 'object') {
		jsObject.data[id].value.columns[columnId] = e.target.value;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onChangeKey;
