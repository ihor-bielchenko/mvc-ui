import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import KeyValue from './KeyValue.jsx';
import onAdd from './onAdd.js';

let Requests = () => {
	const requestKeys = useSelector((state) => Object.keys(state.prop.tempValue.request || {}));

	return <React.Fragment>
		<Box py={4}>
			{requestKeys.map((id) => <Box
				key={id}
				py={1}>
				<KeyValue name={id} />
			</Box>)}
			<Box py={1}>
				<Button
					color="primary"
					variant="outlined"
					size="small"
					startIcon={<AddIcon />}
					onClick={onAdd}>
					Добавить запрос
				</Button>
			</Box>
		</Box>
	</React.Fragment>;
};

Requests = React.memo(Requests);
Requests.defaultProps = {
};

export default Requests;
