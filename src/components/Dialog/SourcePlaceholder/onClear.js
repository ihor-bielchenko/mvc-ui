import Store from 'components/Store';
import { SOURCE_TYPE_PLACEHOLDER } from 'structures/sourceTypes.js';

const onClear = (e, workspaceId, id) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.data[id] === 'object') {
		jsObject.tempValue.value = '';
		jsObject.data[id].value = { 
			source_type_id: SOURCE_TYPE_PLACEHOLDER.id,
			value: '',
		};
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onClear;
