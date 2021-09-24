import Store from 'components/Store';
// import switchFormatId from './switchFormatId.js';

const onColumn = (e, id) => {
	const target = e.target;
	const checked = target.checked;
	const value = Number(target.value);

	if (value > 0) {
		let jsObject = Store().getState().jsObject;
		const select = [ ...(jsObject.tempValue.select || []) ];
		const findIndex = select.findIndex((id) => id === value);

		if (checked && findIndex === -1) {
			select.push(value);
		}
		else if (!checked && findIndex >= 0) {
			select.splice(findIndex, 1);
		}
		jsObject.tempValue.select = select;
		// jsObject = switchFormatId(id, jsObject);

		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onColumn;
