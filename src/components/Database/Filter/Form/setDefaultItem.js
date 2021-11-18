
const setDefaultItem = (tempValue, id) => {
	if (!tempValue.filter) {
		tempValue.filter = {};
	}
	if (!tempValue.filter[id]) {
		tempValue.filter[id] = {
			id,
			column_id: '',
			operator_if_id: '',
			value: '',
		};
	}
	return tempValue;
};

export default setDefaultItem;
