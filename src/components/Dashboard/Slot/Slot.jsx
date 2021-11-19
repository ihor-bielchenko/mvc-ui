import React from 'react';
import styled from 'styled-components';
// import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';

const GridWrapper = styled(Grid)`
	& > button {
		text-transform: initial;
		padding: 4px 8px;
		height: 72px;
	}
`;
let Slot = ({ 
	projectId,
	serviceId, 
	children,
}) => {
	return <React.Fragment>
		<GridWrapper 
			item
			xs={2}
			style={{
				paddingTop: 8,
				paddingBottom: 8,
			}}>
			{children}
		</GridWrapper>
	</React.Fragment>;
};

Slot = React.memo(Slot);
Slot.defaultProps = {
	projectId: 0,
	serviceId: 0,
};

export default Slot;
