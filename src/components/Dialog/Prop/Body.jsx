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
import CloseIcon from '@material-ui/icons/Close';
import InputText from 'components/Input/Text';
import SelectType from 'components/Select/Type';
import MenuSource from 'components/Menu/Source';
import onMenu from 'components/Menu/onMenu.js';
import loadColumnInputs from 'utils/loadColumnInputs.js';
import columnTypes, { 
	COLUMN_ID,
	COLUMN_ARR, 
} from 'structures/columnTypes.js';
import {
	FORMAT_OBJ,
	FORMAT_ARR,
} from 'structures/format.js';
import onDeleteValue from './onDeleteValue.js';
import onComplexValue from './onComplexValue.js';
import onComplexDelete from './onComplexDelete.js';
import onChangeItem from './onChangeItem.js';
import onSelectTypeId from './onSelectTypeId.js';

let Item = ({ 
	id,
	formatId, 
}) => {
	const _id = id.toString();
	const _idKey = 'key-'+ _id;
	const _idValue = 'value-'+ _id;
	const key = useSelector((state) => (state.prop.body[id] || {}).key || '');
	const value = useSelector((state) => (state.prop.body[id] || {}).value ?? '');
	const typeId = useSelector((state) => (state.prop.body[id] || {}).type_id ?? '');
	const _onSelectTypeId = React.useCallback((e) => onSelectTypeId(e, id), [
		id,
	]);
	const Component = React.useMemo(() => React.lazy(loadColumnInputs(typeId)), [
		typeId,
	]);

	console.log('key', key);

	return <TableRow>
		{(formatId === FORMAT_OBJ.id || formatId === FORMAT_ARR.id)
			? <React.Fragment>
				<TableCell 
					style={{
						border: 'none',
						paddingLeft: 0,
						paddingRight: 0,
						textAlign: 'right',
					}}>
					{formatId === FORMAT_ARR.id
						? <Typography 
							variant="h6"
							color="primary">
							<b>{key.toString()}</b>
						</Typography>
						: <InputText
							menu
							onMenu={onMenu(_idKey)}
							onValue={onComplexValue}
							onDelete={onComplexDelete}
							name={_idKey}
							id={_idKey}
							value={key.toString()}
							onChange={onChangeItem(id, 'key')}
							label="" />}
				</TableCell>
				<TableCell 
					align="center"
					width="1%"
					style={{
						border: 'none',
						paddingLeft: 0,
						paddingRight: 0,
					}}>
					<Typography variant="h6">
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
				name={'type_id-'+ id}
				value={typeId}
				onSelect={_onSelectTypeId}
				onFilter={(key) => columnTypes[key].id !== COLUMN_ID.id
					&& columnTypes[key].id !== COLUMN_ARR.id}
				label="Выбрать тип" />
		</TableCell>
		<TableCell 
			style={{
				border: 'none',
				paddingLeft: 0,
				paddingRight: 0,
			}}>
			<React.Suspense fallback={<Typography>Подождите...</Typography>}>
				<Component
					menu
					onMenu={onMenu(_idValue)}
					onValue={onComplexValue}
					onDelete={onComplexDelete}
					name={_idValue}
					id={_idValue}
					value={value}
					onChange={onChangeItem(id, 'value')}
					label="" />
			</React.Suspense>
			<MenuSource 
				aria={_idValue}
				typeId={typeId} />
		</TableCell>
		{(formatId === FORMAT_OBJ.id || formatId === FORMAT_ARR.id)
			? <TableCell 
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
					<CloseIcon fontSize="small" />
				</IconButton>
			</TableCell>
			: <React.Fragment />}
	</TableRow>;
};
Item = React.memo(Item);
Item.defaultProps = {
	id: 0,
	formatId: 0,
};

let Body = ({ formatId }) => {
	const bodyKeys = useSelector((state) => Object.keys(state.prop.body));
	
	return <React.Fragment>
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						{(formatId === FORMAT_OBJ.id || formatId === FORMAT_ARR.id)
							? <React.Fragment>
								<TableCell 
									align={formatId === FORMAT_ARR.id
										? 'left'
										: 'center'}
									padding="none"
									width={formatId === FORMAT_ARR.id
										? '4%'
										: '20%'}
									style={{
										position: 'relative',
									}}>
									<Typography 
										variant="caption"
										color="textSecondary"
										{ ...formatId === FORMAT_ARR.id
											? {
												style: {
													width: '100%',
													height: '100%',
													position: 'absolute',
													left: 22,
													top: 0,
													paddingTop: 16,
													lineHeight: '1.6rem',
												},
											}
											: {} }>
										Ключ
									</Typography>
								</TableCell>
								<TableCell />
							</React.Fragment>
							: <React.Fragment />}
						<TableCell align="center">
							<Typography 
								variant="caption"
								color="textSecondary">
								Тип данных
							</Typography>
						</TableCell>
						<TableCell align="center">
							<Typography 
								variant="caption"
								color="textSecondary">
								Значение
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{bodyKeys.map((id) => <Item 
						key={id}
						id={id}
						formatId={formatId} />
					)}
				</TableBody>
			</Table>
		</TableContainer>
	</React.Fragment>;
};

Body = React.memo(Body);
Body.defaultProps = {
	formatId: 0,
};

export default Body;
