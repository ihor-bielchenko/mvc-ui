import Store from 'components/Store';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';

const parseSourceValue = (valueFuncId, valuePropId, value) => {
	const entities = Store().getState().entities;
	const entityId = valueFuncId > 0 && entities.data[valueFuncId]
		? valueFuncId
		: valuePropId > 0 && entities.data[valuePropId]
			? valuePropId
			: undefined;

	return entityId
		? ({
			id: entityId,
			source_type_id: SOURCE_TYPE_SCRIPT.id,
			data_type_id: entities.data[entityId].type_id,
		})
		: value;
};

export default parseSourceValue;
