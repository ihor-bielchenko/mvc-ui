import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as columnTypes from 'structures/columnTypes.js';

const _load = (columnTypeId) => () => {
	switch (columnTypeId) {
		case columnTypes.COLUMN_ID.id:
		case columnTypes.COLUMN_NUMBER.id:
		default:
			return import('components/Input/Numeric');

		case columnTypes.COLUMN_TEXT.id:
			return import('components/Input/Text');

		case columnTypes.COLUMN_EMAIL.id:
			return import('components/Input/Email');

		case columnTypes.COLUMN_PASSWORD.id:
			return import('components/Input/Password');
	}
};

let Column = ({ 
	columnTypeId,
	...props
}) => {
	const Component = React.lazy(_load(columnTypeId));

	return <React.Fragment>
		<React.Suspense fallback={<Typography>Подождите...</Typography>}>
			<Component { ...props } />
		</React.Suspense>
	</React.Fragment>;
};

Column = React.memo(Column);
Column.defaultProps = {
	columnTypeId: 0,
};

export default Column;
