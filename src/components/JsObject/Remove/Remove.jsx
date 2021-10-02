import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import onDialog from 'components/Dialog/onDialog.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import { 
	COLUMN_ARR,
	COLUMN_OBJ, 
} from 'structures/columnTypes.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import onRemoveLocal from './onRemove.js';

let Remove = ({ 
	id,
	parentId,
	parentTypeId,
	disabledControl,
	ValueComponent,
	TypeComponent,
	onRemove,
}) => {
	const _parentTypeId = useSelector((state) => parentTypeId ?? (state.jsObject.data[parentId] || {}).type_id);
	const _disabledControl = useSelector((state) => disabledControl ?? (state.jsObject.data[id] || {}).disabledControl);
	const _onRemove = React.useCallback((e) => typeof onRemove === 'function'
		? onRemove(e, id)
		: onRemoveLocal(e, id), [
		id,
		onRemove,
	]);

	return _parentTypeId !== FORMAT_ATOMIC.id 
		|| _parentTypeId === COLUMN_OBJ.id
		|| _parentTypeId === COLUMN_ARR.id
		? <React.Fragment>
			{_disabledControl
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
