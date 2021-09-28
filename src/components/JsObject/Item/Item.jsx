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
import ComplexSource from '../ComplexSource';
import onSelectTypeId from './onSelectTypeId.js';
import onChangeItem from './onChangeItem.js';
import onDeleteItem from './onDeleteItem.js';

let Item = ({
	id,
	parentId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
}) => {
	const parentTypeId = useSelector((state) => (state.jsObject.data[parentId] || {}).type_id);
	const typeId = useSelector((state) => (state.jsObject.data[id] || {}).type_id);
	const key = useSelector((state) => (state.jsObject.data[id] || {}).key);
	const value = useSelector((state) => (state.jsObject.data[id] || {}).value);
	const isCollection = useSelector((state) => ((state.jsObject.data[id].source || {}).value || {}).is_collection);
	const disabledControl = useSelector((state) => (state.jsObject.data[id] || {}).disabledControl);
	const lengthIsUndefined = useSelector((state) => !!state.jsObject.data[id].lengthIsUndefined);
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

	return <React.Fragment>
		{isCollection
			? <ComplexSource id={id} />
			: <React.Fragment />}
		{lengthIsUndefined
			? <Typography 
				variant="h3"
				color="textSecondary"
				style={{
					lineHeight: '14px',
				}}>
				...
				<Typography 
					component="span"
					variant="caption"
					color="textSecondary"
					style={{
						paddingLeft: 8,
					}}>
					Длина неизвестна
				</Typography>
			</Typography>
			: <React.Fragment />}
		<Box
			position="relative"
			display="flex"
			alignItems="flex-start"
			width="100%"
			pb={1}>
			{parentTypeId !== FORMAT_ATOMIC.id 
				|| parentTypeId === COLUMN_OBJ.id
				|| parentTypeId === COLUMN_ARR.id
				? <React.Fragment>
					{disabledControl
						? <React.Fragment />
						: <Box
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
							</Box>}
					<Box
						position="relative"
						textAlign="center"
						pr={parentTypeId === COLUMN_ARR.id
							? '6px'
							: '0px'}
						pl={disabledControl
							? '30px'
							: '0px'}
						minWidth={102}
						maxWidth={102}
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
									onChange={_onChangeItemKey} />
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
						onSelect={_onSelectTypeId} />
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
					value={(() => {
						switch (typeId) {
							case COLUMN_OBJ.id:
							case COLUMN_ARR.id:
								return <Wrapper
									id={id}
									typeId={typeId}
									last={last}
									KeyComponent={KeyComponent}
									ValueComponent={ValueComponent}
									TypeComponent={TypeComponent} />;
							default:
								return value;
						}
					})()}
					onChange={_onChangeItemValue} />
				: <BoxControlWrapper 
					position="relative"
					width="100%"
					minWidth="max-content"
					maxWidth={(parentId === 0 && parentTypeId === FORMAT_ATOMIC.id)
						? 'inherit'
						: 'max-content'}
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
		</Box>
		{lengthIsUndefined
			? <Typography 
				variant="h3"
				color="textSecondary"
				style={{
					lineHeight: '0px',
					height: '18px',
					marginTop: '-18px',
					paddingBottom: 18,
				}}>
				...
			</Typography>
			: <React.Fragment />}
	</React.Fragment>;
};

Item = React.memo(Item);
Item.defaultProps = {
	id: 0,
	parentId: 0,
	last: false,
};

export default Item;
