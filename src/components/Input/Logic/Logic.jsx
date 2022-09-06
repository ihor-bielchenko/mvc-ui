import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { StyledChip } from 'components/Input/LogicValue.jsx';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { getLang } from 'components/Language';

let Logic = ({ 
	onMenu,
	onClear,
	disabled,
	defaultValue,
	value,
}) => {
	return <Box position="relative">
		{(value || defaultValue)
			? <StyledChip 
				label={SOURCE_TYPE_SCRIPT.text()}
				onDelete={onClear}
				onClick={onMenu} />
			: <Button
				disabled={disabled}
				variant="outlined"
				color="primary"
				startIcon={<AddIcon fontSize="small" />}
				onClick={onMenu}>
				{getLang('SelectPropFromLogicText')}
			</Button>}
	</Box>;
};

Logic = React.memo(Logic);
Logic.defaultProps = {
	onMenu: () => {},
	onClear: () => {},
	disabled: false,
};

export default Logic;
