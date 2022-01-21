import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { getLang } from 'components/Language';
import Title from 'components/Title';
import SelectService from 'components/Select/Service';
import SelectRoute from 'components/Select/Route';
import Url from './Url';
import Headers from './Headers';
import Requests from './Requests';
import onUnmount from 'components/Dialog/SourceCookie/onUnmount.js';
import { SOURCE_TYPE_PROXY_PASS } from 'structures/sourceTypes.js';
import onClose from '../onClose.js';
import onService from './onService.js';
import onRoute from './onRoute.js';
import onSave from './onSave';
import onEdit from './onEdit.js';
import onMount from './onMount.js';

let SourceProxy = () => {
	const dialog = useSelector((state) => state.dialogs[SOURCE_TYPE_PROXY_PASS.id]);
	const id = (dialog || {}).id;
	const workspaceId = (dialog || {}).workspaceId ?? 0;
	const index = (dialog || {}).index ?? 0;
	const isEditFlag = (dialog || {}).isEditFlag || false;
	const routeLength = useSelector((state) => (state.routes.data || []).length);
	const serviceId = useSelector((state) => state.jsObject.tempValue.service_id || '');
	const routeId = useSelector((state) => state.jsObject.tempValue.route_id || '');
	const [ tab, setTab ] = React.useState((state) => 0);
	const _onTab = React.useCallback((e, newValue) => setTab(newValue), [
		setTab,
	]);
	const _onClose = React.useCallback((e, reason) => {
		onClose(SOURCE_TYPE_PROXY_PASS.id)(e, reason);
		onUnmount();
		setTab(0);
	}, [
		setTab,
	]);
	const _onSave = React.useCallback((e) => isEditFlag
		? onEdit(e, id, _onClose)
		: onSave(e, id, _onClose), [
		isEditFlag,
		id,
		_onClose,
	]);
	const _dialogOpenFlag = !!dialog;

	React.useEffect(() => {
		(_dialogOpenFlag && serviceId > 0) && onMount(serviceId);
	}, [
		_dialogOpenFlag,
		serviceId,
	]);

	return !!dialog
		? <Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="md"
			open={!!dialog}
			onClose={_onClose}>
			<DialogTitle>
				<Title onClose={_onClose}>
					{getLang('cmpDialogSourceProxy')}
				</Title>
			</DialogTitle>
			<DialogContent dividers>
				<form onSubmit={_onSave}>
					<Box my={2}>
						<SelectService
							value={serviceId}
							onSelect={onService} />
					</Box>
					{serviceId > 0
						? <Box my={2}>
							<SelectRoute
								value={routeId}
								onSelect={onRoute} />
						</Box>
						: <React.Fragment />}
					{routeId > 0
						&& routeLength > 0
						? <React.Fragment>
							<Tabs 
								variant="fullWidth"
								indicatorColor="secondary"
								value={tab}
								onChange={_onTab}>
								<Tab 
									value={0}
									label="URL *" />
								<Tab
									value={1} 
									label={getLang('cmpDialogSourceProxyNames')} />
								<Tab 
									value={2}
									label={getLang('cmpDialogSourceProxyQuery')} />
							</Tabs>
							<div style={{ display: tab === 0 ? 'block' : 'none' }}>
								<Url 
									workspaceId={workspaceId}
									id={id}
									index={index} />
							</div>
							<div style={{ display: tab === 1 ? 'block' : 'none' }}>
								<Headers
									workspaceId={workspaceId}
									id={id}
									index={index} />
							</div>
							<div style={{ display: tab === 2 ? 'block' : 'none' }}>
								<Requests
									workspaceId={workspaceId}
									id={id}
									index={index} />
							</div>
						</React.Fragment>
						: <React.Fragment />}
					<DialogActions style={{ justifyContent: 'space-between' }}>
						<Button 
							variant="outlined"
							color="secondary"
							startIcon={<CloseIcon />}
							onClick={_onClose}>
							{getLang('cmpDialogSourceProxyCancel')}
						</Button>
						<Button 
							type="submit"
							variant="outlined"
							color="primary"
							startIcon={<SaveIcon />}>
							{getLang('cmpDialogSourceProxySave')}
						</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
		: <React.Fragment />;
};

SourceProxy = React.memo(SourceProxy);
SourceProxy.defaultProps = {
};

export default SourceProxy;
