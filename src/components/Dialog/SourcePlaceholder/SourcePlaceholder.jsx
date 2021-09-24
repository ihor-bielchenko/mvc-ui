import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { StyledChip } from 'components/Input/LogicValue.jsx';
import AddIcon from '@material-ui/icons/Add';
import Header from 'components/Header';
import { 
	SOURCE_PLACEHOLDER,
	SOURCE_SCRIPT, 
} from 'structures/source.js';
import {
	COLUMN_NUMBER,
	COLUMN_TEXT,
} from 'structures/columnTypes.js';
import onDialog from '../onDialog.js';
import onClear from '../onClear.js';
import onClose from './onClose.js';
import onSave from './onSave.js';
import onChangeByLogic from './onChangeByLogic.js';

let SourcePlaceholder = () => {
	const dialog = useSelector((state) => state.dialogs[SOURCE_PLACEHOLDER.id]);
	const bodyId = (dialog || {}).name;
	const path = useSelector((state) => state.routes.form.path || []);
	const value = useSelector((state) => state.jsObject.tempValue.value);
	const _onSave = React.useCallback((placeholderId) => (e) => onSave(e, bodyId, placeholderId), [
		bodyId,
	]);
	const _onClear = React.useCallback((e) => onClear(e, bodyId), [
		bodyId,
	]);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_SCRIPT.id, {
		onClickEntity: (e, typeId, id) => onChangeByLogic(e, typeId, id, bodyId),
		formatValidating: () => ([
			COLUMN_NUMBER.id,
			COLUMN_TEXT.id,
		]),
	})(e), [
		bodyId,
	]);

	return <React.Fragment>
		<Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			open={!!dialog}
			onClose={onClose}>
			<DialogTitle>
				<Header onClose={onClose}>
					Выбрать плэйсхолдер
				</Header>
			</DialogTitle>
			<DialogContent 
				dividers
				style={{
					display: 'flex',
					alignItems: 'center',
					paddingTop: 48,
					paddingBottom: 48,
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
								height: 60,
							}}>
							<StyledChip 
								label={SOURCE_SCRIPT.text()}
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
									/{pathItem.type_id === 2
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
