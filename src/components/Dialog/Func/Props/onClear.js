import Store from 'components/Store';
import { DATA_TYPE_TEXT } from 'structures/dataTypes.js';

const onClear = (e, index) => {
	const jsObject = Store().getState().jsObject;
	const blocks = jsObject.blocks[0] || [];

	if (blocks[index]) {
		blocks[index].value = '';
		blocks[index].data_type_id = DATA_TYPE_TEXT.id;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onClear;
