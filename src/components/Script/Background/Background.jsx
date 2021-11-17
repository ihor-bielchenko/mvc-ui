import styled from 'styled-components';
import Box from '@material-ui/core/Box';

const BoxBackground = styled(Box)`
	& > .MuiBox-root {
		background-image: linear-gradient(rgba(198, 198, 198, .2) .26em, transparent .26em), linear-gradient(90deg, rgba(198, 198, 198, .2) .26em, transparent .26em);
		background-size: 40px 40px;
	}
`;

export default BoxBackground;
