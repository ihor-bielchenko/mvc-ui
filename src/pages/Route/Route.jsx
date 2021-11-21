import React from 'react';
// import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Header from 'components/Header';
import Breadcrumbs from 'components/Breadcrumbs';
import ComponentRoute from 'components/Route';

let Route = () => {
	return <Box
		position="relative"
		width="100%"
		height="100%"
		overflow="auto">
		<Box
			width="max-content"
			minWidth="100%"
			height="100%">
			<Header backgroundColor="#FFF">
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
							border: '1px solid #EFEFEF',
							borderRadius: '7px',
						}}>
						<Breadcrumbs />
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
							disabled>
							Новая таблица
						</Button>
					</Box>
				</Box>
			</Header>
			<Box 
				position="relative"
				width="calc(100% - 192px)"
				mx="auto">
				<Box 
					p="4px"
					mt="64px">
					<ComponentRoute />
				</Box>
			</Box>
		</Box>
	</Box>;
};

Route = React.memo(Route);
Route.defaultProps = {
};

export default Route;
