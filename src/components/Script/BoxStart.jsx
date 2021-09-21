import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';

const StyledBox = styled(Box)`
	position: absolute;
	top: 0;
	left: 0; 
	height: calc(50px - 8px);
	width: 100vw;
	color: #b0bec5;
	background-color: #eceff1;
	border: 4px dashed #B0BEC5;
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	font-size: 16px;
`;
let BoxStart = ({ children }) => {
	return <StyledBox
		display="flex"
		alignItems="center"
		justifyContent="center">
		{children}
	</StyledBox>;
};

BoxStart = React.memo(BoxStart);
BoxStart.defaultProps = {
};

export default BoxStart;
