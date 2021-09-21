import React from 'react';
import { useSelector } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DbFilter from 'components/Dialog/SourceDb/Filter';
import DbSort from 'components/Dialog/SourceDb/Sort';
import onClose from '../onClose.js';

let Filter = ({ aria }) => {
	const anchorEl = useSelector((state) => state.menu[aria]
		? state.menu[aria].anchorEl
		: null);

	return <React.Fragment>
		<Menu
			keepMounted
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			getContentAnchorEl={null}
			onClose={onClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}>
			<Box 
				position="relative"
				width="640px"
				p={2}>
				<Typography variant="h6">
					Фильтры
				</Typography>
				<DbFilter />
				<Box py={4} />
				<Typography variant="h6">
					Сортировка
				</Typography>
				<DbSort />
			</Box>
		</Menu>
	</React.Fragment>;
};

Filter = React.memo(Filter);
Filter.defaultProps = {
	aria: 'menu-filter',
};

export default Filter;
