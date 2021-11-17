import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import Search from 'components/Search';
import { DATA_TYPE_ID } from 'structures/dataTypes.js';
import onPageChange from './onPageChange.js';
import onRowsPerPageChange from './onRowsPerPageChange.js';

let List = ({ id }) => {
	const rowsPerPage = useSelector((state) => state.db.list.rowsPerPage);
	const currentPage = useSelector((state) => state.db.list.current_page);
	const total = useSelector((state) => state.db.list.total);
	const data = useSelector((state) => state.db.list.data);
	const columns = useSelector((state) => state.db.columns);
	const columnKeys = Object.keys(columns);

	return (columnKeys.length > 0)
		? <React.Fragment>
			<Box 
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				py="14px">
				<ButtonGroup>
					<Button
						color="primary"
						startIcon={<AddIcon />}>
						Добавить
					</Button>
					<Button
						color="primary"
						startIcon={<EditIcon />}>
						Копировать
					</Button>
					<Button
						color="secondary"
						startIcon={<CloseIcon />}>
						Удалить
					</Button>
				</ButtonGroup>
				<IconButton>
					<FilterListIcon />
				</IconButton>
			</Box>
			<Box>
				<Search />
			</Box>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox />
							</TableCell>
							{columnKeys.map((columnKey) => {
								return <TableCell key={columns[columnKey].id}>
									{columns[columnKey].name}
								</TableCell>;
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((item, i) => {
							const itemKeys = Object.keys(item);
							const findIdKey = itemKeys.find((columnKey) => columns[columnKey].data_type_id === DATA_TYPE_ID.id);

							return <TableRow key={item[findIdKey]}>
								<TableCell padding="checkbox">
									<Checkbox />
								</TableCell>
								{itemKeys.map((columnKey, i) => {
									return <TableCell key={columns[columnKey].id}>
										{item[columnKey]}
									</TableCell>;
								})}
								<TableCell 
									width="96px"
									style={{
										width: 96,
										padding: 0,
									}}>
									<IconButton
										color="primary">
										<EditIcon />
									</IconButton>
									<IconButton
										color="secondary">
										<CloseIcon />
									</IconButton>
								</TableCell>
							</TableRow>;
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPage={rowsPerPage}
				page={currentPage}
				count={total}
				rowsPerPageOptions={[ 5, 10, 20, 50 ]}
				component="div"
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange} />
		</React.Fragment>
		: <React.Fragment />;
};

List = React.memo(List);
List.defaultProps = {
	id: 0,
};

export default List;
