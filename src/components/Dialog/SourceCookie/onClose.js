import onClose from 'components/Dialog/onClose.js';
import onUnmount from './onUnmount.js';
import { SOURCE_COOKIE } from 'structures/source.js';

const _onClose = (e, reason) => {
	onClose(SOURCE_COOKIE.id)(e, reason);
	onUnmount();
};

export default _onClose;
