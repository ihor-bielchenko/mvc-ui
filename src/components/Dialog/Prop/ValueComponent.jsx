import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import JsBoxControlWrapper from 'components/JsObject/BoxControlWrapper';
import MenuSource from 'components/Menu/Source';
// import ComplexSource from 'components/JsObject/ComplexSource';
import onChangeLogic from 'components/JsObject/Value/onChangeLogic.js';
import onDeleteLogic from 'components/JsObject/Value/onDeleteLogic.js';
import onMenu from 'components/Menu/onMenu.js';
import loadColumnInputs from 'utils/loadColumnInputs.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import { 
	COLUMN_ID,
	COLUMN_OBJ,
	COLUMN_ARR,
	COLUMN_NULL,
	COLUMN_NUMBER,
} from 'structures/columnTypes.js';

const _onChangeLogic = (id) => (e) => onChangeLogic(e, id);
const _onDeleteLogic = (id) => (e) => onDeleteLogic(e, id);

let ValueComponent = ({
	parentId,
	parentTypeId,
	id,
	typeId,
	value,
	onChange,
}) => {
	const Component = React.useMemo(() => React.lazy(loadColumnInputs(typeId)), [
		typeId,
	]);
	const disabledValue = useSelector((state) => state.jsObject.data[id].disabledValue);
	const _typeId = typeId === COLUMN_ID.id
		? COLUMN_NUMBER.id
		: typeId;

	return <JsBoxControlWrapper 
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
