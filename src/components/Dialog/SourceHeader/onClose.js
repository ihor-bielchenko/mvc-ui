import onClose from 'components/Dialog/onClose.js';
import onUnmount from './onUnmount.js';
import { SOURCE_HEADER } from 'structures/source.js';

const _onClose = (e, reason) => {
	onClose(SOURCE_HEADER.id)(e, reason);
	onUnmount();
};

export default _onClose;
