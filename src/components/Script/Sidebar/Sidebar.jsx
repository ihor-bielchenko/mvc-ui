import React from 'react';
import { useSelector } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import onToggle from './onToggle.js';

let Sidebar = () => {
	const sidebarFlag = useSelector((state) => !!state.script.sidebarFlag);

	return <React.Fragment>
		<Drawer
			variant="persistent"
			anchor="left" 
			open={sidebarFlag} 
			onClose={onToggle(false)}>
			<Box
				width="236px"
				height="100%">
				<Box
					align="right"
					onClick={onToggle(false)}>
					<IconButton>
						<NavigateBeforeIcon />
					</IconButton>
				</Box>
				<Divider />
			</Box>
		</Drawer>
	</React.Fragment>;
};

Sidebar = React.memo(Sidebar);
Sidebar.defaultProps = {
};

export default Sidebar;
