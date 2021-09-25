import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import onDialog from 'components/Dialog/onDialog.js';
import columnTypes, {
	COLUMN_NUMBER,
	COLUMN_BOOLEAN,
	COLUMN_OBJ,
	COLUMN_ARR,
	COLUMN_NULL,
} from 'structures/columnTypes.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js'; 
import Wrapper from '../Wrapper';
import BoxControlWrapper from '../BoxControlWrapper';
import onSelectTypeId from './onSelectTypeId.js';
import onChangeItem from './onChangeItem.js';
import onDeleteItem from './onDeleteItem.js';

let Item = ({
	id,
	parentId,
	last,
	disabledWrapper,
	KeyComponent,
	ValueComponent,
	TypeComponent,
}) => {
	const parentTypeId = useSelector((state) => (state.jsObject.data[parentId] || {}).type_id);
	const typeId = useSelector((state) => (state.jsObject.data[id] || {}).type_id);
	const key = useSelector((state) => (state.jsObject.data[id] || {}).key);
	const value = useSelector((state) => (state.jsObject.data[id] || {}).value);
	const disabled = useSelector((state) => (state.jsObject.data[id] || {}).disabled);
	const _onChangeItemKey = React.useCallback((e) => onChangeItem(e, id, 'key'), [
		id,
	]);
	const _onChangeItemValue = React.useCallback((e) => onChangeItem(e, id, 'value'), [
		id,
	]);
	const _onDeleteItem = React.useCallback((e) => onDeleteItem(e, id), [
		id,
	]);
	const _onSelectTypeId = React.useCallback((e) => onSelectTypeId(e, id), [
		id,
	]);

	// console.log('id, key', id, key);

	return <Box
		position="relative"
		display="flex"
		alignItems="flex-start"
		width="100%"
		py={2}
		pl={2}>
		{parentTypeId !== FORMAT_ATOMIC.id 
			|| parentTypeId === COLUMN_OBJ.id
			|| parentTypeId === COLUMN_ARR.id
			? <React.Fragment>
				{typeof disabled === 'boolean'
					? !disabled
					: !disabledWrapper
						? <Box
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
						: <React.Fragment />}
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
					{typeof KeyComponent === 'object'
						&& typeof KeyComponent['$$typeof'] === 'symbol'
						? <React.Fragment>
							<KeyComponent
								parentId={parentId}
								parentTypeId={parentTypeId}
								id={id}
								typeId={typeId}
								value={key}
								onChange={_onChangeItemKey}
								disabledWrapper={disabledWrapper} 
								disabled={disabled} />
						</React.Fragment>
						: <Typography color="primary">
							{(key || '').toString()}
						</Typography>}
				</Box>
			</React.Fragment>
			: <React.Fragment />}
		<Box
			position="relative"
			width="14%"
			minWidth="108px">
			{typeof TypeComponent === 'object'
				&& typeof TypeComponent['$$typeof'] === 'symbol'
				? <TypeComponent
					parentId={parentId}
					parentTypeId={parentTypeId}
					id={id}
					typeId={typeId}
					onSelect={_onSelectTypeId}
					disabledWrapper={disabledWrapper}
					disabled={disabled} />
				: <Typography>
					{columnTypes[typeId].text()}
				</Typography>}
		</Box>
		{parentTypeId !== FORMAT_ATOMIC.id 
			|| parentTypeId === COLUMN_OBJ.id
			|| parentTypeId === COLUMN_ARR.id
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
		{typeof ValueComponent === 'object'
			&& typeof ValueComponent['$$typeof'] === 'symbol'
			? <ValueComponent
				parentId={parentId}
				parentTypeId={parentTypeId}
				id={id}
				typeId={typeId}
				disabledWrapper={disabledWrapper}
				disabled={disabled}
				value={(() => {
					switch (typeId) {
						case COLUMN_OBJ.id:
						case COLUMN_ARR.id:
							return <Wrapper
								id={id}
								typeId={typeId}
								last={last}
								disabledWrapper={disabledWrapper}
								KeyComponent={KeyComponent}
								ValueComponent={ValueComponent}
								TypeComponent={TypeComponent} />;
						case COLUMN_NULL.id:
							return <Typography color="textSecondary">
								<i><b>NULL</b></i>
							</Typography>;
						default:
							return value;
					}
				})()}
				onChange={_onChangeItemValue} />
			: <BoxControlWrapper 
				position="relative"
				width="100%"
				minWidth="280px"
				maxWidth={(parentId === 0 && parentTypeId === FORMAT_ATOMIC.id)
					? 'inherit'
					: '280px'}
				data-border_left_radius_0={!(parentTypeId !== FORMAT_ATOMIC.id 
					|| parentTypeId === COLUMN_OBJ.id
					|| parentTypeId === COLUMN_ARR.id)}
				data-border_left_hide={!(parentTypeId !== FORMAT_ATOMIC.id 
					|| parentTypeId === COLUMN_OBJ.id
					|| parentTypeId === COLUMN_ARR.id)}>
				{(() => {
					switch (typeId) {
						case COLUMN_OBJ.id:
						case COLUMN_ARR.id:
							return <Wrapper
								id={id}
								typeId={typeId}
								last={last}
								disabledWrapper={disabledWrapper}
								KeyComponent={KeyComponent}
								ValueComponent={ValueComponent}
								TypeComponent={TypeComponent} />;
						case COLUMN_NULL.id:
							return <Typography color="textSecondary">
								<i><b>NULL</b></i>
							</Typography>;
						case COLUMN_NUMBER.id:
							return <Typography color="primary">
								{value.toString()}
							</Typography>;
						case COLUMN_BOOLEAN.id:
							return <Typography 
								color={value
									? 'primary'
									: 'secondary'}>
								{value.toString().toUpperCase()}
							</Typography>;
						default:
							return <Typography>
								{value.toString()}
							</Typography>;
					}
				})()}
			</BoxControlWrapper>}
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
	parentId: 0,
	last: false,
	disabledWrapper: false,
};

export default Item;
