import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Tree from '../Tree';
import { Create } from '../Slot';

const BoxBackgraund = styled(Box)`
	background-image: linear-gradient(rgba(198, 198, 198, .2) .1em, transparent .1em), linear-gradient(90deg, rgba(198, 198, 198, .2) .1em, transparent .1em);
	background-size: 20px 20px;
`;

let Workspace = () => {
	return <React.Fragment>
		<BoxBackgraund
			width="100%"
			height="100%">
			<Tree>
				<Create withControl />
			</Tree>
		</BoxBackgraund>
	</React.Fragment>;
};

Workspace = React.memo(Workspace);
Workspace.defaultProps = {
};

export default Workspace;
