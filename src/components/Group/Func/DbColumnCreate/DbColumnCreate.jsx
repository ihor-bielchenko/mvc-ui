import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SelectType from 'components/Select/Type';
import InputText from 'components/Input/Text';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_SCRIPT } from 'structures/source.js';
import {
	COLUMN_NUMBER,
	COLUMN_TEXT,
	COLUMN_NULL,
} from 'structures/columnTypes.js';
import onSelect from '../onSelect.js';
import onClear from '../onClear.js';
import onChangeByLogic from '../onChangeByLogic.js';
import onChange from '../onChange.js';
import onCheckbox from '../onCheckbox.js';

const _onChangeByLogic2 = (e, scriptId, typeId, id) => onChangeByLogic(e, scriptId, typeId, id, '2');
const _onChangeByLogic3 = (e, scriptId, typeId, id) => onChangeByLogic(e, scriptId, typeId, id, '3');
let DbColumnCreate = ({ scriptId }) => {
	const prop1 = useSelector((state) => state.func[scriptId].props['1'] ?? '');
	const prop2 = useSelector((state) => state.func[scriptId].props['2']);
	const prop3 = useSelector((state) => state.func[scriptId].props['3']);
	const _onSelect1 = React.useCallback((e) => onSelect(e, scriptId, '1'), [
		scriptId,
	]);
	const _onClear2 = React.useCallback((e) => onClear(e, scriptId, '2'), [
		scriptId,
	]);
	const _onMenu2 = React.useCallback((e) => onDialog(SOURCE_SCRIPT.id, {
		scriptId,
		onClickEntity: _onChangeByLogic2,
			formatValidating: () => ([
				COLUMN_NUMBER.id,
				COLUMN_TEXT.id,
			]),
	})(e), [
		scriptId,
	]);
	const _onChange2 = React.useCallback((e) => onChange(e, scriptId, '2'), [
		scriptId,
	]);
	const _onClear3 = React.useCallback((e) => onClear(e, scriptId, '3'), [
		scriptId,
	]);
	const _onMenu3 = React.useCallback((e) => onDialog(SOURCE_SCRIPT.id, {
		scriptId,
		onClickEntity: _onChangeByLogic3,
			formatValidating: () => ([
				COLUMN_NUMBER.id,
				COLUMN_TEXT.id,
				COLUMN_NULL.id,
			]),
	})(e), [
		scriptId,
	]);
	const _onChange3 = React.useCallback((e) => onChange(e, scriptId, '3'), [
		scriptId,
	]);
	const _onCheckbox = React.useCallback((e, flag) => onCheckbox(e, flag, scriptId, '4'), [
		scriptId,
	]);

	return <React.Fragment>
		<Box py={1}>
			<SelectType 
				name="prop-1"
				value={prop1}
				onSelect={_onSelect1} />
		</Box>
		<Box py={1}>
			<InputText
				required
				menu
				onMenu={_onMenu2}
				onValue={_onMenu2}
				onDelete={_onClear2}
				onChange={_onChange2}
				defaultValue={prop2}
				name="prop-2"
				label="Название поля"
				error={prop2 === true}
				{ ...prop2 === true
					? {
						helperText: 'Поле с таким названием уже существует',
					}
					: {} } />
		</Box>
		<Box py={1}>
			<InputText
				menu
				onMenu={_onMenu3}
				onValue={_onMenu3}
				onDelete={_onClear3}
				onChange={_onChange3}
				defaultValue={prop3}
				multiline
				rows={3}
				label="Описание"
				name="prop-3" />
		</Box>
		<Box py={1}>
			<FormControlLabel
				name="prop-4"
				label="Сделать поле обязательным"
				control={<Checkbox />}
				onChange={_onCheckbox} />
		</Box>
	</React.Fragment>;
};

DbColumnCreate = React.memo(DbColumnCreate);
DbColumnCreate.defaultProps = {
	scriptId: 0,
};

export default DbColumnCreate;