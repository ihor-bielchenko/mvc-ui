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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import Search from 'components/Search';
import MenuControl from 'components/Menu/Control';
import onMenu from 'components/Menu/onMenu.js';
import onDialog from 'components/Dialog/onDialog.js';
import { DATA_TYPE_ID } from 'structures/dataTypes.js';
import { 
	DIALOG_DELETE_CONFIRM,
	DIALOG_DB_PROPS, 
} from 'consts/dialog.js';
import onPageChange from './onPageChange.js';
import onRowsPerPageChange from './onRowsPerPageChange.js';
import onMount from './onMount.js';
import onUnmount from './onUnmount.js';
import onEdit from './onEdit.js';
import onDelete from './onDelete.js';
import onCheckboxAll from './onCheckboxAll.js';
import onCheckboxRow from './onCheckboxRow.js';
import onSearch from './onSearch.js';
import { getLang } from 'components/Language';

let List = ({ id }) => {
	const rowsPerPage = useSelector((state) => state.list.rowsPerPage);
	const currentPage = useSelector((state) => state.list.currentPage);
	const select = useSelector((state) => ([ ...state.list.select ]));
	const query = useSelector((state) => state.list.search.query);
	const total = useSelector((state) => state.list.total);
	const fetch = useSelector((state) => state.list.fetch);
	const data = useSelector((state) => state.list.data);
	const filter = useSelector((state) => state.list.filter || '');
	const sort = useSelector((state) => state.list.sort || '');
	const filterOperatorId = useSelector((state) => state.list.filter_operator_id);
	const columns = useSelector((state) => state.db.columns);
	const columnKeys = Object.keys(columns);
	const _onEdit = React.useCallback((rowIndex, rowId) => (e) => onEdit(e, id, rowIndex, rowId), [
		id,
	]);
	const _onDelete = React.useCallback((rowId) => (e) => onDelete(e, id, rowId), [
		id,
	]);
	const _onCheckboxAll = React.useCallback((e) => onCheckboxAll(e), [
	]);
	const _onCheckboxRow = React.useCallback((rowId) => (e) => onCheckboxRow(e, rowId), [
	]);
	const _onSearch = React.useCallback((e) => onSearch(e, id), [
		id,
	]);

	React.useEffect(() => {
		onMount(id);
	}, [
		id,
		currentPage,
		rowsPerPage,
		query,
		filter,
		sort,
		filterOperatorId,
	]);

	React.useEffect(() => () => {
		onUnmount();
	}, [
	]);

	return (columnKeys.length > 0)
		? <React.Fragment>
			<Box 
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				py="14px">
				<ButtonGroup>
					<Button
						startIcon={<AddIcon />}
						onClick={_onEdit()}>
						{getLang('Add')}
					</Button>
					<Button
						disabled
						color="primary"
						startIcon={<EditIcon />}>
						{getLang('Copy')}
					</Button>
					<Button
						disabled={!(select.length > 0)}
						color="secondary"
						startIcon={<CloseIcon />}
						onClick={onDialog(DIALOG_DELETE_CONFIRM, {
							onDelete: _onDelete(),
						})}>
						{getLang('Delete')}
					</Button>
				</ButtonGroup>
				<IconButton onClick={onDialog(DIALOG_DB_PROPS)}>
					<FilterListIcon />
				</IconButton>
			</Box>
			<Box>
				<Search onSubmit={_onSearch} />
			</Box>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox
									checked={select.length > 0
										&& select.length === data.length}
									onChange={_onCheckboxAll} />
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

							return findIdKey > 0
								? <TableRow key={item[findIdKey]}>
									<TableCell padding="checkbox">
										<Checkbox
											checked={select.includes(fetch[i].id)}
											onChange={_onCheckboxRow(fetch[i].id)} />
									</TableCell>
									{columnKeys.map((columnKey, i) => {
										return <TableCell key={columns[columnKey].id}>
											{item[columnKey]}
										</TableCell>;
									})}
									<TableCell 
										width="96px"
										style={{
											width: 48,
											padding: 0,
										}}>
										<IconButton onClick={onMenu('menu-control-'+ item[findIdKey])}>
											<MoreVertIcon />
										</IconButton>
										<MenuControl 
											aria={'menu-control-'+ item[findIdKey]}
											onEdit={_onEdit(i, fetch[i].id)}
											onDelete={onDialog(DIALOG_DELETE_CONFIRM, {
												onDelete: _onDelete(fetch[i].id),
											})} />
									</TableCell>
								</TableRow>
								: <React.Fragment key={'no-'+ i} />;
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
