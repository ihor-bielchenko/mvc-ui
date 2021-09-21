import onClose from 'components/Dialog/onClose.js';
import { SOURCE_PLACEHOLDER } from 'structures/source.js';

const _onClose = (e, reason) => onClose(SOURCE_PLACEHOLDER.id)(e, reason);

export default _onClose;
