import React from 'react';
// import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputText from 'components/Input/Text';

let ServerHttp = ({ scriptId }) => {
	const [ tab, setTab ] = React.useState(() => 0);
	const _onTab = React.useCallback((e, newValue) => setTab(newValue), [
		setTab,
	]);

	return <React.Fragment>
		<Box pt={2} />
		<Grid
			container
			alignItems="center"
			spacing={1}>
			<Grid
				item
				xs={false}>
				<Typography variant="h4">
					http://
				</Typography>
			</Grid>
			<Grid
				item
				xs={true}>
				<InputText
					menu
					name="prop-1"
					label="URL (адрес заппроса)"
					placeholder="example.com"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
		</Grid>
		<Box pt={2} />
		<Tabs 
			value={tab} 
			onChange={_onTab}>
			<Tab label="Параметры запроса" />
			<Tab label="Тело запроса" />
			<Tab label="Куки" />
		</Tabs>
	</React.Fragment>;
};

ServerHttp = React.memo(ServerHttp);
ServerHttp.defaultProps = {
	scriptId: 0,
};

export default ServerHttp;

