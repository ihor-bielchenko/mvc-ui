import onClose from 'components/Dialog/onClose.js';
import onUnmount from './onUnmount.js';
import { SOURCE_TYPE_COOKIE } from 'structures/sourceTypes.js';

const _onClose = (sourceTypeId = SOURCE_TYPE_COOKIE.id) => (e, reason) => {
	onClose(sourceTypeId)(e, reason);
	onUnmount();
};

export default _onClose;
