import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
import { getLang } from 'components/Language';
import formatTypes from 'structures/formatTypes.js';
import Entity from '../Entity';
import onEdit from './onEdit.js';

let Func = ({ 
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
	const funcTemplateId = useSelector((state) => state
		.entities
		.data[id]
		.func
		.func_template_id);
	const formatId = useSelector((state) => state
		.entities
		.data[id]
		.format_id);
	const _onEdit = React.useCallback((e) => onEdit(e, id), [
		id,
	]);

	return <Entity 
		scriptRenderId={scriptRenderId}
		id={id}
		isSource={isSource}
		onClickEntity={onClickEntity}
		onEdit={_onEdit}
		formatValidating={formatValidating}
		StartIcon={CodeIcon}
		color="#FFF"
		backgroundColor="#FF5252">
		<Typography
			variant="caption"
			component="div"
			style={{ lineHeight: '8px' }}>
			{getLang(`LogicFunc${funcTemplateId}Name`)}
		</Typography>
		<Typography
			variant="caption"
			component="div">
			({formatTypes[formatId].text()})
		</Typography>
		<Typography 
			variant="body2"
			component="div">
			{(nameSubstr.length >= 64 && nameSubstr[64] !== ' ')
				? <React.Fragment>
					{nameSubstr} <b>...</b>
				</React.Fragment>
				: nameSubstr}
		</Typography>
	</Entity>;
};

Func = React.memo(Func);
Func.defaultFuncs = {
	scriptRenderId: 0,
	id: 0,
	isSource: false,
	formatValidating: () => ([]),
};

export default Func;
