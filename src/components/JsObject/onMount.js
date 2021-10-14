import Store from 'components/Store';
import getTemplate from './getTemplate.js';
import buildBlocks from './buildBlocks.js';

const onMount = (typeId) => {
	const jsObject = Store().getState().jsObject;
	
	jsObject.data[0] = jsObject.data[0] ?? getTemplate({
		parent_id: undefined,
		key: 0,
		value: undefined,
		type_id: typeId,
		...typeof jsObject.data[0] === 'object'
			? jsObject.data[0]
			: {},
	});
	jsObject.blocks = {};

	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...buildBlocks(typeId, jsObject) }),
	});
};

export default onMount;
