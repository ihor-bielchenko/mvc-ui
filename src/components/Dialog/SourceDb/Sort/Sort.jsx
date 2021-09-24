import React from 'react';
import { useSelector } from 'react-redux';
import Form from './Form.jsx';
import Table from './Table.jsx';
import onCancel from './onCancel.js';

let Sort = () => {
	const id = useSelector((state) => state.jsObject.sortFormId);

	// onUnmount
	React.useEffect(() => () => onCancel(), []);

	return <React.Fragment>
		{id >= 0
			? <Form id={id} />
			: <Table />}
	</React.Fragment>;
};

Sort = React.memo(Sort);
Sort.defaultProps = {
};

export default Sort;
