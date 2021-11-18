import Store from 'components/Store';
import onDialog from 'components/Dialog/onDialog.js';
import onValidate from 'components/Dialog/Func/Props/onValidate.js';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';

const onValueScript = (id) => (e, scriptId, workspaceId, entityId, dataTypeId) => {
	onClose(SOURCE_TYPE_SCRIPT.id)(e);
};

const onMenu = (e, id, dataTypeId, sourceTypeId) => {
	if (sourceTypeId === SOURCE_TYPE_SCRIPT.id) {
		onDialog(SOURCE_TYPE_SCRIPT.id, {
			onClickAsSource: onValueScript(id),
			dataTypeValidating: onValidate(dataTypeId),
		})(e);
	}
	else {
		const jsObject = Store().getState().jsObject;
	
		jsObject.tempValue = { ...(jsObject.data[id].collection 
			?? jsObject.data[id].value) };
		onDialog(sourceTypeId, { 
			id, 
			isEditFlag: true,
		})();
	}
};

export default onMenu;
