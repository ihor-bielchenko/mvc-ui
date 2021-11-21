import React from 'react';
import { useSelector } from 'react-redux';
import { 
	withRouter,
	// Link, 
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import InputText from 'components/Input/Text';
import SelectMethod from 'components/Select/Method';
import SelectProtocol from 'components/Select/Protocol';
import MenuUrl from 'components/Menu/Url';
import onMenu from 'components/Menu/onMenu.js';
import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import { 
	PROTOCOL_TYPE_WS,
	PROTOCOL_TYPE_TCP,
} from 'structures/protocol.js';
import Url from './Url';
import onMount from './onMount.js';
import onUnmount from './onUnmount.js';
import onChange from './onChange.js';
import onSave from './onSave.js';
import onDelete from './onDelete.js';
import onProtocol from './onProtocol.js';
import onMethod from './onMethod.js';

let Route = ({ history }) => {
	// const projectId = getProjectId();
	const id = useSelector((state) => state.routes.form.id);
	const name = useSelector((state) => state.routes.form.name || '');
	const protocolId = useSelector((state) => state.routes.form.protocol_id || '');
	const methodId = useSelector((state) => state.routes.form.method_id || '');
	const domain = useSelector((state) => state.account.path || '');
	const subdomainProjectPath = useSelector((state) => (state.services.form.project || {}).subdomain_path || '');
	const subdomainServicePath = useSelector((state) => state.services.form.subdomain_path || '');
	const _onSave = React.useCallback((e) => onSave(e, history.push), [
		history.push,
	]);
	const _onDelete = React.useCallback((e) => onDelete(e, history.push), [
		history.push,
	]);

	React.useEffect(() => {
		setTimeout(() => onMount(), 0);
	}, []);

	React.useEffect(() => () => {
		onUnmount();
	}, []);

	return <React.Fragment>
		<Box>
			<Typography variant="h5">
				{id > 0
					? <React.Fragment>
						Роут <b>{name}</b>
					</React.Fragment>
					: 'Новый роут'}
			</Typography>
		</Box>
		<Box py={2}>
			<InputText 
				required
				label="Название роута"
				placeholder="Роут для ..."
				type="text"
				name="name"
				value={name}
				onChange={onChange('name')} />
		</Box>
		<Box 
			py={2}
			width="20%">
			<SelectMethod
				required
				value={methodId}
				onSelect={onMethod} />
		</Box>
		<Box 
			position="relative"
			pt={2}
			pb="84px">
			<Grid 
				container
				spacing={1}
				alignItems="center">
				<Grid
					item
					xs={2}>
					<SelectProtocol
						disabled
						value={protocolId}
						onSelect={onProtocol} />
				</Grid>
				<Grid
					item
					xs="auto">
					<Typography variant="h6">
						://
					</Typography>
				</Grid>
				<Grid
					item
					xs="auto">
					<Button 
						style={{
							padding: 0,
							textTransform: 'lowercase',
						}}>
						<Typography
							variant="subtitle1"
							component="span">
							{subdomainServicePath}.{subdomainProjectPath}.{domain}{protocolId === PROTOCOL_TYPE_WS.id
								? ':3001'
								: protocolId === PROTOCOL_TYPE_TCP.id
									? ':3002'
									: ''}
						</Typography>
					</Button>
				</Grid>
				<Grid
					item
					xs="auto">
					<Typography variant="h6">
						/
					</Typography>
				</Grid>
				<Grid
					item
					xs={true}>
					<Url />
				</Grid>
				<Grid
					item
					xs="auto">
						<Button 
							onClick={onMenu('menu-url')}
							startIcon={<AddIcon />}
							variant="outlined">
							Маршрут*
						</Button>
						<MenuUrl aria="menu-url" />
						<IconButton
							onClick={() => {}}>
							<FileCopyIcon />
						</IconButton>
						<IconButton 
							onClick={() => {}}>
							<VisibilityIcon />
						</IconButton>
				</Grid>
			</Grid>
		</Box>
		<Box 
			position="fixed"
			bottom="18px"
			left="100px"
			right="100px"
			align="right"
			zIndex="2">
			<ButtonGroup 
				size="large"
				color="primary"
				style={{
					backgroundColor: '#FFF',
				}}>
				<Button 
					disabled={!(name.length > 0 && methodId > 0)}
					startIcon={<SaveIcon />}
					onClick={_onSave}>
					Сохранить
				</Button>
				<Button 
					disabled={!(id > 0)}
					color="secondary"
					startIcon={<DeleteIcon />}
					onClick={onDialog(DIALOG_DELETE_CONFIRM, {
						onDelete: _onDelete,
					})}>
					Удалить
				</Button>
			</ButtonGroup>
		</Box>
	</React.Fragment>;
};

Route = React.memo(Route);
Route.defaultProps = {
};

export default withRouter(Route);
