import React from 'react';
import { useSelector } from 'react-redux';
import { 
	withRouter,
	// Link, 
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
// import Grid from '@material-ui/core/Grid';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import FileCopyIcon from '@material-ui/icons/FileCopy';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import DeleteIcon from '@material-ui/icons/Delete';
// import SaveIcon from '@material-ui/icons/Save';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import GetAppIcon from '@material-ui/icons/GetApp';
// import AirplayIcon from '@material-ui/icons/Airplay';
// import StorageIcon from '@material-ui/icons/Storage';
// import ScheduleIcon from '@material-ui/icons/Schedule';
// import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
// import InputText from 'components/Input/Text';
// import SelectServiceTemplate from 'components/Select/ServiceTemplate';
// import SelectProtocol from 'components/Select/Protocol';
// import onDialog from 'components/Dialog/onDialog.js';
// import { SERVICE_TEMPLATE_BASE } from 'structures/serviceTemplates.js';
// import { PROTOCOL_TYPE_HTTP } from 'structures/protocol.js';
// import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
// import { 
// 	URL_PAGE_SERVICE,
// 	URL_PAGE_API,
// 	URL_PAGE_DB, 
// } from 'consts/url.js';
// import getProjectId from './getProjectId.js';
import onMount from './onMount.js';
import onUnmount from './onUnmount.js';
// import onChange from './onChange.js';
// import onSave from './onSave.js';
// import onDelete from './onDelete.js';

let Route = ({ history }) => {
	// const projectId = getProjectId();
	const id = useSelector((state) => state.routes.form.id);
	const name = useSelector((state) => state.routes.form.name || '');

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
						Роут <b>{name}</b>
					</React.Fragment>
					: 'Новый роут'}
			</Typography>
		</Box>
	</React.Fragment>;
};

Route = React.memo(Route);
Route.defaultProps = {
};

export default withRouter(Route);
