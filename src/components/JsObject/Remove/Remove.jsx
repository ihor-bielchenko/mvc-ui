import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import onDialog from 'components/Dialog/onDialog.js';
import { 
	DATA_TYPE_ATOMIC,
	DATA_TYPE_ARRAY,
	DATA_TYPE_OBJECT, 
} from 'structures/dataTypes.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import onRemoveLocal from './onRemove.js';

let Remove = ({ 
	id,
	parentId,
	parentDataTypeId,
	disabledRemove,
	ValueComponent,
	TypeComponent,
	onRemove,
}) => {
	const _parentDataTypeId = useSelector((state) => parentDataTypeId ?? (state.jsObject.data[parentId] || {}).data_type_id);
	const _disabledRemove = useSelector((state) => disabledRemove ?? (state.jsObject.data[id] || {}).disabledRemove);
	const _onRemove = React.useCallback((e) => typeof onRemove === 'function'
		? onRemove(e, id)
		: onRemoveLocal(e, id), [
		id,
		onRemove,
	]);

	return _parentDataTypeId !== DATA_TYPE_ATOMIC.id 
		|| _parentDataTypeId === DATA_TYPE_OBJECT.id
		|| _parentDataTypeId === DATA_TYPE_ARRAY.id
		? <React.Fragment>
			{_disabledRemove
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
							onDelete: _onRemove,
						})}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</Box>}
		</React.Fragment>
		: <React.Fragment />;
};

Remove = React.memo(Remove);
Remove.defaultProps = {
	id: 0,
	parentId: 0,
};

export default Remove;
