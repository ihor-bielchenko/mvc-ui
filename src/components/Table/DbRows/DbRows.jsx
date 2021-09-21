import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import MenuEntity from 'components/Menu/Entity';
import MenuFilter from 'components/Menu/Filter';
import onMenu from 'components/Menu/onMenu.js';
import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import onCheckAll from './onCheckAll.js';
import onCheckOne from './onCheckOne.js';
import onSearch from './onSearch.js';

let DbRows = ({ 
	isControl,
	selectText,
}) => {
	const submitRef = React.useRef(null);
	const dbColumns = useSelector((state) => state.dbColumns.data);
	const dbRows = useSelector((state) => state.dbRows.data);
	const select = useSelector((state) => state.dbRows.select);
	const total = useSelector((state) => state.dbRows.total);
	const rowsPerPage = useSelector((state) => state.dbRows.rowsPerPage);
	const page = useSelector((state) => state.dbRows.page);
	const query = useSelector((state) => state.dbRows.query);
	const queryPlaceholders = useSelector((state) => state.dbRows.queryPlaceholders);
	const dbColumnKeys = Object.keys(dbColumns);

	return <React.Fragment>
		<Paper elevation={3}>
			<Box 
				p="8px"
				minWidth="800px">
			{(dbRows.length > 0 && dbColumnKeys.length > 0)
				? <React.Fragment>
					{select.length > 0
						? <Box 
							py={2}
							display="flex"
							alignItems="center">
							<Typography 
								variant="h6"
								color="primary">
								{selectText}: <b>{select.length}</b>
							</Typography>
						</Box>
						: <React.Fragment />}
					<form onSubmit={onSearch}>
						<Grid 
							container
							alignItems="center">
							<Grid 
								item 
								xs={true}>
								<Autocomplete
									freeSolo
									id="input-search"
									value={query}
									onInput={() => {}}
									options={queryPlaceholders}
									renderInput={(params) => (
										<TextField 
											{...params} 
											label="Поиск"
											placeholder="Поисковой запрос" 
											name="query"
											margin="normal" 
											variant="outlined"
											InputProps={{
												endAdornment: query.length > 0
													? <InputAdornment>
														<IconButton 
															size="small"
															onClick={() => {}}>
															<CloseIcon fontSize="small" />
														</IconButton>
													</InputAdornment>
													: <React.Fragment />,
											}} />
									)} />
							</Grid>
							<Grid 
								item 
								xs={false}
								style={{
									paddingLeft: 8,
								}}>
								<IconButton 
									ref={submitRef}
									type="submit"
									color="primary">
									<SearchIcon />
								</IconButton>
								<IconButton 
									color="primary"
									onClick={onMenu('menu-filter')}>
									<FilterListIcon />
								</IconButton>
								<RadioGroup>
									<MenuFilter />
								</RadioGroup>
							</Grid>
						</Grid>
					</form>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell padding="checkbox">
										<Checkbox
											checked={select.length > 0 && select.length === dbRows.length}
											onChange={onCheckAll} />
									</TableCell>
									{dbColumnKeys.map((key, i) => {
										return dbColumns[key].type_id > 0
											? <TableCell key={dbColumns[key].id}>
												<Typography variant="caption">
													{dbColumns[key].name}
												</Typography>
											</TableCell>
											: <React.Fragment key={dbColumns[key].id} />;
									})}
								</TableRow>
							</TableHead>
							<TableBody>
							{dbRows.map((row) => {
								const rowKeys = Object.keys(row);

								return <TableRow key={row[1]}>
									{rowKeys.map((key, i) => {
										return Number(key) === 1
											? <TableCell 
												key={row[1] +'-'+ key}
												padding="checkbox">
												<Checkbox
													checked={select.indexOf(row[1]) > -1}
													onChange={onCheckOne(row[1])} />
											</TableCell>
											: <TableCell key={row[1] +'-'+ key}>
												<Typography>
													{row[key]}
												</Typography>
											</TableCell>;
									})}
									{isControl
										? <TableCell width="1%">
											<IconButton 
												size="small"
												onClick={onMenu('db-row-'+ row[1])}>
												<MoreVertIcon />
											</IconButton>
											<MenuEntity 
												aria={'db-row-'+ row[1]}
												onEdit={() => {}}
												onCopy={() => {}}
												onDelete={onDialog(DIALOG_DELETE_CONFIRM, {
													onDelete: () => {},
												})} />
										</TableCell>
										: <React.Fragment />}
								</TableRow>
							})}
							</TableBody>
						</Table>
					</TableContainer>
					<Box py={4}>
						<TablePagination
							rowsPerPage={rowsPerPage}
							page={page}
							count={total}
							rowsPerPageOptions={[ 5, 10, 20, 50 ]}
							component="div"
							onPageChange={() => {}}
							onRowsPerPageChange={() => {}} />
					</Box>
				</React.Fragment>
				: <Box
					py={2}
					align="center">
					<Typography color="textSecondary">
						Нет созданных элементов
					</Typography>
				</Box>}
			</Box>
		</Paper>
	</React.Fragment>;
};

DbRows = React.memo(DbRows);
DbRows.defaultProps = {
	isControl: false,
	selectText: 'Выбрано элементов',
};

export default DbRows;
