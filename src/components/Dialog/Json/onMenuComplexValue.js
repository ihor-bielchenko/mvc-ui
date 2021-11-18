import onDialog from 'components/Dialog/onDialog.js';
import onValidateSource from 'components/Dialog/Func/Props/onValidate.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { 
	DATA_TYPE_TEXT,
	DATA_TYPE_RICHTEXT,
	DATA_TYPE_EMAIL,
	DATA_TYPE_IP,
	DATA_TYPE_MAC,
	DATA_TYPE_URL,
	DATA_TYPE_PASSWORD,
} from 'structures/dataTypes.js';
import onValueScript from './onValueScript.js';

const onMenuComplexValue = (e, id, dataTypeId, sourceTypeId) => {
	onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(id),
		dataTypeValidating: onValidateSource(dataTypeId === DATA_TYPE_PASSWORD.id
			? ([
				DATA_TYPE_TEXT.id,
				DATA_TYPE_RICHTEXT.id,
				DATA_TYPE_EMAIL.id,
				DATA_TYPE_IP.id,
				DATA_TYPE_MAC.id,
				DATA_TYPE_URL.id,
				DATA_TYPE_PASSWORD.id,
			])
			: dataTypeId),
	})(e);
};

export default onMenuComplexValue;
