import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as funcCategories from 'structures/funcCategories.js';

const _load = (categoryId) => () => {
	switch (categoryId) {
		case funcCategories.FUNC_CATEGORY_IF.id:
			return import('components/Select/FuncTemplate/If');

		case funcCategories.FUNC_CATEGORY_TEXT.id:
			return import('components/Select/FuncTemplate/Text');

		case funcCategories.FUNC_CATEGORY_MATH.id:
			return import('components/Select/FuncTemplate/Maths');

		case funcCategories.FUNC_CATEGORY_ARRAY.id:
			return import('components/Select/FuncTemplate/Arr');

		case funcCategories.FUNC_CATEGORY_OBJECT.id:
			return import('components/Select/FuncTemplate/Obj');

		case funcCategories.FUNC_CATEGORY_DB.id:
			return import('components/Select/FuncTemplate/Db');

		case funcCategories.FUNC_CATEGORY_TIME.id:
			return import('components/Select/FuncTemplate/Time');

		case funcCategories.FUNC_CATEGORY_HASH.id:
			return import('components/Select/FuncTemplate/Hash');

		case funcCategories.FUNC_CATEGORY_SERVER.id:
			return import('components/Select/FuncTemplate/Server');

		case '':
		default:
			return React.Fragment;
	}
};
let FuncTemplate = ({
	name, 
	value,
	categoryId,
	required,
	onSelect, 
}) => {
	const Component = React.lazy(_load(categoryId));

	return categoryId > 0
		? <React.Suspense fallback={<Typography>Подождите...</Typography>}>
			<Component 
				required={required}
				name={name}
				value={value}
				onSelect={onSelect} />
		</React.Suspense>
		: <React.Fragment />;
};

FuncTemplate = React.memo(FuncTemplate);
FuncTemplate.defaultProps = {
	value: '',
	categoryId: 0,
	required: false,
	onSelect: () => {},
};

export default FuncTemplate;
