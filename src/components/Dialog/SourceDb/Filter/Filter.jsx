import React from 'react';
import { useSelector } from 'react-redux';
import Form from './Form.jsx';
import Table from './Table.jsx';
import onCancel from './onCancel.js';

let Filter = () => {
	const id = useSelector((state) => state.jsObject.filterFormId);

	// onUnmount
	React.useEffect(() => () => onCancel(), []);

	return <React.Fragment>
		{id >= 0
			? <Form name={id} />
			: <Table />}
	</React.Fragment>;
};

Filter = React.memo(Filter);
Filter.defaultProps = {
};

export default Filter;
