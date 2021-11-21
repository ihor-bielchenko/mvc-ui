import React from 'react';
import { useSelector } from 'react-redux';
import { 
	withRouter,
	Link,
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import Search from 'components/Search';
import MenuControl from 'components/Menu/Control';
import onMenu from 'components/Menu/onMenu.js';
import onDialog from 'components/Dialog/onDialog.js';
import getProjectId from 'components/Service/getProjectId.js';
import getServiceId from 'components/Service/getServiceId.js';
import protocol from 'structures/protocol.js';
import method from 'structures/method.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import {
	URL_PAGE_SERVICE,
	URL_PAGE_API,
} from 'consts/url.js';
import onPageChange from './onPageChange.js';
import onRowsPerPageChange from './onRowsPerPageChange.js';
import onMount from './onMount.js';
import onUnmount from './onUnmount.js';
import onDelete from './onDelete.js';
import onCheckboxAll from './onCheckboxAll.js';
import onCheckboxRow from './onCheckboxRow.js';
import onSearch from './onSearch.js';

let Api = ({ history }) => {
	const projectId = getProjectId();
	const serviceId = getServiceId();
	const domain = useSelector((state) => state.account.path);
	const subdomainProjectPath = useSelector((state) => (state.services.form.project || {}).subdomain_path || '');
	const subdomainServicePath = useSelector((state) => state.services.form.subdomain_path)
	const rowsPerPage = useSelector((state) => state.list.rowsPerPage);
	const currentPage = useSelector((state) => state.list.currentPage);
	const select = useSelector((state) => ([ ...state.list.select ]));
	const query = useSelector((state) => state.list.search.query);
	const total = useSelector((state) => state.list.total);
	const data = useSelector((state) => state.list.data);

	React.useEffect(() => {
		onMount();
	}, [
		currentPage,
		rowsPerPage,
		query,
	]);

	React.useEffect(() => () => {
		onUnmount();
	}, [
	]);

	return <React.Fragment>
		<Box 
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			py="14px">
			<ButtonGroup>
				<Button
					component={Link}
					to={`/${projectId}/${URL_PAGE_SERVICE}/${serviceId}/${URL_PAGE_API}/0`}
					startIcon={<AddIcon />}>
					Добавить
				</Button>
				<Button
					disabled
					color="primary"
					startIcon={<EditIcon />}>
					Копировать
				</Button>
				<Button
					disabled={!(select.length > 0)}
					color="secondary"
					startIcon={<CloseIcon />}
					onClick={onDialog(DIALOG_DELETE_CONFIRM, {
						onDelete: onDelete(),
					})}>
					Удалить
				</Button>
			</ButtonGroup>
			<IconButton disabled>
				<FilterListIcon />
			</IconButton>
		</Box>
		<Box>
			<Search onSubmit={onSearch} />
		</Box>
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell padding="checkbox">
							<Checkbox
								checked={select.length > 0
									&& select.length === data.length}
								onChange={onCheckboxAll} />
						</TableCell>
						<TableCell>
							<Typography variant="caption">
								Метод
							</Typography>
						</TableCell>
						<TableCell>
							<Typography variant="caption">
								Путь
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((item, i) => {
						return <TableRow 
							key={item.id}
							style={{
								verticalAlign: 'initial',
							}}>
							<TableCell padding="checkbox">
								<Checkbox
									checked={select.includes(item.id)}
									onChange={onCheckboxRow(item.id)} />
							</TableCell>
							<TableCell>
								<Chip 
									label={method[item.method_id].name}
									style={{
										color: method[item.method_id].textColor,
										backgroundColor: method[item.method_id].backgroundColor,
									}} />
							</TableCell>
							<TableCell>
								<Link to={`/${projectId}/${URL_PAGE_SERVICE}/${serviceId}/${URL_PAGE_API}/${item.id}`}>
									<Typography variant="h6">
										{protocol[item.protocol_id].text()}://{subdomainServicePath}.{subdomainProjectPath}.{domain}
									</Typography>
								</Link>
								<Typography style={{ padding: '8px 0 0', }}>
									{item.name}
								</Typography>
							</TableCell>
							<TableCell 
								width="96px"
								style={{
									width: 48,
									padding: 0,
								}}>
								<IconButton onClick={onMenu('menu-control-'+ item.id)}>
									<MoreVertIcon />
								</IconButton>
								<MenuControl 
									aria={'menu-control-'+ item.id}
									onEdit={() => {
										history.push(`/${projectId}/${URL_PAGE_SERVICE}/${serviceId}/${URL_PAGE_API}/${item.id}`);
									}}
									onDelete={onDialog(DIALOG_DELETE_CONFIRM, {
										onDelete: onDelete(item.id),
									})} />
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
	</React.Fragment>;
};

Api = React.memo(Api);
Api.defaultProps = {
};

export default withRouter(Api);
