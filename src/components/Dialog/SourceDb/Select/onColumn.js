import Store from 'components/Store';

const onColumn = (e) => {
	const target = e.target;
	const checked = target.checked;
	const value = Number(target.value);

	if (value > 0) {
		const prop = Store().getState().prop;
		const select = [ ...(prop.tempValue.select || []) ];
		const findIndex = select.findIndex((id) => id === value);

		if (checked && findIndex === -1) {
			select.push(value);
		}
		else if (!checked && findIndex >= 0) {
			select.splice(findIndex, 1);
		}
		prop.tempValue.select = select;
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
};

export default onColumn;
