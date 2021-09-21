import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as funcTypes from 'structures/funcTypes.js';

const _load = (typeId) => () => {
	switch (typeId) {
		case funcTypes.FUNC_IF.id:
			return import('components/Select/FuncTemplate/If');

		case funcTypes.FUNC_DB.id:
			return import('components/Select/FuncTemplate/Db');

		case funcTypes.FUNC_TEXT.id:
			return import('components/Select/FuncTemplate/Text');

		case funcTypes.FUNC_MATH.id:
			return import('components/Select/FuncTemplate/Maths');

		case funcTypes.FUNC_TIME.id:
			return import('components/Select/FuncTemplate/Time');

		case funcTypes.FUNC_HASH.id:
			return import('components/Select/FuncTemplate/Hash');

		case funcTypes.FUNC_SERVER.id:
			return import('components/Select/FuncTemplate/Server');

		case '':
		default:
			return React.Fragment;
	}
};
let FuncTemplate = ({
	name, 
	value,
	typeId,
	required,
	onSelect, 
}) => {
	const Component = React.lazy(_load(typeId));

	return <React.Suspense fallback={<Typography>Подождите...</Typography>}>
		<Component 
			required={required}
			name={name}
			value={value}
			onSelect={onSelect} />
	</React.Suspense>;
};

FuncTemplate = React.memo(FuncTemplate);
FuncTemplate.defaultProps = {
	name: 'func_template_id',
	value: '',
	typeId: 0,
	required: false,
	onSelect: () => {},
};

export default FuncTemplate;
