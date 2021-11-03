import Store from 'components/Store';
import { SOURCE_TYPE_COOKIE } from 'structures/sourceTypes.js';

const onClear = (e, workspaceId, id, sourceTypeId = SOURCE_TYPE_COOKIE.id) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;

	jsObject.tempValue.value = '';
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onClear;
