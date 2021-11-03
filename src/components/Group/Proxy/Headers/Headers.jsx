import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import KeyValue from './KeyValue.jsx';
import onAdd from './onAdd.js';

let Headers = () => {
	const headerKeys = useSelector((state) => Object.keys(state.jsObject.tempValue.header || {}));

	return <React.Fragment>
		<Box py={4}>
			{headerKeys.map((id) => <Box
				key={id}
				py={1}>
				<KeyValue id={id} />
			</Box>)}
			<Box py={1}>
				<Button
					color="primary"
					variant="outlined"
					size="small"
					startIcon={<AddIcon />}
					onClick={onAdd}>
					Добавить заголовок
				</Button>
			</Box>
		</Box>
	</React.Fragment>;
};

Headers = React.memo(Headers);
Headers.defaultProps = {
};

export default Headers;
