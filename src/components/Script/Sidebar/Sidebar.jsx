import React from 'react';
import { useSelector } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import onToggle from './onToggle.js';

let Sidebar = ({ id }) => {
	const sidebarFlag = useSelector((state) => !!state.script[id].sidebarFlag);
	const [ tab, setTab ] = React.useState(() => 0);
	const _setTab = React.useCallback((e, newValue) => setTab(newValue), [
		setTab,
	]);

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
					display="flex"
					justifyContent="space-between">
					<IconButton color="inherit">
						<MenuIcon />
					</IconButton>
					<IconButton onClick={onToggle(id, false)}>
						<NavigateBeforeIcon />
					</IconButton>
				</Box>
				<Divider />
				<Tabs 
					value={tab}
					onChange={_setTab}
					style={{
						minHeight: '38px',
					}}>
					<Tab 
						style={{
							textTransform: 'inherit',
							minWidth: 'max-content',
							padding: '0 3px 0 3px',
							minHeight: '38px',
						}}
						label={<Typography variant="caption">
							<b>Параметры</b>
						</Typography>} />
					<Tab 
						style={{
							textTransform: 'inherit',
							minWidth: 'max-content',
							padding: '0 3px 0 2px',
							minHeight: '38px',
						}}
						label={<Typography variant="caption">
							<b>Условия</b>
						</Typography>} />
					<Tab 
						style={{
							textTransform: 'inherit',
							minWidth: 'max-content',
							padding: '0 3px 0 2px',
							minHeight: '38px',
						}}
						label={<Typography variant="caption">
							<b>Функции</b>
						</Typography>} />
					<Tab 
						style={{
							textTransform: 'inherit',
							minWidth: 'max-content',
							padding: '0 3px 0 3px',
							minHeight: '38px',
						}}
						label={<Typography variant="caption">
							<b>JSON</b>
						</Typography>} />
				</Tabs>
			</Box>
		</Drawer>
	</React.Fragment>;
};

Sidebar = React.memo(Sidebar);
Sidebar.defaultProps = {
	id: 0,
};

export default Sidebar;
