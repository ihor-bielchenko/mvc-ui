import styled from 'styled-components';
import Box from '@material-ui/core/Box';

const BoxGradient = styled(Box)`
	width: 100vw;
	height: 100vh;
	background-image: linear-gradient(rgba(198, 198, 198, .2) .1em, transparent .1em), linear-gradient(90deg, rgba(198, 198, 198, .2) .1em, transparent .1em);
	background-size: 20px 20px;
	position: absolute;
	top: 0;
	left: 0; 
`;

export default BoxGradient;