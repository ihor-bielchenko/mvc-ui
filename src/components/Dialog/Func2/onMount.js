import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchFuncOne from 'fetch/funcOne.js';
import axiosError from 'utils/axiosError.js';
import parseSourceValue from 'utils/parseSourceValue.js';

const onMount = async (id) => {
	const func = Store().getState().func;

	onLoader(true);

	try {
		const response = await fetchFuncOne(id);
		const data = ((response || {}).data || {}).data || {};

		func.id = id;
		func.func_entity_id = data.entity_id;
		func.name = data.name;
		func.func_template_id = data.func_template_id;
		func.type_id = data.template.category_id;
		func.props = {};
		data.props.forEach(({
			index,
			value_script_id,
			value_func_id,
			value_prop_id,
			value
		}) => {
			func.props[index] = parseSourceValue(value_func_id, value_prop_id, value);
		});
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
		onLoader(false);
	}
	catch (err) {
		Store().dispatch({
			type: 'alert',
			payload: () => ({
				flag: true,
				message: axiosError(err),
				vertical: 'bottom',
				horizontal: 'right',
			}),
		});
		onLoader(false);
	}
};

export default onMount;
