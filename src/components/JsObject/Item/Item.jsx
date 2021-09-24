import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SelectType from 'components/Select/Type';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputText from 'components/Input/Text';
import onMenu from 'components/Menu/onMenu.js';
import onDialog from 'components/Dialog/onDialog.js';
import loadColumnInputs from 'utils/loadColumnInputs.js';
import source, {
	SOURCE_MANUALLY,
} from 'structures/source.js';
import columnTypes, {
	COLUMN_ID,
	COLUMN_OBJ,
 	COLUMN_ARR,
 	COLUMN_NULL,
} from 'structures/columnTypes.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js'; 
import JsObject from '../JsObject.jsx';
import onSelectTypeId from './onSelectTypeId.js';
import onChangeItem from './onChangeItem.js';
import onDeleteItem from './onDeleteItem.js';
import onChangeLogic from './onChangeLogic.js';
import onDeleteLogic from './onDeleteLogic.js';

const _onFilterTypes = (parentTypeId) => (key) => (
	typeof parentTypeId === 'undefined'
		? (columnTypes[key].id !== COLUMN_ID.id
			&& columnTypes[key].id !== COLUMN_OBJ.id
			&& columnTypes[key].id !== COLUMN_ARR.id)
	: columnTypes[key].id !== COLUMN_ID.id
);
const _onFilterSource = (typeId, parentTypeId) => (key) => (
	typeof parentTypeId === 'undefined'
		? source[key].id !== SOURCE_MANUALLY.id
		: (source[key].id !== SOURCE_MANUALLY.id 
			&& source[key].formatValidating().includes(typeId))
);

const BoxControlWrapper = styled(Box)`
	& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline,
	& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline,
	& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
		border-color: rgba(0, 0, 0, 0.23);
		border-width: 1px;
		${(props) => props['data-border_left_radius_0']
			? `
				border-top-left-radius: 0px;
				border-bottom-left-radius: 0px;
			`
			: ''}
		${(props) => props['data-border_right_radius_0']
			? `
				border-top-right-radius: 0px;
				border-bottom-right-radius: 0px;
			`
			: ''}
		${(props) => props['data-border_left_hide']
			? `
				border-left: none;
			`
			: ''}
		${(props) => props['data-border_right_hide']
			? `
				border-right: none;
			`
			: ''}
	}
`;

let Item = ({
	id,
	parentTypeId,
	data,
	editType,
	last,
	MenuKeyComponent,
	MenuValueComponent,
}) => {
	const { 
		type_id: initTypeId, 
		key: initKey,
		value: initValue, 
	} = data();
	const typeId = useSelector((state) => (state.jsObject.temp[id] || {}).type_id ?? initTypeId);
	const key = useSelector((state) => (state.jsObject.temp[id] || {}).key ?? initKey);
	const value = useSelector((state) => (state.jsObject.temp[id] || {}).value ?? initValue);
	const _onSelectTypeId = React.useCallback((e) => onSelectTypeId(e, id), [
		id,
	]);
	const _onChangeItemKey = React.useCallback((e) => onChangeItem(e, id, 'key', (typeId === COLUMN_OBJ.id 
		|| typeId === COLUMN_ARR.id)
		? {}
		: data()), [
		id,
		data,
		typeId,
	]);
	const _onChangeItemValue = React.useCallback((e) => onChangeItem(e, id, 'value', (typeId === COLUMN_OBJ.id 
		|| typeId === COLUMN_ARR.id)
		? {}
		: data()), [
		id,
		data,
		typeId,
	]);
	const _onChangeLogic = React.useCallback((e) => onChangeLogic(e, id), [
		id,
	]);
	const _onDeleteLogic = React.useCallback((e) => onDeleteLogic(e, id), [
		id,
	]);
	const _onDeleteItem = React.useCallback((e) => onDeleteItem(e, id), [
		id,
	]);
	const Component = React.useMemo(() => React.lazy(loadColumnInputs(typeId)), [
		typeId,
	]);
	// console.log('initTypeId, typeId', initTypeId, typeId);

	return <Box
		position="relative"
		display="flex"
		alignItems="flex-start"
		width="100%"
		py={2}
		pl={2}>
		{typeof parentTypeId !== 'undefined'
			? <React.Fragment>
				<Box
					position="relative"
					width="100%"
					minWidth="30px"
					maxWidth="30px"
					height="56px"
					lineHeight="56px"
					textAlign="left">
					<IconButton 
						color="secondary"
						size="small"
						onClick={onDialog(DIALOG_DELETE_CONFIRM, {
							onDelete: _onDeleteItem,
						})}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</Box>
				<Box
					position="relative"
					textAlign="right"
					pr={parentTypeId === COLUMN_ARR.id
						? '6px'
						: '0px'}
					minWidth={parentTypeId === COLUMN_ARR.id
						? 46
						: 138}
					maxWidth={parentTypeId === COLUMN_ARR.id
						? 46
						: 138}
					style={{
						whiteSpace: 'nowrap',
					}}>
					{parentTypeId === COLUMN_ARR.id
						? <Typography 
							variant="h5"
							color="primary"
							style={{
								height: 56,
								lineHeight: '56px'
							}}>
							{key.toString()}
						</Typography>
						: <BoxControlWrapper 
							mt="0px"
							data-border_right_radius_0={true}
							data-border_right_hide={true}>
							<InputText
								menu
								onMenu={() => {}}
								name={'key-'+ id}
								id={'key-'+ id}
								value={(key || '').toString()}
								onChange={_onChangeItemKey}
								label="" />
							{typeof MenuKeyComponent === 'object'
								? <MenuKeyComponent
									aria={id}
									typeId={typeId} />
								: <React.Fragment />}
						</BoxControlWrapper>}
				</Box>
			</React.Fragment>
			: <React.Fragment />}
		{editType
			? <Box
				position="relative"
				width="14%"
				minWidth="108px">
				<BoxControlWrapper
					data-border_left_radius_0={typeof parentTypeId !== 'undefined' && 
						parentTypeId === COLUMN_OBJ.id}
					data-border_right_radius_0={typeof parentTypeId === 'undefined'}
					mt="0px">
					<SelectType 
						name={'type_id-'+ id}
						value={typeId}
						onSelect={_onSelectTypeId}
						onFilter={_onFilterTypes(parentTypeId)}
						label="" />
				</BoxControlWrapper>
			</Box>
			: <React.Fragment />}
		{typeof parentTypeId !== 'undefined'
			? <Typography	
				variant="h4"
				style={{
					position: 'relative',
					overflow: 'hidden',
					minWidth: 8,
					height: 56,
					paddingLeft: 3,
					paddingRight: 9,
					lineHeight: '56px',
					textAlign: 'center'
				}}>
				:
			</Typography>
			: <React.Fragment />}
		<BoxControlWrapper 
			position="relative"
			width="100%"
			minWidth="280px"
			data-border_left_radius_0={typeof parentTypeId === 'undefined'}
			data-border_left_hide={typeof parentTypeId === 'undefined'}>
			{(() => {
				switch (typeId) {
					case COLUMN_OBJ.id:
					case COLUMN_ARR.id:
						return <JsObject
							parentId={id}
							typeId={typeId}
							last={last}
							data={() => value}
							MenuKeyComponent={MenuKeyComponent}
							MenuValueComponent={MenuValueComponent} />;
					case COLUMN_NULL.id:
						return <Typography 
							variant="h6"
							color="textSecondary"
							style={{
								paddingLeft: 8,
								height: 56,
								lineHeight: '56px',
							}}>
							<i><b>NULL</b></i>
						</Typography>;
					default:
						return <React.Fragment>
							<Box mt="0px">
								<React.Suspense fallback={<Typography>Подождите...</Typography>}>
									<Component
										menu
										onMenu={onMenu(id)}
										onValue={_onChangeLogic}
										onDelete={_onDeleteLogic}
										name={id}
										id={id}
										defaultValue={value}
										onChange={_onChangeItemValue}
										label="" />
								</React.Suspense>
								{typeof MenuValueComponent === 'object'
									? <MenuValueComponent
										aria={id}
										typeId={typeId}
										onFilter={_onFilterSource(typeId, parentTypeId)} />
									: <React.Fragment />}
							</Box>
					</React.Fragment>;
				}
			})()}
		</BoxControlWrapper>
		{last || (typeId === COLUMN_OBJ.id
			|| typeId === COLUMN_ARR.id)
			? <React.Fragment />
			: <Box 
				position="relative"
				textAlign="center"
				minWidth="8px"
				maxWidth="8px"
				pt="12px">
				<Typography variant="h5">
					,
				</Typography>
			</Box>}
	</Box>;
};

Item = React.memo(Item);
Item.defaultProps = {
	id: 0,
	data: () => ({}),
	editType: false,
	last: false,
};

export default Item;
