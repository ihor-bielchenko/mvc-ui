import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const BoxWrapper = styled(Box)`
	background-color: rgba(255, 255, 255, ${(props) => props['data-opacity']});
`;
let Loader = ({ children }) => {
	const loaderFlag = useSelector((state) => state.config.loaderFlag);
	const loaderOpacity = useSelector((state) => state.config.loaderOpacity);

	return <React.Fragment>
		{loaderFlag
			? <BoxWrapper
				data-opacity={loaderOpacity}
				top="0px"
				left="0px"
				width="100%"
				height="100%"
				position="fixed"
				zIndex="99999"
				display="flex"
				alignItems="center"
				justifyContent="center">
				<CircularProgress size={80} />
			</BoxWrapper>
			: <React.Fragment />}
		{children}
	</React.Fragment>;
};

Loader = React.memo(Loader);

export default Loader;
