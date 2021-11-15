import React from 'react';
// import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import onValidate from 'components/Group/Func/onValidate.js';
import onDialog from 'components/Dialog/onDialog.js';
import dataTypes from 'structures/dataTypes.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import onValueScript from './onValueScript.js';

let MergeComponent = ({
	scriptId,
	workspaceId,
	id,
	dataTypeId,
}) => {
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(id),
		dataTypeValidating: onValidate(dataTypeId),
	})(e), [
		id,
		dataTypeId,
	]);

	return <React.Fragment>
		<Button 
			variant="outlined"
			color="primary"
			startIcon={<AddIcon />}
			onClick={_onMenu}>
			Вставить {dataTypes[dataTypeId].text()}
		</Button>
	</React.Fragment>;
};
MergeComponent = React.memo(MergeComponent);
MergeComponent.defaultProps = {
	scriptId: 0,
	workspaceId: 0,
	id: 0,
	dataTypeId: 1,
};

export default MergeComponent;
