import React from 'react';
import { useSelector } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Store from 'components/Store';
import InputText from 'components/Input/Text';
import SelectType from 'components/Select/Type';
import MenuSource from 'components/Menu/Source';
import onMenu from 'components/Menu/onMenu.js';
import {
	COLUMN_OBJ,
	COLUMN_ARR,
} from 'structures/columnTypes.js';
import onDeleteValue from './onDeleteValue.js';
import onComplexValue from './onComplexValue.js';
import onComplexDelete from './onComplexDelete.js';
import onChangeValue from './onChangeValue.js';

let Body = () => {
	const bodyKeys = useSelector((state) => Object.keys(state.prop.body));
	const bodyData = Store().getState().prop.body;

	return <React.Fragment>
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						{bodyKeys.length > 1
							? <React.Fragment>
								<TableCell>
									<Typography 
										variant="caption"
										color="textSecondary">
										Ключ
									</Typography>
								</TableCell>
								<TableCell />
							</React.Fragment>
							: <React.Fragment />}
						<TableCell>
							<Typography 
								variant="caption"
								color="textSecondary">
								Тип
							</Typography>
						</TableCell>
						<TableCell>
							<Typography 
								variant="caption"
								color="textSecondary">
								Значение
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{bodyKeys.map((id) => {
						const _id = id.toString();
						const _idKey = 'key-'+ _id;
						const _idValue = 'value-'+ _id;
						
						return <TableRow key={id}>
							{bodyKeys.length > 1
								? <React.Fragment>
									<TableCell 
										width="20%"
										style={{
											border: 'none',
											paddingLeft: 0,
											paddingRight: 0,
										}}>
										<InputText
											menu
											onMenu={onMenu(_idKey)}
											onValue={onComplexValue}
											onDelete={onComplexDelete}
											name={_idKey}
											id={_idKey}
											defaultValue={bodyData[id].key}
											onChange={onChangeValue(id)}
											label="" />
									</TableCell>
									<TableCell 
										align="center"
										width="1%"
										style={{
											border: 'none',
											paddingLeft: 0,
											paddingRight: 0,
										}}>
										<Typography variant="h5">
											<b>:</b>
										</Typography>
									</TableCell>
								</React.Fragment>
								: <React.Fragment />}
							<TableCell 
								style={{
									border: 'none',
									paddingLeft: 0,
									paddingRight: 14,
								}}>
								<SelectType 
									offId>
									<MenuItem 
										value={COLUMN_OBJ.id.toString()}
										disabled={!!COLUMN_OBJ.disabled}>
										{COLUMN_OBJ.text()}
									</MenuItem>
									<MenuItem 
										value={COLUMN_ARR.id.toString()}
										disabled={!!COLUMN_ARR.disabled}>
										{COLUMN_ARR.text()}
									</MenuItem>
								</SelectType>
							</TableCell>
							<TableCell 
								style={{
									border: 'none',
									paddingLeft: 0,
									paddingRight: 0,
								}}>
								<InputText
									menu
									onMenu={onMenu(_idValue)}
									onValue={onComplexValue}
									onDelete={onComplexDelete}
									name={_idValue}
									id={_idValue}
									defaultValue={bodyData[id].value}
									onChange={onChangeValue(id)}
									label="" />
								<MenuSource aria={_idValue} />
							</TableCell>
							<TableCell 
								width="1%"
								style={{
									border: 'none',
									paddingLeft: 0,
									paddingRight: 0,
								}}>
								<IconButton 
									color="secondary"
									size="small"
									onClick={onDeleteValue(id)}>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</TableCell>
						</TableRow>;
					})}
				</TableBody>
			</Table>
		</TableContainer>
	</React.Fragment>;
};

Body = React.memo(Body);
Body.defaultProps = {
};

export default Body;
