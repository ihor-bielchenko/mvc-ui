import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import JsBoxControlWrapper from 'components/JsObject/BoxControlWrapper';
import MenuSource from 'components/Menu/Source';
import onChangeLogic from 'components/JsObject/Item/onChangeLogic.js';
import onDeleteLogic from 'components/JsObject/Item/onDeleteLogic.js';
import onMenu from 'components/Menu/onMenu.js';
import loadColumnInputs from 'utils/loadColumnInputs.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import { 
	COLUMN_OBJ,
	COLUMN_ARR,
	COLUMN_NULL,
} from 'structures/columnTypes.js';

const _onChangeLogic = (id) => (e) => onChangeLogic(e, id);
const _onDeleteLogic = (id) => (e) => onDeleteLogic(e, id);

let ValueComponent = ({
	parentId,
	parentTypeId,
	id,
	typeId,
	value,
	disabledWrapper,
	disabled,
	onChange,
}) => {
	const Component = React.useMemo(() => React.lazy(loadColumnInputs(typeId)), [
		typeId,
	]);

	return (disabled || disabledWrapper)
		? (typeof value === 'string' && !value)
			? "'"+ value +"'"
			: value
		: <JsBoxControlWrapper 
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
						case COLUMN_NULL.id:
							return value;
						default:
							return <React.Fragment>
								<Box mt="0px">
									<React.Suspense fallback={<Typography>Подождите...</Typography>}>
										<Component
											menu
											onMenu={onMenu(id.toString())}
											onValue={_onChangeLogic(id)}
											onDelete={_onDeleteLogic(id)}
											disabled={disabledWrapper}
											name={id.toString()}
											id={id.toString()}
											defaultValue={value}
											onChange={onChange}
											label="" />
									</React.Suspense>
								</Box>
								<MenuSource
									aria={id.toString()}
									typeId={typeId} />
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
	disabledWrapper: false,
	onChange: () => {},
};

export default ValueComponent;
