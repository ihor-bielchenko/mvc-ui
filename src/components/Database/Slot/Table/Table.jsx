import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TableMaterial from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import MenuControl from 'components/Menu/Control';
import onMenu from 'components/Menu/onMenu.js';
import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_DB_TABLE } from 'consts/dialog.js';
import dataTypes, {
	DATA_TYPE_ID,
	DATA_TYPE_NUMBER,
} from 'structures/dataTypes.js';
import Slot from '../Slot';

let Table = ({ id }) => {
	const tableName = useSelector((state) => ((state.db.tables || {})[id] || {}).name);
	const columns = useSelector((state) => (state.db.columns || {}));
	const columnsKeys = Object.keys(columns);

	return <React.Fragment>
		<Slot id={id}>
			<Box
				display="flex"
				alignItems="flex-start"
				p="4px"
				style={{
					cursor: 'grab',
					backgroundColor: '#f3e5f5',
				}}>
				<Typography
					component="div"
					variant="body2"
					style={{
						minWidth: 140,
						paddingTop: 4,
						overflow: 'hidden',
					}}>
					<b>{tableName}</b>
				</Typography>
				<IconButton 
					size="small"
					onClick={onMenu('menu-table-'+ id)}>
					<MoreVertIcon fontSize="small" />
				</IconButton>
				<MenuControl
					aria={'menu-table-'+ id}
					onEdit={onDialog(DIALOG_DB_TABLE, {
						id,
					})}
					onDelete={() => {}} />
			</Box>
			{columnsKeys.length > 0
				? <TableMaterial>
					<TableBody>
						{columnsKeys.map((columnId) => {
							return <React.Fragment key={columnId}>
								<TableRow>
									<TableCell width="24px">
										{columns[columnId].data_type_id === DATA_TYPE_ID.id
											? <VpnKeyIcon
												fontSize="small"
												style={{
													color: '#f57c00',
												}} />
											: <React.Fragment />}
									</TableCell>
									<TableCell>
										<Typography variant="caption">
											<b>{columns[columnId].name}</b>
										</Typography>
									</TableCell>
									<TableCell>
										<Typography variant="caption">
											{columns[columnId].data_type_id === DATA_TYPE_ID.id
												? DATA_TYPE_NUMBER.text()
												: dataTypes[columns[columnId].data_type_id].text()}
										</Typography>
									</TableCell>
									<TableCell width="24px">
										<IconButton
											disabled
											size="small">
											<ArrowRightAltIcon fontSize="small" />
										</IconButton>
									</TableCell>
								</TableRow>
							</React.Fragment>;
						})}
					</TableBody>
				</TableMaterial>
				: <React.Fragment />}
		</Slot>
	</React.Fragment>;
};

Table = React.memo(Table);
Table.defaultProps = {
	id: 0,
};

export default Table;
