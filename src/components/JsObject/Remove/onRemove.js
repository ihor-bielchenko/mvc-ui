import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import { COLUMN_ARR } from 'structures/columnTypes.js';

const onRemove = (e, id) => {
	const jsObject = Store().getState().jsObject;
	let parentId = 0,
		key = jsObject.data[id].key;

	if (jsObject.data[id]) {
		parentId = jsObject.data[id].parent_id;
		delete jsObject.data[id];
	}
	if (Array.isArray(jsObject.blocks[parentId])) {
		const findIndex =  jsObject.blocks[parentId].findIndex((item) => item.id === id);
	
		if (findIndex > -1) {
			jsObject.blocks[parentId].splice(findIndex, 1);

			if (jsObject.data[parentId] 
				&& jsObject.data[parentId].type_id === COLUMN_ARR.id) {
				jsObject.blocks[parentId].forEach((item, index) => {
					jsObject.blocks[parentId][index].key = (jsObject.blocks[parentId][index].key.includes('n+'))
						? key === 'n'
							? index.toString()
							: 'n+'+ index
						: (jsObject.blocks[parentId][index].key === 'n')
							? 'n'
							: index.toString();
					if (jsObject.data[item.id]) {
						jsObject.data[item.id].key = jsObject.blocks[parentId][index].key;
					}
				});
				jsObject.blocks[parentId] = [ ...jsObject.blocks[parentId] ];
			}
		}
	}
	if (jsObject.blocks[id]) {
		delete jsObject.blocks[id];
	}
	onClose(DIALOG_DELETE_CONFIRM)(e);
};

export default onRemove;
