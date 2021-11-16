import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import LogicValue from 'components/Input/LogicValue.jsx';
import AddIcon from '@material-ui/icons/Add';
import Title from 'components/Title';
import onValidate from 'components/Group/Func/onValidate.js';
import { 
	SOURCE_TYPE_PLACEHOLDER,
	SOURCE_TYPE_SCRIPT, 
} from 'structures/sourceTypes.js';
import { DATA_TYPE_TEXT } from 'structures/dataTypes.js';
import onDialog from '../onDialog.js';
import onClear from './onClear.js';
import onClose from './onClose.js';
import onSave from './onSave.js';
import onValueScript from './onValueScript.js';

let SourcePlaceholder = () => {
	const dialog = useSelector((state) => state.dialogs[SOURCE_TYPE_PLACEHOLDER.id]);
	const id = (dialog || {}).id;
	const workspaceId = (dialog || {}).workspaceId ?? 0;
	const path = useSelector((state) => state.routes.form.path || []);
	const value = useSelector((state) => state.jsObject.tempValue.value);
	const _onClear = React.useCallback((e) => onClear(e, workspaceId, id), [
		workspaceId,
		id,
	]);
	const _onSave = React.useCallback((placeholderId) => (e) => onSave(e, id, placeholderId), [
		id,
	]);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(id),
		dataTypeValidating: onValidate(DATA_TYPE_TEXT.id),
	})(e), [
		id,
	]);

	return <React.Fragment>
		<Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			open={!!dialog}
			onClose={onClose}>
			<DialogTitle>
				<Title onClose={onClose}>
					Выбрать плэйсхолдер
				</Title>
			</DialogTitle>
			<DialogContent 
				dividers
				style={{
					display: 'flex',
					alignItems: 'center',
					paddingTop: 32,
					paddingBottom: 38,
				}}>
				{typeof value === 'object'
					? <Box 
						position="relative"
						display="flex"
						alignItems="center">
						<Typography>
							Параметр из программы:
						</Typography>
						<div 
							style={{ 
								position: 'relative', 
								height: 56,
							}}>
							<LogicValue 
								sourceTypeId={value.source_type_id}
								entityId={value.id}
								onDelete={_onClear}
								onClick={_onMenu} />
						</div>
					</Box>
					: <React.Fragment>
						<Button 
							size="small"
							color="primary"
							variant="outlined"
							startIcon={<AddIcon fontSize="small" />}
							onClick={_onMenu}
							style={{
								minWidth: 130,
							}}>
							Из логики
						</Button>
						<Typography 
							component="span"
							color="secondary"
							style={{
								paddingLeft: 18,
								paddingRight: 18,
							}}>
							или
						</Typography>
						<Box
							style={{
								whiteSpace: 'nowrap',
							}}>
							{path.map((pathItem, i) => (
								<React.Fragment key={pathItem.id}>
									/{pathItem.path_type_id === 2
										? <Chip 
											label={pathItem.value}
											onClick={_onSave(pathItem.id)}
											color={pathItem.id === value
												? 'primary'
												: 'default'} />
										: <Typography 
											component="span"
											variant="body2">
											{pathItem.value}
										</Typography>}
								</React.Fragment>
							))}
						</Box>
					</React.Fragment>}
			</DialogContent>
		</Dialog>
	</React.Fragment>;
};

SourcePlaceholder = React.memo(SourcePlaceholder);

export default SourcePlaceholder;
