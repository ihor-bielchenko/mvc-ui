import Store from 'components/Store';
import onDialog from 'components/Dialog/onDialog.js';

const onMenuComplexValue = (e, id, dataTypeId, sourceTypeId) => {
	const jsObject = Store().getState().jsObject;
	
	jsObject.tempValue = { ...(jsObject.data[id].collection 
		?? jsObject.data[id].value) };
	onDialog(sourceTypeId, { 
		id, 
		isEditFlag: true,
	})();
};

export default onMenuComplexValue;
