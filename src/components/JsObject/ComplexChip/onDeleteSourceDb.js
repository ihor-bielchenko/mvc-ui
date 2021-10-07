import Store from 'components/Store';
import { SOURCE_DB } from 'structures/source.js';
import {
	COLUMN_ARR,
	COLUMN_OBJ,
} from 'structures/columnTypes.js';

const recursiveDelete = (id, data, blocks) => {
	if (typeof data[id] === 'object') {
		const parentId = data[id].parent_id;
		const blockItems = ([ ...blocks[id] || [] ]);
		let i = 0;

		while (i < blockItems.length) {
			if (Array.isArray(blocks[blockItems[i].id])) {
				recursiveDelete(blockItems[i].id, data, blocks);
			}
			else {
				delete data[blockItems[i].id];
			}
			i++;
		}
		([ ...blocks[parentId] || [] ]).forEach((item, index) => {
			if (item.id === id) {
				blocks[parentId].splice(index, 1);
			}
		});
		if (data[id].type_id === COLUMN_OBJ.id
			&& data[parentId].type_id === COLUMN_ARR.id
			&& typeof data[id].collection === 'object'
			&& data[id].collection.source_id === SOURCE_DB.id) {
			(blocks[parentId] || []).forEach((item, index) => {
				blocks[parentId][index].key = index.toString();
			});
		}

		delete blocks[id];
		delete data[id];
	}
};

const onDeleteSourceDb = (e, id) => {
	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.data[id] === 'object') {
		recursiveDelete(id, jsObject.data, jsObject.blocks);
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}

	// console.log('jsObject', id, jsObject);
};

export default onDeleteSourceDb;
