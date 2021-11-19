import React from 'react';
import { useSelector } from 'react-redux';
import { 
	withRouter,
	Link, 
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
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GetAppIcon from '@material-ui/icons/GetApp';
import AirplayIcon from '@material-ui/icons/Airplay';
import StorageIcon from '@material-ui/icons/Storage';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import InputText from 'components/Input/Text';
import SelectServiceTemplate from 'components/Select/ServiceTemplate';
import SelectProtocol from 'components/Select/Protocol';
import onDialog from 'components/Dialog/onDialog.js';
import { SERVICE_TEMPLATE_BASE } from 'structures/serviceTemplates.js';
import { PROTOCOL_TYPE_HTTP } from 'structures/protocol.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import { 
	URL_PAGE_SERVICE,
	URL_PAGE_API,
	URL_PAGE_DB, 
} from 'consts/url.js';
import getProjectId from './getProjectId.js';
import onMount from './onMount.js';
import onUnmount from './onUnmount.js';
import onChange from './onChange.js';
import onSave from './onSave.js';
import onDelete from './onDelete.js';

let Service = ({ history }) => {
	const projectId = getProjectId();
	const domain = useSelector((state) => state.account.path || '');
	const id = useSelector((state) => state.services.form.id);
	const name = useSelector((state) => state.services.form.name || '');
	const subdomainPath = useSelector((state) => state.services.form.subdomain_path || '');
	const _onSave = React.useCallback((e) => onSave(e, history.push), [
		history.push,
	]);
	const _onDelete = React.useCallback((e) => onDelete(e, history.push), [
		history.push,
	]);

	React.useEffect(() => {
		onMount();
	}, []);

	React.useEffect(() => () => {
		onUnmount();
	}, []);

	return <React.Fragment>
		<Box>
			<Typography variant="h5">
				{id > 0
					? <React.Fragment>
						Сервис <b>{name}</b>
					</React.Fragment>
					: 'Новый сервис'}
			</Typography>
		</Box>
		<Box py={4}>
			<ButtonGroup size="large">
				<Button 
					component={Link}
					to={`/${projectId}/${URL_PAGE_SERVICE}/${id}/${URL_PAGE_API}`}
					disabled={!(id > 0)}
					startIcon={<AirplayIcon />}>
					API
				</Button>
				<Button 
					disabled
					startIcon={<ScheduleIcon />}>
					CRON
				</Button>
				<Button 
					component={Link}
					to={`/${projectId}/${URL_PAGE_SERVICE}/${id}/${URL_PAGE_DB}`}
					disabled={!(id > 0)}
					startIcon={<StorageIcon />}>
					База данных
				</Button>
				<Button
					disabled
					startIcon={<LibraryBooksIcon />}>
					Логи
				</Button>
			</ButtonGroup>
		</Box>
		<Box py={2}>
			<InputText 
				required
				label="Название сервиса"
				placeholder="Мой сервис"
				type="text"
				name="name"
				value={name}
				onChange={onChange('name')} />
		</Box>
		<Box py={2}>
			<SelectServiceTemplate
				disabled
				value={SERVICE_TEMPLATE_BASE.id} />
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
						value={PROTOCOL_TYPE_HTTP.id} />
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
					xs={3}>
					<InputText
						required
						label="Субдомен сервиса"
						placeholder="example"
						type="text"
						name="subdomain_path"
						value={subdomainPath}
						onChange={onChange('subdomain_path')} />
				</Grid>
				<Grid
					item
					xs={true}>
					<Button 
						style={{
							padding: 0,
							textTransform: 'lowercase',
						}}>
						<Typography
							variant="subtitle1"
							component="span">
							.{domain}
						</Typography>
					</Button>
				</Grid>
				<Grid
					item
					xs="auto">
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
			<Grid container>
				<Grid
					container
					item
					xs={6}
					alignItems="center">
					<ButtonGroup
						size="large"
						color="primary"
						style={{
							backgroundColor: '#FFF',
						}}>
						<Button startIcon={<PlayArrowIcon/>}>
							Запустить
						</Button>
						<Button startIcon={<GetAppIcon/>}>
							Скачать
						</Button>
					</ButtonGroup>
				</Grid>
				<Grid
					item
					xs={6}
					align="right">
					<ButtonGroup 
						size="large"
						color="primary"
						style={{
							backgroundColor: '#FFF',
						}}>
						<Button 
							startIcon={<SaveIcon />}
							onClick={_onSave}>
							Сохранить
						</Button>
						<Button 
							disabled={!(name.length > 0)}
							color="secondary"
							startIcon={<DeleteIcon />}
							onClick={onDialog(DIALOG_DELETE_CONFIRM, {
								onDelete: _onDelete,
							})}>
							Удалить
						</Button>
					</ButtonGroup>
				</Grid>
			</Grid>
		</Box>
	</React.Fragment>;
};

Service = React.memo(Service);
Service.defaultProps = {
};

export default withRouter(Service);
