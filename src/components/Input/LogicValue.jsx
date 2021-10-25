import React from 'react';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import { all as source } from 'structures/sourceTypes.js';

export const StyledChip = styled(Chip)`
	cursor: pointer !important;
	position: absolute !important;
	top: 14px;
	left: 38px;
`;
let LogicValue = ({ 
	chipText,
	sourceTypeId, 
	entityId,
	onDelete,
	onClick,
}) => {
	return <React.Fragment>
		<StyledChip 
			label={chipText
				? chipText
				: source[sourceTypeId].text()}
			onDelete={onDelete}
			onClick={onClick} />
	</React.Fragment>;
};

LogicValue = React.memo(LogicValue);
LogicValue.defaultProps = {
	sourceTypeId: 0,
	entityId: 0,
	onDelete: () => {},
	onClick: () => {},
};

export default LogicValue;
