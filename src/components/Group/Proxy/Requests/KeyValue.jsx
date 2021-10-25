import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InputText from 'components/Input/Text';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import {
	DATA_TYPE_NUMBER,
	DATA_TYPE_TEXT,
	DATA_TYPE_BOOLEAN,
} from 'structures/dataTypes.js';
import onDialog from 'components/Dialog/onDialog.js';
import onValidate from 'components/Dialog/SourceProxy/onValidate.js';
import onDelete from './onDelete.js';
import onKey from './onKey.js';
import onValue from './onValue.js';
import onChangeByLogic from './onChangeByLogic.js';
import onClear from './onClear.js';

let KeyValue = ({ name }) => {
	const key = useSelector((state) => (state.jsObject.tempValue.request[name] || {}).key || '');
	const value = useSelector((state) => (state.jsObject.tempValue.request[name] || {}).value || '');
	const _onClearKey = React.useCallback((e) => onClear(e, name, 'key'), [
		name,
	]);
	const _onClearValue = React.useCallback((e) => onClear(e, name, 'value'), [
		name,
	]);
	const _onKey = React.useCallback((e) => onKey(e, name), [
		name,
	]);
	const _onValue = React.useCallback((e) => onValue(e, name), [
		name,
	]);
	const _onDelete = React.useCallback((e) => onDelete(e, name), [
		name,
	]);
	const _onMenuKey = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickEntity: (e, dataTypeId, id) => onChangeByLogic(e, dataTypeId, id, name, 'key'),
		formatValidating: () => ([
			DATA_TYPE_NUMBER.id,
			DATA_TYPE_TEXT.id,
			DATA_TYPE_BOOLEAN.id,
		]),
	})(e), [
		name,
	]);
	const _onMenuValue = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickEntity: (e, dataTypeId, id) => onChangeByLogic(e, dataTypeId, id, name, 'value'),
		formatValidating: () => ([
			DATA_TYPE_NUMBER.id,
			DATA_TYPE_TEXT.id,
			DATA_TYPE_BOOLEAN.id,
		]),
	})(e), [
		name,
	]);

	return <Grid
		key={name}
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
				onValue={_onMenuKey}
				onDelete={_onClearKey}
				name={'key-'+ name}
				label="Ключ"
				defaultValue={key}
				onChange={_onKey}
				onInput={onValidate} />
		</Grid>
		<Grid
			item
			xs={true}>
			<InputText
				required
				menu
				onMenu={_onMenuValue}
				onValue={_onMenuValue}
				onDelete={_onClearValue}
				name={'value-'+ name}
				label="Значение"
				defaultValue={value}
				onChange={_onValue}
				onInput={onValidate} />
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
	name: 0,
};

export default KeyValue;
