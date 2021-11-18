import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InputText from 'components/Input/Text';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import {
	DATA_TYPE_TEXT,
	DATA_TYPE_BOOLEAN,
} from 'structures/dataTypes.js';
import onDialog from 'components/Dialog/onDialog.js';
import onValidateInput from 'components/Dialog/SourceProxy/onValidate.js';
import onValidateSource from 'components/Dialog/Func/Props/onValidate.js';
import onDelete from './onDelete.js';
import onChangeKey from './onKey.js';
import onChangeValue from './onValue.js';
import onValueScript from './onValueScript.js';
import onClear from './onClear.js';

let KeyValue = ({ id }) => {
	const key = useSelector((state) => (state.jsObject.tempValue.header[id] || {}).key || '');
	const value = useSelector((state) => (state.jsObject.tempValue.header[id] || {}).value || '');
	const _onClearKey = React.useCallback((e) => onClear(e, id, 'key'), [
		id,
	]);
	const _onClearValue = React.useCallback((e) => onClear(e, id, 'value'), [
		id,
	]);
	const _onChangeKey = React.useCallback((e) => onChangeKey(e, id), [
		id,
	]);
	const _onChangeValue = React.useCallback((e) => onChangeValue(e, id), [
		id,
	]);
	const _onDelete = React.useCallback((e) => onDelete(e, id), [
		id,
	]);
	const _onMenuKey = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(id, 'key'),
		dataTypeValidating: onValidateSource(DATA_TYPE_TEXT.id),
	})(e), [
		id,
	]);
	const _onMenuValue = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(id, 'value'),
		dataTypeValidating: onValidateSource([
			DATA_TYPE_TEXT.id,
			DATA_TYPE_BOOLEAN.id,
		]),
	})(e), [
		id,
	]);

	return <Grid
		key={id}
		container 
		alignItems="center"
		spacing={1}>
		<Grid
			item
			xs={true}>
			<InputText
				required
				menu
				onMenu={_onMenuKey}
				onChangeValue={_onMenuKey}
				onDelete={_onClearKey}
				name={'key-'+ id}
				label="Заголовок"
				defaultValue={key}
				onChange={_onChangeKey}
				onInput={onValidateInput} />
		</Grid>
		<Grid
			item
			xs={true}>
			<InputText
				required
				menu
				onMenu={_onMenuValue}
				onChangeValue={_onMenuValue}
				onDelete={_onClearValue}
				name={'value-'+ id}
				label="Значение"
				defaultValue={value}
				onChange={_onChangeValue}
				onInput={onValidateInput} />
		</Grid>
		<Grid
			item
			xs={1}>
			<IconButton 
				color="secondary"
				onClick={_onDelete}>
				<DeleteIcon />
			</IconButton>
		</Grid>
	</Grid>;
};

KeyValue = React.memo(KeyValue);
KeyValue.defaultProps = {
	id: 0,
};

export default KeyValue;
