import Store from 'components/Store';
import onDialog from 'components/Dialog/onDialog.js';

const onComplexValue = (e, name) => {
	const prop = Store().getState().prop;

	if (prop.body[name]) {
		prop.tempValue = { ...prop.body[name] };
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
		onDialog(prop.body[name].source_id, { 
			name, 
		})();
	}
};

export default onComplexValue;
