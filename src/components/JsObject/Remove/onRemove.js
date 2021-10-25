import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import { SOURCE_TYPE_DB } from 'structures/sourceTypes.js';
import { 
	DATA_TYPE_ARRAY,
	DATA_TYPE_OBJECT, 
} from 'structures/dataTypes.js';

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
		if (data[id].data_type_id === DATA_TYPE_OBJECT.id
			&& data[parentId].data_type_id === DATA_TYPE_ARRAY.id
			&& typeof data[id].collection === 'object'
			&& data[id].collection.source_type_id === SOURCE_TYPE_DB.id) {
			(blocks[parentId] || []).forEach((item, index) => {
				blocks[parentId][index].key = index.toString();
			});
		}

		delete blocks[id];
		delete data[id];
	}
};

const onRemove = (e, id) => {
	const jsObject = Store().getState().jsObject;
	const blocks = jsObject.blocks;
	const data = jsObject.data;
	let parentId = 0,
		key = data[id].key;

	if (data[id]) {
		parentId = data[id].parent_id;
	}
	if (Array.isArray(blocks[parentId])) {
		const findIndex =  blocks[parentId].findIndex((item) => item.id === id);

		if (findIndex > -1) {
			blocks[parentId].splice(findIndex, 1);

			if (data[parentId] 
				&& data[parentId].data_type_id === DATA_TYPE_ARRAY.id) {
				const nOrder = key.includes('n')
					? Number((key.split('n'))[0])
					: 0;
				const nIndex = Number((key.split('n+'))[1]);

				blocks[parentId].forEach((item, index) => {
					const _item = blocks[parentId][index];

					if (_item.key.includes('n')) {
						const _nOrder = Number((_item.key.split('n'))[0]);
						const _nIndex = Number((_item.key.split('n+'))[1]);

						if (nOrder === _nOrder) {
							if (Number.isNaN(nIndex)) {
								blocks[parentId][index].key = (_nOrder > 0)
									? (_nOrder - 1) <= 1
										? 'n'+ (Number.isNaN(_nIndex)
											? ''
											: '+'+ index)
										: (_nOrder - 1) +'n'+ (Number.isNaN(_nIndex)
											? ''
											: '+'+ index)
									: _nIndex > nIndex
										? 'n'+ (_nIndex - 1)
										: key === 'n'
											? index.toString()
											: blocks[parentId][index].key.includes('n')
												? blocks[parentId][index].key
												: index.toString();
							}
							else if (_nIndex > nIndex) {
								blocks[parentId][index].key = (_nOrder === 0 
									? '' 
									: _nOrder) +'n+'+ (_nIndex - 1);
							}
						}
						else if (_nOrder > nOrder 
							&& key.includes('n') 
							&& !key.includes('n+')) {
							const _newNOrder = (_nOrder - 1) === 1
								? ''
								: (_nOrder - 1);

							blocks[parentId][index].key = Number.isNaN(_nIndex)
								? _newNOrder +'n'
								: _newNOrder +'n+'+ _nIndex;
						}
					}
					else {
						blocks[parentId][index].key = index.toString();
					}
					data[item.id].key = blocks[parentId][index].key;
				});
				blocks[parentId] = [ ...blocks[parentId] ];
			}
		}
	}
	if (blocks[id]) {
		recursiveDelete(id, data, blocks);
	}
	onClose(DIALOG_DELETE_CONFIRM)(e);
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onRemove;
