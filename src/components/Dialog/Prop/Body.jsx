import React from 'react';
import styled from 'styled-components';
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
	COLUMN_TEXT,
} from 'structures/columnTypes.js';
import {
	FORMAT_OBJ,
	FORMAT_ARR,
} from 'structures/format.js';
import onChangeItem from './onChangeItem.js';
import onDeleteItem from './onDeleteItem.js';
import onChangeLogic from './onChangeLogic.js';
import onDeleteLogic from './onDeleteLogic.js';
import onSelectTypeId from './onSelectTypeId.js';

const TableCellValue = styled(TableCell)`
	border: none !important;
	padding-bottom: 4px !important;
	padding-top: ${(props) => props['data-index'] === 0
		? 28
		: 12}px !important;

	& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline,
	& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline,
	& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
		border-color: rgba(0, 0, 0, 0.23);
		border-width: 1px;
		${(props) => props['data-is_type_id']
			? `
				border-right: none;
				border-top-right-radius: 0px;
				border-bottom-right-radius: 0px;
			`
			: `
				border-top-left-radius: 0px;
				border-bottom-left-radius: 0px;
			`}
	}
`;
let Item = ({ 
	id,
	index,
	formatId, 
}) => {
	const _id = id.toString();
	const _idKey = 'key-'+ _id;
	const key = useSelector((state) => (state.prop.body[id] || {}).key || '');
	const value = useSelector((state) => (state.prop.body[id] || {}).value ?? '');
	const typeId = useSelector((state) => (state.prop.body[id] || {}).type_id ?? COLUMN_TEXT.id);
	const _onSelectTypeId = React.useCallback((e) => onSelectTypeId(e, id), [
		id,
	]);
	const Component = React.useMemo(() => React.lazy(loadColumnInputs(typeId)), [
		typeId,
	]);
	const _onChangeLogic = React.useCallback((e) => onChangeLogic(e, _id), [
		_id,
	]);
	const _onDeleteLogic = React.useCallback((e) => onDeleteLogic(e, _id), [
		_id,
	]);
	const _onChangeItemKey = React.useCallback((e) => onChangeItem(e, _id, 'key'), [
		_id,
	]);
	const _onChangeItemValue = React.useCallback((e) => onChangeItem(e, _id, 'value'), [
		_id,
	]);
	const _onDeleteItem = React.useCallback((e) => onDeleteItem(e, _id), [
		_id,
	]);

	return <TableRow>
		{(formatId === FORMAT_OBJ.id || formatId === FORMAT_ARR.id)
			? <React.Fragment>
				<TableCell 
					style={{
						border: 'none',
						paddingLeft: 0,
						paddingRight: 0,
						textAlign: 'right',
						paddingBottom: 4,
						paddingTop: index === 0
							? 28
							: 12,
					}}>
					{formatId === FORMAT_ARR.id
						? <Typography 
							variant="h5"
							color="primary">
							<b>{key.toString()}</b>
						</Typography>
						: <InputText
							menu
							onMenu={() => {}}
							name={_idKey}
							id={_idKey}
							value={key.toString()}
							onChange={_onChangeItemKey}
							label="" />}
				</TableCell>
				<TableCell 
					align="center"
					width="1%"
					style={{
						border: 'none',
						paddingRight: 4,
						paddingLeft: 4,
						paddingBottom: 4,
						paddingTop: index === 0
							? 28
							: 12,
					}}>
					<Typography 
						variant="h5"
						color="textSecondary">
						<b>:</b>
					</Typography>
				</TableCell>
			</React.Fragment>
			: <React.Fragment />}
		<TableCellValue 
			data-is_type_id={1}
			data-index={index}>
			<SelectType 
				name={'type_id-'+ id}
				value={typeId}
				onSelect={_onSelectTypeId}
				onFilter={(key) => columnTypes[key].id !== COLUMN_ID.id
					&& columnTypes[key].id !== FORMAT_ARR.id}
				label="" />
		</TableCellValue>
		<TableCellValue data-index={index}>
			<React.Suspense fallback={<Typography>Подождите...</Typography>}>
				<Component
					menu
					onMenu={onMenu(_id)}
					onValue={_onChangeLogic}
					onDelete={_onDeleteLogic}
					name={_id}
					id={_id}
					defaultValue={value}
					onChange={_onChangeItemValue}
					label="" />
			</React.Suspense>
			<MenuSource 
				aria={_id}
				typeId={typeId} />
		</TableCellValue>
		{(formatId === FORMAT_OBJ.id || formatId === FORMAT_ARR.id)
			? <TableCell 
				width="1%"
				style={{
					border: 'none',
					paddingLeft: 4,
					paddingBottom: 4,
					paddingTop: index === 0
						? 28
						: 12,
				}}>
				<IconButton 
					color="secondary"
					size="small"
					onClick={_onDeleteItem}>
					<CloseIcon fontSize="small" />
				</IconButton>
			</TableCell>
			: <React.Fragment />}
	</TableRow>;
};
Item = React.memo(Item);
Item.defaultProps = {
	id: 0,
	index: 0,
	formatId: 0,
};

let Body = ({ formatId }) => {
	const bodyKeys = useSelector((state) => Object.keys(state.prop.body));
	
	return <React.Fragment>
		<TableContainer>
			<Table padding="none">
				<TableHead>
					<TableRow style={{ marginBottom: 32 }}>
						{(formatId === FORMAT_OBJ.id || formatId === FORMAT_ARR.id)
							? <React.Fragment>
								<TableCell 
									align={formatId === FORMAT_ARR.id
										? 'left'
										: 'center'}
									padding="none"
									width={formatId === FORMAT_ARR.id
										? '4%'
										: '16%'}
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
						<TableCell 
							align="center"
							width="14%">
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
					{bodyKeys.map((id, index) => <Item 
						key={id}
						id={id}
						index={index}
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
