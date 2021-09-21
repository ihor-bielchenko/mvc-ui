import React from 'react';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import { all as source } from 'structures/source.js';

export const StyledChip = styled(Chip)`
	cursor: pointer !important;
	position: absolute !important;
	top: 14px;
	left: 38px;
`;
let LogicValue = ({ 
	chipText,
	sourceId, 
	entityId,
	onDelete,
	onClick,
}) => {
	return <React.Fragment>
		<StyledChip 
			label={chipText
				? chipText
				: source[sourceId].text()}
			onDelete={onDelete}
			onClick={onClick} />
	</React.Fragment>;
};

LogicValue = React.memo(LogicValue);
LogicValue.defaultProps = {
	sourceId: 0,
	entityId: 0,
	onDelete: () => {},
	onClick: () => {},
};

export default LogicValue;
