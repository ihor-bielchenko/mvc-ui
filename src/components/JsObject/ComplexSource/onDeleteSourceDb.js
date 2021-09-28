import Store from 'components/Store';
import {
	COLUMN_OBJ,
	COLUMN_ARR,
} from 'structures/columnTypes.js';

const onDeleteSourceDb = (e, id) => {
	id = Number(id);

	const jsObject = Store().getState().jsObject;
	const data = jsObject.data;
	const blocks = jsObject.blocks;
	const parentId = data[id].parent_id;

	if (typeof data[id] === 'object') {
		if (data[id].type_id === COLUMN_OBJ.id
			|| data[id].type_id === COLUMN_ARR.id) {
			(blocks[id] || []).forEach((item) => {
				delete data[item.id];
				delete blocks[item.id];
			});
			if (((data[id].source || {}).value || {}).is_collection) {
				const findIndex = (blocks[parentId] || []).findIndex((item) => (
					item.id === id
				));

				if (findIndex > -1) {
					blocks[parentId].splice(findIndex, 1);
				}
				delete data[id];
			}
			else {
				data[id].source = undefined;
				data[id].disabledKey = false;
				data[id].disabledType = false;
				data[id].disabledValue = false;
				data[id].disabledControl = false;
			}
			blocks[id] = [];
			jsObject.data = { ...data };
			jsObject.blocks = { ...blocks };
		}

		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onDeleteSourceDb;
