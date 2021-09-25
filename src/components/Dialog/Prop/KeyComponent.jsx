import React from 'react';
import Typography from '@material-ui/core/Typography';
import JsBoxControlWrapper from 'components/JsObject/BoxControlWrapper';
import InputText from 'components/Input/Text';
import { COLUMN_ARR } from 'structures/columnTypes.js';

let KeyComponent = ({
	parentId,
	parentTypeId,
	id,
	typeId,
	value,
	disabledWrapper,
	disabled,
	onChange,
}) => (parentTypeId === COLUMN_ARR.id
	|| (disabled || disabledWrapper))
		? <Typography 
			variant="h5"
			color="primary"
			style={{
				height: 56,
				lineHeight: '56px'
			}}>
			{(value || '').toString()}
		</Typography>
		: <JsBoxControlWrapper 
			mt="0px"
			data-border_right_radius_0={true}
			data-border_right_hide={true}>
			<InputText
				menu
				onMenu={() => {}}
				disabled={disabledWrapper}
				name={'key-'+ id}
				id={'key-'+ id}
				value={(value || '').toString()}
				onChange={onChange}
				label="" />
		</JsBoxControlWrapper>;

KeyComponent = React.memo(KeyComponent);
KeyComponent.defaultProps = {
	parentId: 0,
	parentTypeId: 0,
	id: 0,
	typeId: 0,
	value: '',
	disabledWrapper: false,
	onChange: () => {},
};

export default KeyComponent;
