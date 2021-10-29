import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import onToggle from '../Sidebar/onToggle.js';

let Header = ({ id }) => {
	return <React.Fragment>
		<AppBar 
			position="static"
			style={{
				backgroundColor: '#7986cb',
			}}>
			<Toolbar variant="dense">
				<IconButton 
					color="inherit"
					onClick={onToggle(id, true)}>
					<MenuIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	</React.Fragment>;
};

Header = React.memo(Header);
Header.defaultProps = {
	id: 0,
};

export default Header;
