import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Header from 'components/Header';
import SelectScale from 'components/Select/Scale';
import Workspace from './Workspace';
import onMount from './onMount.js';

let Script = ({ 
	id,
	isSource,
	dataTypeValidating,
	onClickAsSource,
}) => {
	const isExists = useSelector((state) => !!state.script[id]);
	const workspaceId = React.useMemo(() => isExists
		? Date.now()
		: id, [
		isExists,
		id,
	]);

	React.useEffect(() => onMount(id, workspaceId), [
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
						<Button>
							Конфигурация роута
						</Button>
						<Button disabled>
							Логика
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
