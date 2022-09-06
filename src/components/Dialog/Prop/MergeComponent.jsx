import React from 'react';
// import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MenuSource from 'components/Menu/Source';
import onMenu from 'components/Menu/onMenu.js';
import dataTypes, {
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';
import sourceTypes, {
	SOURCE_TYPE_DB,
	SOURCE_TYPE_PROXY_PASS,
} from 'structures/sourceTypes.js';
import { getLang } from 'components/Language';

const _onFilterMenuSource = (dataTypeId) => (key, i) => {
	return dataTypeId === DATA_TYPE_OBJECT.id
		? (sourceTypes[key].id === SOURCE_TYPE_DB.id
			|| sourceTypes[key].id === SOURCE_TYPE_PROXY_PASS.id)
		: (dataTypeId === DATA_TYPE_ARRAY.id)
			? (sourceTypes[key].id === SOURCE_TYPE_DB.id)
			: false;
};
let MergeComponent = ({
	scriptId,
	workspaceId,
	id,
	dataTypeId,
}) => {
	const _onMenu = React.useCallback((e) => onMenu(id.toString(), dataTypeId === DATA_TYPE_ARRAY.id
		? ({ isCollection: true })
		: ({ isCollection: false }))(e, id), [
		id,
		dataTypeId,
	]);

	return <React.Fragment>
		<Button 
			variant="outlined"
			color="primary"
			startIcon={<AddIcon />}
			onClick={_onMenu}>
			{getLang('DialogJsonContent3Text')} {dataTypes[dataTypeId].text()}
		</Button>
		<MenuSource
			aria={id.toString()}
			scriptId={scriptId}
			workspaceId={workspaceId}
			onFilter={_onFilterMenuSource(dataTypeId)} />
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
