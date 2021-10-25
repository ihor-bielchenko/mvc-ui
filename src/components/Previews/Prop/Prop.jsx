import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import formatTypes from 'structures/formatTypes.js';
import onDelete from 'components/Dialog/Prop/onDelete.js';
import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_PROP } from 'consts/dialog.js';
import Entity from '../Entity';

let Prop = ({ 
	scriptRenderId,
	id,
	isSource,
	onClickEntity,
	formatValidating,
}) => {
	const nameSubstr = useSelector((state) => state
		.entities
		.data[id]
		.name
		.substr(0, 65));
	const dataTypeId = useSelector((state) => state
		.entities
		.data[id]
		.data_type_id);
	const _onDelete = React.useCallback((e) => onDelete(e, id), [
		id,
	]);

	return <Entity 
		scriptRenderId={scriptRenderId}
		id={id}
		isSource={isSource}
		onEdit={onDialog(DIALOG_PROP, {
			id,
		})}
		onDelete={_onDelete}
		onClickEntity={onClickEntity}
		formatValidating={formatValidating}
		StartIcon={BookmarkIcon}
		color="#FFF"
		backgroundColor="#00695c">
		<Typography
			variant="caption"
			component="div"
			style={{ lineHeight: '8px' }}>
			Параметр
		</Typography>
		<Typography
			variant="caption"
			component="div">
			({formatTypes[dataTypeId].text()})
		</Typography>
		<Typography 
			component="div"
			variant="body2">
			<b>
			{(nameSubstr.length >= 64 && nameSubstr[64] !== ' ')
				? <React.Fragment>
					{nameSubstr} ...
				</React.Fragment>
				: nameSubstr}
			</b>
		</Typography>
	</Entity>;
};

Prop = React.memo(Prop);
Prop.defaultProps = {
	scriptRenderId: 0,
	id: 0,
	isSource: false,
	formatValidating: () => ([]),
};

export default Prop;
