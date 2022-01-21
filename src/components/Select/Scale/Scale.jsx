import React from 'react';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { getLang } from 'components/Language';
import Select from '../Select.jsx';

const StyledWrapper = styled.div`
	& .MuiSelect-root.MuiSelect-select {
		min-width: 70px;
	}
`;
let Scale = ({
	name,
	value,
	label,
	helperText,
	onSelect,
	children,
}) => {
	return <StyledWrapper>
		<Select
			disabled
			name={name}
			value={value}
			label={label}
			helperText={helperText}
			size="small"
			onSelect={onSelect}>
			<MenuItem value={100}>
				<Typography>
				100%
				</Typography>
			</MenuItem>
			<MenuItem value={75}>
				<Typography>
				75%
				</Typography>
			</MenuItem>
			<MenuItem value={50}>
				<Typography>
				50%
				</Typography>
			</MenuItem>
			<MenuItem value={25}>
				<Typography>
				25%
				</Typography>
			</MenuItem>
			{children}
		</Select>
	</StyledWrapper>;
};

Scale = React.memo(Scale);
Scale.defaultProps = {
	name: 'scale',
	label: getLang('cmpSelectScale'),
	helperText: '',
	value: '',
	onSelect: () => {},
};

export default Scale;
