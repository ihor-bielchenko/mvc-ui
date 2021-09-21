import onClose from 'components/Dialog/onClose.js';
import onUnmount from './onUnmount.js';
import { SOURCE_REQUEST } from 'structures/source.js';

const _onClose = (e, reason) => {
	onClose(SOURCE_REQUEST.id)(e, reason);
	onUnmount();
};

export default _onClose;
