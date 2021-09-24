import onClose from 'components/Dialog/onClose.js';
import onUnmount from './onUnmount.js';
import { SOURCE_COOKIE } from 'structures/source.js';

const _onClose = (sourceId = SOURCE_COOKIE.id) => (e, reason) => {
	onClose(sourceId)(e, reason);
	onUnmount();
};

export default _onClose;
