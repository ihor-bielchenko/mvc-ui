import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Header from 'components/Header';
import Script from 'components/Script';
import getScriptId from 'components/Script/getScriptId.js';
import { SOURCE_SCRIPT } from 'structures/source.js';
import onClose from '../onClose.js';

let SourceScript = () => {
	const dialog = useSelector((state) => state.dialogs[SOURCE_SCRIPT.id]);
	const displayFlag = !!dialog;
	const onClickEntity = (dialog || {}).onClickEntity;
	const formatValidating = (dialog || {}).formatValidating || (() => {});

	return displayFlag
		? <Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="lg"
			open={displayFlag}
			onClose={onClose(SOURCE_SCRIPT.id)}>
			<DialogTitle>
				<Header onClose={onClose(SOURCE_SCRIPT.id)}>
					Значение из программы
				</Header>
			</DialogTitle>
			<DialogContent 
				dividers
				style={{
					height: 800,
					padding: 0,
				}}>
				<Script 
					isSource
					scriptId={getScriptId()}
					onClickEntity={onClickEntity}
					formatValidating={formatValidating} />
			</DialogContent>
		</Dialog>
		: <React.Fragment />;
};

SourceScript = React.memo(SourceScript);
SourceScript.defaultProps = {
};

export default SourceScript;
