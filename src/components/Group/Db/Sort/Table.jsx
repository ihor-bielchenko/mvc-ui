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
import MenuEntity from 'components/Menu/Entity';
import onMenu from 'components/Menu/onMenu.js';
import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import { COLUMN_ID } from 'structures/columnTypes.js';
import onAdd from './onAdd.js';
import onEdit from './onEdit.js';
import onDelete from './onDelete.js';

let Table = () => {
	const sortKeys = useSelector((state) => Object.keys(state.jsObject.tempValue.sort || {}));

	return <React.Fragment>
		{sortKeys.length > 0
			? <TableContainer>
				<TableMaterial>
					<TableHead>
						<TableRow>
							<TableCell width="60%">
								По какому полю сортировать
							</TableCell>
							<TableCell>
								Направление сортировки
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sortKeys.map((id) => {
							const sortItem = Store().getState().jsObject.tempValue.sort[id];
							const column = Store().getState().dbColumns.data[sortItem.column_id];

							return <TableRow key={id}>
								<TableCell>
									<Typography 
										variant="h6"
										color={column.type_id === COLUMN_ID.id
											? 'secondary'
											: 'primary'}>
										<b>{column.name}</b>
									</Typography>
								</TableCell>
								<TableCell>
									<Typography variant="h6">
										{sortItem.direction === 0
											? '↑ По возрастанию'
											: '↓ По убыванию'}
									</Typography>
								</TableCell>
								<TableCell width="1%">
									<IconButton 
										size="small"
										onClick={onMenu('sort-'+ id)}>
										<MoreVertIcon />
									</IconButton>
									<MenuEntity 
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
					Нет ни одной настройки
				</Typography>
			</Box>}
			<Box mt={2}>
				<Button
					size="small"
					color="primary"
					variant="outlined"
					startIcon={<AddIcon />}
					onClick={onAdd}>
					Добавить
				</Button>
			</Box>
		</React.Fragment>;
};

Table = React.memo(Table);
Table.defaultProps = {
};

export default Table;
