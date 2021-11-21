import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Header from 'components/Header';
import SelectScale from 'components/Select/Scale';
import getProjectId from 'components/Service/getProjectId.js';
import getServiceId from 'components/Service/getServiceId.js';
import getRouteId from 'components/Breadcrumbs/getRouteId.js';
import {
	URL_PAGE_SERVICE,
	URL_PAGE_API,
} from 'consts/url.js';
import Workspace from './Workspace';
import onMount from './onMount.js';

let Script = ({ 
	id,
	isSource,
	dataTypeValidating,
	onClickAsSource,
}) => {
	const projectId = getProjectId();
	const serviceId = getServiceId();
	const routeId = getRouteId();
	const workspaceId = React.useMemo(() => Date.now(), []);

	React.useEffect(() => {
		return onMount(id, workspaceId);
	}, [
		id,
		workspaceId,
	]);

	return <React.Fragment>
		<Box 
			width="max-content"
			minWidth="100%">
			<Header>
				<Box 
					display="flex"
					justifyContent="space-between"
					width="calc(100% - 192px)">
					<Box
						display="flex"
						alignItems="center"
						height="48px"
						width="max-content"
						overflow="hidden"
						mr="10px"
						px="4px"
						style={{
							backgroundColor: '#FFF',
							border: '1px solid #EFEFEF',
							borderRadius: '7px',
						}}>
						<Button 
							disabled
							startIcon={<ArrowBackIcon />}>
							Назад
						</Button>
						<Button 
							disabled
							endIcon={<ArrowForwardIcon />}>
							Вперед
						</Button>
						<SelectScale />
					</Box>
					<Box
						display="flex"
						alignItems="center"
						height="48px"
						width="max-content"
						overflow="hidden"
						mr="10px"
						px="4px"
						style={{
							backgroundColor: '#FFF',
							border: '1px solid #EFEFEF',
							borderRadius: '7px',
						}}>
						<Button
							component={Link}
							to={`/${projectId}/${URL_PAGE_SERVICE}/${serviceId}/${URL_PAGE_API}/${routeId}`}
							color="primary">
							Настройка роута
						</Button>
						<Button
							disabled
							color="primary">
							Программа
						</Button>
					</Box>
				</Box>
			</Header>
			<Workspace 
				scriptId={id}
				workspaceId={workspaceId}
				isSource={isSource}
				dataTypeValidating={dataTypeValidating}
				onClickAsSource={onClickAsSource} />
		</Box>
	</React.Fragment>;
};

Script = React.memo(Script);
Script.defaultProps = {
	id: 0,
	isSource: false,
	dataTypeValidating: () => ([]),
	onClickAsSource: () => {},
};

export default Script;
