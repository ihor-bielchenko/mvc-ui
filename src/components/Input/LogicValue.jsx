import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { all as source } from 'structures/sourceTypes.js';

export const StyledChip = styled(Chip)`
	cursor: pointer !important;
`;
let LogicValue = ({ 
	label,
	chipText,
	sourceTypeId, 
	entityId,
	onDelete,
	onClick,
}) => {
	const scriptKeys = useSelector((state) => Object.keys(state.script));
	const script = useSelector((state) => state.script);
	const workspaceId = entityId > 0
		? scriptKeys.find((key) => typeof script[key] === 'object'
			? script[key].data[entityId]
			: undefined)
		: undefined;

	return <React.Fragment>
		<Box
			display="flex"
			alignItems="center"
			height="56px"
			width="max-content"
			maxWidth="480px !important"
			px="8px">
			{label
				? <Typography
					variant="caption"
					color="textSecondary"
					style={{
						paddingLeft: 4,
						paddingRight: 4,
						backgroundColor: '#FFF',
						position: 'absolute',
						top: -9,
					}}>
					{label}
				</Typography>
				: <React.Fragment />}
			<StyledChip 
				label={chipText
					? chipText
					: source[sourceTypeId].text((((script[workspaceId] || {}).data || {})[entityId] || {}).name)}
				onDelete={onDelete}
				onClick={onClick} />
		</Box>
	</React.Fragment>;
};

LogicValue = React.memo(LogicValue);
LogicValue.defaultProps = {
	label: '',
	sourceTypeId: 0,
	entityId: 0,
	onDelete: () => {},
	onClick: () => {},
};

export default LogicValue;
