import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Database from 'components/Database';
import Background from 'components/Script/Background';
import Header from 'components/Header';
import Breadcrumbs from 'components/Breadcrumbs';
import AddIcon from '@material-ui/icons/Add';

let PageDatabase = () => {
	return <Background
		position="relative"
		overflow="hidden"
		width="100%"
		height="100%">
		<Box
			width="max-content"
			minWidth="100%"
			height="100%">
			<Header border>
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
							disabled
							startIcon={<AddIcon />}>
							Новая таблица
						</Button>
					</Box>
				</Box>
			</Header>
			<Database />
		</Box>
	</Background>;
};

PageDatabase = React.memo(PageDatabase);
PageDatabase.defaultProps = {
};

export default PageDatabase;
