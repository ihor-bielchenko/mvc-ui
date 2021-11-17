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
import SelectOperatorUnion from 'components/Select/OperatorUnion';
import { StyledChip } from 'components/Input/LogicValue.jsx';
import onMenu from 'components/Menu/onMenu.js';
import onDialog from 'components/Dialog/onDialog.js';
import { getLang } from 'components/Language';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { 
	DATA_TYPE_ID,
	DATA_TYPE_BOOLEAN,
	DATA_TYPE_NUMBER,
	DATA_TYPE_TIME, 
} from 'structures/dataTypes.js';
import onOperatorUnion from './onOperatorUnion.js';
import onAdd from './onAdd.js';
import onEdit from './onEdit.js';
import onDelete from './onDelete.js';

let Table = () => {
	const filterOperatorId = useSelector((state) => state.jsObject.tempValue.filter_operator_id ?? process.env.OPERATOR_UNION_AND);
	const filterKeys = useSelector((state) => Object.keys(state.jsObject.tempValue.filter || {}));

	return <React.Fragment>
		{filterKeys.length > 0
			? <React.Fragment>
				{filterKeys.length > 1
					? <Box 
						maxWidth="210px"
						py={2}>
						<SelectOperatorUnion 
							name="filter_operator_id"
							value={filterOperatorId}
							onSelect={onOperatorUnion} />
					</Box>
					: <React.Fragment />}
				<TableContainer>
					<TableMaterial>
						<TableHead>
							<TableRow>
								<TableCell>
									Поле
								</TableCell>
								<TableCell>
									Оператор
								</TableCell>
								<TableCell>
									Значение
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filterKeys.map((id) => {
								const filterItem = Store().getState().jsObject.tempValue.filter[id];
								const column = Store().getState().db.columns[filterItem.column_id];

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
											{getLang('OperatorIf'+ filterItem.operator_if_id)}
										</Typography>
									</TableCell>
									<TableCell>
										{column.data_type_id === DATA_TYPE_BOOLEAN.id
											? <b 
												style={{
													color: filterItem.value === true
														? 'blue'
														: 'red',
												}}>
												{(typeof filterItem.value === 'object' && 
													filterItem.value.source_type_id === SOURCE_TYPE_SCRIPT.id)
													? <div 
														style={{ 
															position: 'relative',
															height: 60, 
														}}>
														<StyledChip label={SOURCE_TYPE_SCRIPT.text()} />
													</div>
													: String(Boolean(filterItem.value))}
											</b>
											: (column.data_type_id === DATA_TYPE_ID.id ||
												column.data_type_id === DATA_TYPE_NUMBER.id ||
												column.data_type_id === DATA_TYPE_TIME.id)
												? <b style={{ color: 'blue' }}>
													{(typeof filterItem.value === 'object' && 
														filterItem.value.source_type_id === SOURCE_TYPE_SCRIPT.id)
														? <div 
															style={{ 
																position: 'relative',
																height: 60, 
															}}>
															<StyledChip label={SOURCE_TYPE_SCRIPT.text()} />
														</div>
														: String(filterItem.value)}
												</b>
												: (typeof filterItem.value === 'object' && 
													filterItem.value.source_type_id === SOURCE_TYPE_SCRIPT.id)
													? <div 
														style={{ 
															position: 'relative',
															height: 60, 
														}}>
														<StyledChip label={SOURCE_TYPE_SCRIPT.text()} />
													</div>
													: String(filterItem.value)}
									</TableCell>
									<TableCell width="1%">
										<IconButton 
											size="small"
											onClick={onMenu('filter-'+ id)}>
											<MoreVertIcon />
										</IconButton>
										<MenuControl 
											aria={'filter-'+ id}
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
			</React.Fragment>
			: <Box
				my={3}
				align="center">
				<Typography 
					variant="body2"
					color="textSecondary">
					Не создан ни один фильтр
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
