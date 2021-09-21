import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Store from 'components/Store';
import SelectColumn from 'components/Select/Column';
import SelectDirection from 'components/Select/Direction';
import onSubmit from './onSubmit.js';
import onCancel from './onCancel.js';

let Form = ({ 
	id,
	setId, 
}) => {
	const sortItem = (Store().getState().prop.tempValue.sort || {})[id];

	return <form onSubmit={onSubmit}>
		<input 
			type="hidden"
			name="id"
			value={id} />
		<Box py={2}>
			<SelectColumn 
				required
				{ ...sortItem
					? { defaultValue: sortItem.column_id }
					: {} } />
		</Box>
		<Box py={2}>
			<SelectDirection 
				required
				{ ...sortItem
					? { defaultValue: sortItem.direction }
					: {} } />
		</Box>
		<Box
			py={2}
			display="flex"
			justifyContent="space-between">
			<Button
				variant="outlined"
				color="secondary"
				startIcon={<CloseIcon />}
				onClick={onCancel}>
				Отменить
			</Button>
			<Button
				type="submit"
				variant="outlined"
				color="primary"
				startIcon={<CheckIcon />}>
				Сохранить
			</Button>
		</Box>
	</form>;
};

Form = React.memo(Form);
Form.defaultProps = {
	id: 0,
	setId: () => {},
};

export default Form;
