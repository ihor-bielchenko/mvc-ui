import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SelectDataType from 'components/Select/DataType';
import LogicValue from 'components/Input/LogicValue.jsx';
import onDialog from 'components/Dialog/onDialog.js';
import dataTypes, {
	DATA_TYPE_ATOMIC,
	DATA_TYPE_ID,
	DATA_TYPE_TEXT,
	DATA_TYPE_NUMBER,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { FUNC_TEMPLATE_IF_TYPE } from 'structures/funcIf.js';
import {
	FUNC_TEMPLATE_MATH_MIN,
	FUNC_TEMPLATE_MATH_MAX,
} from 'structures/funcMaths.js';
import {
	FUNC_CATEGORY_TEXT,
	FUNC_CATEGORY_MATH,
	FUNC_CATEGORY_ARRAY,
	FUNC_CATEGORY_OBJECT,
} from 'structures/funcCategories.js';
import onMount from './onMount.js';
import onSelect from './onSelect.js';
import onClear from '../onClear.js';
import onValueScript from '../onValueScript.js';
import onValidate from '../onValidate.js';
import onUnmount from '../onUnmount.js';
import { getLang } from 'components/Language';

const _filtterCategoryFunc = (key, categoryId, templateId, defaultValueFlag = false) => {
	if (templateId === FUNC_TEMPLATE_MATH_MIN.id
		|| templateId === FUNC_TEMPLATE_MATH_MAX.id) {
		return defaultValueFlag
			? DATA_TYPE_ARRAY.id
			: dataTypes[key].id === DATA_TYPE_ARRAY.id;
	}
	else if (templateId === FUNC_TEMPLATE_IF_TYPE.id) {
		if (categoryId === FUNC_CATEGORY_TEXT.id) {
			return defaultValueFlag
				? DATA_TYPE_TEXT.id
				: dataTypes[key].id === DATA_TYPE_TEXT.id;
		}
		else if (categoryId === FUNC_CATEGORY_MATH.id) {
			return defaultValueFlag
				? DATA_TYPE_NUMBER.id
				: dataTypes[key].id === DATA_TYPE_NUMBER.id;
		}
		else if (categoryId === FUNC_CATEGORY_ARRAY.id) {
			return defaultValueFlag
				? DATA_TYPE_ARRAY.id
				: dataTypes[key].id === DATA_TYPE_ARRAY.id;
		}
		else if (categoryId === FUNC_CATEGORY_OBJECT.id) {
			return defaultValueFlag
				? DATA_TYPE_OBJECT.id
				: dataTypes[key].id === DATA_TYPE_OBJECT.id;
		}
	}
	return defaultValueFlag
		? false
		: true;
};

let IfType = ({ 
	scriptId,
	workspaceId,
	funcId,
	categoryId,
	templateId,
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop1 = useSelector((state) => _filtterCategoryFunc('', categoryId, templateId, true)
		|| (((state.jsObject.blocks[0] || [])[0] || {}).value ?? ''));
	const prop2 = useSelector((state) => ((state.jsObject.blocks[0] || [])[1] || {}).value ?? '');
	const prop2Name = useSelector((state) => (((state.script[(prop2 || {}).workspaceId] || {}).data || {})[(prop2 || {}).id] || {}).name ?? '');
	const _onSelect1 = React.useCallback((e) => onSelect(e, 0), [
	]);
	const _onClear2 = React.useCallback((e) => onClear(e, 1), [
	]);
	const _onMenu2 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(1),
		dataTypeValidating: onValidate(Number(prop1)),
	})(e), [
		prop1,
	]);

	React.useEffect(() => {
		!renderFlag && onMount();
	}, [
		renderFlag,
	]);

	React.useEffect(() => () => {
		onUnmount();
	}, []);
	
	return <React.Fragment>
		<Box mt={2} />
		<Grid 
			container
			spacing={3}
			alignItems="center">
			<Grid 
				item
				xs={4}>
				<SelectDataType 
					name="prop-1"
					value={prop1}
					onSelect={_onSelect1}
					onFilter={(key) => dataTypes[key].id !== DATA_TYPE_ATOMIC.id
						&& dataTypes[key].id !== DATA_TYPE_ID.id
						&& _filtterCategoryFunc(key, categoryId, templateId)} />
			</Grid>
			<Grid 
				item
				xs={true}
				style={{
					position: 'relative',
					height: '60px',
				}}>
				{prop2
					? <LogicValue 
						chipText={SOURCE_TYPE_SCRIPT.text(prop2Name)}
						onDelete={_onClear2}
						onClick={_onMenu2} />
					: <Button
						disabled={!prop1}
						variant="outlined"
						color="primary"
						startIcon={<AddIcon fontSize="small" />}
						onClick={_onMenu2}>
						{getLang('SelectPar')}
					</Button>}
			</Grid>
		</Grid>
	</React.Fragment>;
};

IfType = React.memo(IfType);
IfType.defaultProps = {
	scriptId: 0,
	workspaceId: 0,
	funcId: 0,
	templateId: 0,
};

export default IfType;
