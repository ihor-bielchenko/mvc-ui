import React from 'react';
import Box from '@material-ui/core/Box';

let Tree = ({ children }) => {
	return <React.Fragment>
		<Box 
			position="relative"
			width="588px"
			mx="auto">
			{children}
		</Box>
	</React.Fragment>;
};

Tree = React.memo(Tree);
Tree.defaultProps = {
};

export default Tree;
