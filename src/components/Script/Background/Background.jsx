import styled from 'styled-components';
import Box from '@material-ui/core/Box';

const BoxBackground = styled(Box)`
	& > .MuiBox-root {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		padding-top: 60px;
		background-image: linear-gradient(rgba(198, 198, 198, .2) .26em, transparent .26em), linear-gradient(90deg, rgba(198, 198, 198, .2) .26em, transparent .26em);
		background-size: 40px 40px;
		min-height: 100vh;
	}
`;

export default BoxBackground;
