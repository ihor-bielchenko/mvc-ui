import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import onUnmount from './onUnmount.js';
import { SOURCE_TYPE_COOKIE } from 'structures/sourceTypes.js';

const _onClose = (sourceTypeId = SOURCE_TYPE_COOKIE.id) => (e, reason) => {
	const jsObject = Store().getState().jsObject;

	jsObject.tempValue.value = '';

	onClose(sourceTypeId)(e, reason);
	onUnmount();
};

export default _onClose;
