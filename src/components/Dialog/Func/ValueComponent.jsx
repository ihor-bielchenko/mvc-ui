import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import JsBoxControlWrapper from 'components/JsObject/BoxControlWrapper';
import MenuSource from 'components/Menu/Source';
import onChangeLogic from 'components/JsObject/Value/onChangeLogic.js';
import onDeleteLogic from 'components/JsObject/Value/onDeleteLogic.js';
import onMenu from 'components/Menu/onMenu.js';
import loadColumnInputs from 'utils/loadColumnInputs.js';
import { 
	DATA_TYPE_ATOMIC,
	DATA_TYPE_ID,
	DATA_TYPE_NUMBER,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
	DATA_TYPE_NULL,
} from 'structures/dataTypes.js';

const _onChangeLogic = (id) => (e) => onChangeLogic(e, id);
const _onDeleteLogic = (id) => (e) => onDeleteLogic(e, id);

let ValueComponent = ({
	parentId,
	parentDataTypeId,
	id,
	dataTypeId,
	value,
	onChange,
}) => {
	const Component = React.useMemo(() => React.lazy(loadColumnInputs(dataTypeId)), [
		dataTypeId,
	]);
	const disabledValue = useSelector((state) => state.jsObject.data[id].disabledValue);
	const _dataTypeId = dataTypeId === DATA_TYPE_ID.id
		? DATA_TYPE_NUMBER.id
		: dataTypeId;

	return <JsBoxControlWrapper 
		position="relative"
		width="100%"
		minWidth="max-content"
		maxWidth={(parentId === 0 && parentDataTypeId === DATA_TYPE_ATOMIC.id)
			? 'inherit'
			: 'max-content'}
		data-border_left_radius_0={!(parentDataTypeId !== DATA_TYPE_ATOMIC.id 
			|| parentDataTypeId === DATA_TYPE_OBJECT.id
			|| parentDataTypeId === DATA_TYPE_ARRAY.id)}
		data-border_left_hide={!(parentDataTypeId !== DATA_TYPE_ATOMIC.id 
			|| parentDataTypeId === DATA_TYPE_OBJECT.id
			|| parentDataTypeId === DATA_TYPE_ARRAY.id)}>
			{(() => {
				switch (_dataTypeId) {
					case DATA_TYPE_OBJECT.id:
					case DATA_TYPE_ARRAY.id:
						return value;
					case DATA_TYPE_NULL.id:
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
							<MenuSource aria={id.toString()} />
						</React.Fragment>;
					}
			})()}
		</JsBoxControlWrapper>;
};
ValueComponent = React.memo(ValueComponent);
ValueComponent.defaultProps = {
	parentId: 0,
	parentDataTypeId: 0,
	id: 0,
	dataTypeId: 0,
	value: '',
	onChange: () => {},
};

export default ValueComponent;
