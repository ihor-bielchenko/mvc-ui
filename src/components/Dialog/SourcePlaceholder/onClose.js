import onClose from 'components/Dialog/onClose.js';
import { SOURCE_TYPE_PLACEHOLDER } from 'structures/sourceTypes.js';

const _onClose = (e, reason) => onClose(SOURCE_TYPE_PLACEHOLDER.id)(e, reason);

export default _onClose;
