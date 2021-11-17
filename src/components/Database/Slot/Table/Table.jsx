import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
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
import dataTypes, {
	DATA_TYPE_ID,
	DATA_TYPE_NUMBER,
} from 'structures/dataTypes.js';

const BoxWrapper = styled(Box)`
	background-color: #FFF;
	border: 1px solid #9B9B9B;
	border-radius: 7px;

	& tr:first-child {
		border-top: 1px solid rgba(224, 224, 224, 1);
	}

	& td {
		padding: 2px 2px 0px;
	}
	& td:not(:last-child) {
		border-right: 1px solid rgba(224, 224, 224, 1);
	}
`;

let Table = ({ id }) => {
	const tableName = useSelector((state) => ((state.db.tables || {})[id] || {}).name);
	const columns = useSelector((state) => (state.db.columns || {}));
	const columnsKeys = Object.keys(columns);

	return <React.Fragment>
		<BoxWrapper
			position="absolute"
			top="90px"
			left="90px"
			maxWidth="280px"
			width="max-content">
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
					onEdit={() => {}}
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
		</BoxWrapper>
	</React.Fragment>;
};

Table = React.memo(Table);
Table.defaultProps = {
	id: 0,
};

export default Table;
