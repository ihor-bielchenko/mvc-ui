import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Breadcrumbs from 'components/Breadcrumbs';
import MenuService from 'components/Menu/Service';
import MenuAccount from 'components/Menu/Account';
import onMenu from 'components/Menu/onMenu.js';

let Header = ({ children }) => {
	return <Box 
		display="flex"
		alignItems="center"
		justifyContent="space-between"
		position={children
			? 'fixed'
			: 'static'}
		zIndex="1"
		top="0px"
		left="0px"
		width="calc(100% - 24px)"
		height="64px"
		style={{
			// backgroundColor: '#FFF',
		}}>
		<Box
			width="48px"
			height="48px"
			mx="10px"
			style={{
				backgroundColor: '#FFF',
				border: '1px solid #EFEFEF',
				borderRadius: '50% 50%',
			}}>
			<IconButton onClick={onMenu('menu-main-service')}>
				<MenuIcon />
			</IconButton>
			<MenuService aria="menu-main-service" />
		</Box>
		{children
			? children
			: <Box width="calc(100% - 192px)">
				<Box
					display="flex"
					alignItems="center"
					height="48px"
					width="max-content"
					minWidth="480px"
					overflow="hidden"
					mr="10px"
					px="4px"
					style={{
						backgroundColor: '#FFF',
						border: '1px solid #EFEFEF',
						borderRadius: '7px',
					}}>
					<Breadcrumbs />	
				</Box>
			</Box>}
		<Box
			width="48px"
			height="48px"
			mx="10px"
			style={{
				backgroundColor: '#FFF',
				border: '1px solid #EFEFEF',
				borderRadius: '50% 50%',
			}}>
			<IconButton onClick={onMenu('menu-main-account')}>
				<AccountCircleIcon />
			</IconButton>
			<MenuAccount aria="menu-main-account" />
		</Box>
	</Box>;
};

Header = React.memo(Header);
Header.defaultProps = {
};

export default Header;
