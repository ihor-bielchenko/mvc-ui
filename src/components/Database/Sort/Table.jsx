import React from 'react';
import { useSelector } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
import TableMaterial from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import Store from 'components/Store';
import MenuControl from 'components/Menu/Control';
import onMenu from 'components/Menu/onMenu.js';
import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import { DATA_TYPE_ID } from 'structures/dataTypes.js';
import onAdd from './onAdd.js';
import onEdit from './onEdit.js';
import onDelete from './onDelete.js';
import { getLang } from 'components/Language';

let Table = () => {
	const sortKeys = useSelector((state) => Object.keys(state.jsObject.tempValue.sort || {}));

	return <React.Fragment>
		{sortKeys.length > 0
			? <TableContainer>
				<TableMaterial>
					<TableHead>
						<TableRow>
							<TableCell width="60%">
								{getLang('SortField')}
							</TableCell>
							<TableCell>
								{getLang('SortDirection')}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sortKeys.map((id) => {
							const sortItem = Store().getState().jsObject.tempValue.sort[id];
							const column = Store().getState().db.columns[sortItem.column_id];

							return <TableRow key={id}>
								<TableCell>
									<Typography 
										variant="h6"
										color={column.data_type_id === DATA_TYPE_ID.id
											? 'secondary'
											: 'primary'}>
										<b>{column.name}</b>
									</Typography>
								</TableCell>
								<TableCell>
									<Typography variant="h6">
										{sortItem.direction === 0
											? `↑ ${getLang('Ascending')}`
											: `↓ ${getLang('Descending')}`}
									</Typography>
								</TableCell>
								<TableCell width="1%">
									<IconButton 
										size="small"
										onClick={onMenu('sort-'+ id)}>
										<MoreVertIcon />
									</IconButton>
									<MenuControl 
										aria={'sort-'+ id}
										onEdit={onEdit(id)}
										onDelete={onDialog(DIALOG_DELETE_CONFIRM, {
											onDelete: onDelete(id),
										})} />
								</TableCell>
							</TableRow>;
						})}
					</TableBody>
				</TableMaterial>
			</TableContainer>
			: <Box
				my={3}
				align="center">
				<Typography 
					variant="body2"
					color="textSecondary">
					{getLang('NoSettings')}
				</Typography>
			</Box>}
			<Box mt={2}>
				<Button
					size="small"
					color="primary"
					variant="outlined"
					startIcon={<AddIcon />}
					onClick={onAdd}>
					{getLang('Add')}
				</Button>
			</Box>
		</React.Fragment>;
};

Table = React.memo(Table);
Table.defaultProps = {
};

export default Table;
