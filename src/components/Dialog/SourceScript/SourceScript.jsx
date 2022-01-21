import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getLang } from 'components/Language';
import Title from 'components/Title';
import Script from 'components/Script';
import getScriptId from 'components/Script/getScriptId.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import onClose from '../onClose.js';

let SourceScript = () => {
	const dialog = useSelector((state) => state.dialogs[SOURCE_TYPE_SCRIPT.id]);
	const displayFlag = !!dialog;
	const onClickAsSource = (dialog || {}).onClickAsSource;
	const dataTypeValidating = (dialog || {}).dataTypeValidating || (() => {});

	return displayFlag
		? <Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="lg"
			open={displayFlag}
			onClose={onClose(SOURCE_TYPE_SCRIPT.id)}>
			<DialogTitle>
				<Title onClose={onClose(SOURCE_TYPE_SCRIPT.id)}>
					{getLang('cmpDialogSourceScriptVal')}
				</Title>
			</DialogTitle>
			<DialogContent 
				dividers
				style={{
					height: 800,
					padding: 0,
				}}>
				<Script 
					isSource
					id={getScriptId()}
					onClickAsSource={onClickAsSource}
					dataTypeValidating={dataTypeValidating} />
			</DialogContent>
		</Dialog>
		: <React.Fragment />;
};

SourceScript = React.memo(SourceScript);
SourceScript.defaultProps = {
};

export default SourceScript;
