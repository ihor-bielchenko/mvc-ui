import Store from 'components/Store';
import onDialog from 'components/Dialog/onDialog.js';

const onChangeLogic = (e, id) => {
	const prop = Store().getState().prop;

	if (prop.body[id]
		&& prop.body[id].value.source_id >= 0) {
		prop.tempValue = { ...prop.body[id].value };
		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
		onDialog(prop.body[id].value.source_id, { 
			name: id, 
		})();
	}
};

export default onChangeLogic;
