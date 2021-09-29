import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import JsBoxControlWrapper from 'components/JsObject/BoxControlWrapper';
import MenuSource from 'components/Menu/Source';
import ComplexSource from 'components/JsObject/ComplexSource';
import onChangeLogic from 'components/JsObject/Item/onChangeLogic.js';
import onDeleteLogic from 'components/JsObject/Item/onDeleteLogic.js';
import onMenu from 'components/Menu/onMenu.js';
import loadColumnInputs from 'utils/loadColumnInputs.js';
// import { SOURCE_DB } from 'structures/source.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import { 
	COLUMN_ID,
	COLUMN_OBJ,
	COLUMN_ARR,
	COLUMN_NULL,
	COLUMN_NUMBER,
	COLUMN_BOOLEAN,
} from 'structures/columnTypes.js';

const _onChangeLogic = (id) => (e) => onChangeLogic(e, id);
const _onDeleteLogic = (id) => (e) => onDeleteLogic(e, id);

const StyledComplexSource = styled(ComplexSource)`
	height: 56px;
	line-height: 56px;

	& .MuiChip-root {
		position: relative !important;
	}
`;
const disabledComponent = (typeId, value) => {
	switch (typeId) {
		case COLUMN_OBJ.id:
		case COLUMN_ARR.id:
			return value;
		case COLUMN_NULL.id:
			return <Typography 
				variant="h5"
				color="textSecondary"
				style={{
					height: 56,
					lineHeight: '56px'
				}}>
				<i><b>NULL</b></i>
			</Typography>;
		case COLUMN_NUMBER.id:
			return <Typography 
				variant="h5"
				color="primary"
				style={{
					height: 56,
					lineHeight: '56px'
				}}>
				{value.toString()}
			</Typography>;
		case COLUMN_BOOLEAN.id:
			return <Typography 
				variant="h5"
				color={value
					? 'primary'
					: 'secondary'}
				style={{
					height: 56,
					lineHeight: '56px'
				}}>
				{value.toString().toUpperCase()}
			</Typography>;
		default:
			return value
				? <Typography 
					variant="h5"
					style={{
						height: 56,
						lineHeight: '56px'
					}}>
					{value.toString()}
				</Typography>
				: <Typography
					variant="caption"
					color="textSecondary"
					style={{
						height: 56,
						lineHeight: '56px'
					}}>
					<i>пустая строка</i>
				</Typography>;		
	}
};

let ValueComponent = ({
	parentId,
	parentTypeId,
	id,
	typeId,
	value,
	onChange,
}) => {
	const parentSourceId = useSelector((state) => (state.jsObject.data[parentId].source || {}).source_id
		|| ((state.jsObject.data[state.jsObject.data[parentId].parent_id] || {}).source || {}).source_id);
	const currentSourceId = useSelector((state) => (state.jsObject.data[id].source || {}).source_id);
	const Component = React.useMemo(() => React.lazy(loadColumnInputs(typeId)), [
		typeId,
	]);
	const disabledValue = useSelector((state) => state.jsObject.data[id].disabledValue);
	const _typeId = typeId === COLUMN_ID.id
		? COLUMN_NUMBER.id
		: typeId;

	return disabledValue
		? currentSourceId > 0
			? <React.Fragment>
				<StyledComplexSource id={id} />
				<Typography
					variant="caption"
					color="textSecondary"
					style={{
						paddingLeft: 12,
						paddingRight: 4,
						height: 56,
						lineHeight: '56px',
					}}>
					По умолучанию:
				</Typography>
				{disabledComponent(_typeId, value)}
			</React.Fragment>
			: <Box
				display="flex"
				alignItems="center"
				position="relative"
				width="100%"
				minWidth="max-content"
				maxWidth={(parentId === 0 && parentTypeId === FORMAT_ATOMIC.id)
					? 'inherit'
					: 'max-content'}>
				{parentSourceId > 0
					&& _typeId !== COLUMN_OBJ.id
					&& _typeId !== COLUMN_ARR.id
					&& _typeId !== COLUMN_NULL.id
					? <React.Fragment>
						<Chip label="Переменная" />
						<Typography
							variant="caption"
							color="textSecondary"
							style={{
								paddingLeft: 12,
								paddingRight: 4,
							}}>
							По умолучанию:
						</Typography>
					</React.Fragment>
					: <React.Fragment />}
				{disabledComponent(_typeId, value)}
			</Box>
			: <JsBoxControlWrapper 
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
						switch (_typeId) {
							case COLUMN_OBJ.id:
							case COLUMN_ARR.id:
								return value;
							case COLUMN_NULL.id:
								return <Typography 
									variant="h5"
									color="textSecondary"
									style={{
										height: 56,
										lineHeight: '56px'
									}}>
									<i><b>NULL</b></i>
								</Typography>;
							default:
								return <React.Fragment>
									<Box mt="0px">
										<React.Suspense fallback={<Typography>Подождите...</Typography>}>
											<Component
												menu
												onMenu={onMenu(id.toString())}
												onValue={_onChangeLogic(id)}
												onDelete={_onDeleteLogic(id)}
												disabled={disabledValue}
												name={id.toString()}
												id={id.toString()}
												defaultValue={value}
												onChange={onChange}
												label="" />
										</React.Suspense>
									</Box>
									<MenuSource
										aria={id.toString()}
										typeId={_typeId} />
								</React.Fragment>;
						}
					})()}
				</JsBoxControlWrapper>;
};
ValueComponent = React.memo(ValueComponent);
ValueComponent.defaultProps = {
	parentId: 0,
	parentTypeId: 0,
	id: 0,
	typeId: 0,
	value: '',
	onChange: () => {},
};

export default ValueComponent;
