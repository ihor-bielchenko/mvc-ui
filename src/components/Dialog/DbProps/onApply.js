import Store from 'components/Store';
import { DATA_TYPE_ID } from 'structures/dataTypes.js';
import { DIALOG_DB_PROPS } from 'consts/dialog.js';
import onClose from '../onClose.js';

const onApply = (e) => {
	const {
		jsObject,
		list,
		db,
	} = Store().getState();

	list.filter_operator_id = (jsObject.tempValue || {}).filter_operator_id 
		|| process.env.OPERATOR_UNION_AND;
	list.filter = {};
	list.sort = {};
	Object
		.keys(jsObject.tempValue.filter || {})
		.forEach((filterId) => {
			list.filter[db.columns[jsObject.tempValue.filter[filterId].column_id].name] = [ 
				jsObject.tempValue.filter[filterId].value,  
				jsObject.tempValue.filter[filterId].operator_if_id,
			];
		});
	Object
		.keys(jsObject.tempValue.sort || {})
		.forEach((sortId) => {
			list.sort[db.columns[jsObject.tempValue.sort[sortId].column_id].data_type_id === DATA_TYPE_ID.id
				? 'id'
				: db.columns[jsObject.tempValue.sort[sortId].column_id].name] = jsObject.tempValue.sort[sortId].direction === 0
				? 'ASC'
				: 'DESC';
		});
	list.filter = JSON.stringify(list.filter);
	list.sort = JSON.stringify(list.sort);

	Store().dispatch({
		type: 'list',
		payload: () => ({ ...list }),
	});
	onClose(DIALOG_DB_PROPS)(e);
};

export default onApply;
