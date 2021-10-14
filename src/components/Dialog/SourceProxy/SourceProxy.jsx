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
import Header from 'components/Header';
import SelectService from 'components/Select/Service';
import SelectRoute from 'components/Select/Route';
import Url from 'components/Group/Proxy/Url';
import Headers from 'components/Group/Proxy/Headers';
import Requests from 'components/Group/Proxy/Requests';
import onUnmount from 'components/Dialog/SourceCookie/onUnmount.js';
import { SOURCE_PROXY_PASS } from 'structures/source.js';
import onClose from '../onClose.js';
import onService from './onService.js';
import onRoute from './onRoute.js';
import onSave from './onSave';
import onEdit from './onEdit.js';

let SourceProxy = () => {
	const dialog = useSelector((state) => state.dialogs[SOURCE_PROXY_PASS.id]);
	const bodyId = (dialog || {}).name;
	const isEditFlag = (dialog || {}).isEditFlag || false;
	const serviceId = useSelector((state) => state.jsObject.tempValue.service_id || '');
	const routeId = useSelector((state) => state.jsObject.tempValue.route_id || '');
	const [ tab, setTab ] = React.useState((state) => 0);
	const _onTab = React.useCallback((e, newValue) => setTab(newValue), [
		setTab,
	]);
	const _onClose = React.useCallback((e, reason) => {
		onClose(SOURCE_PROXY_PASS.id)(e, reason);
		onUnmount();
		setTab(0);
	}, [
		setTab,
	]);
	const _onSave = React.useCallback((e) => isEditFlag
		? onEdit(e, bodyId, _onClose)
		: onSave(e, bodyId, _onClose), [
		isEditFlag,
		bodyId,
		_onClose,
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
				<Header onClose={_onClose}>
					Получить значение из другого сервиса
				</Header>
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
						? <React.Fragment>
							<Tabs 
								variant="fullWidth"
								indicatorColor="primary"
								textColor="primary"
								value={tab}
								onChange={_onTab}>
								<Tab 
									value={0}
									label="URL *" />
								<Tab
									value={1} 
									label="Заголовки" />
								<Tab 
									value={2}
									label="Запрос" />
							</Tabs>
							<div style={{ display: tab === 0 ? 'block' : 'none' }}>
								<Url />
							</div>
							<div style={{ display: tab === 1 ? 'block' : 'none' }}>
								<Headers />
							</div>
							<div style={{ display: tab === 2 ? 'block' : 'none' }}>
								<Requests />
							</div>
						</React.Fragment>
						: <React.Fragment />}
					<DialogActions style={{ justifyContent: 'space-between' }}>
						<Button 
							variant="outlined"
							color="secondary"
							startIcon={<CloseIcon />}
							onClick={_onClose}>
							Отмена
						</Button>
						<Button 
							type="submit"
							variant="outlined"
							color="primary"
							startIcon={<SaveIcon />}>
							Сохранить
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
