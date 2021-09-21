import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Store from 'components/Store';
import MenuSource from 'components/Menu/Source';
import onMenu from 'components/Menu/onMenu.js';
import onDeleteValue from './onDeleteValue.js';
import onComplexValue from './onComplexValue.js';
import onComplexDelete from './onComplexDelete.js';
import onChangeValue from './onChangeValue.js';

let Body = () => {
	const bodyKeys = useSelector((state) => Object.keys(state.prop.body));
	const bodyData = Store().getState().prop.body;

	return <React.Fragment>

	</React.Fragment>;

	/*return bodyKeys.map((id) => {
		const _id = id.toString();
		const _keySubstr = bodyData[id]
			.key
			.toString()
			.substr(0, 14);

		return <Box 
			key={id}
			py={2}>
			<Grid 
				container
				spacing={2}
				alignItems="center">
				{bodyKeys.length > 1
					? <Grid
						item
						xs={2}>
						<Typography color="primary">
							<b>
							{(_keySubstr.length >= 13 && _keySubstr[13] !== ' ')
								? <React.Fragment>
									{_keySubstr}...
								</React.Fragment>
								: _keySubstr}
							</b>
						</Typography>
					</Grid>
					: <React.Fragment />}
				<Grid
					item
					xs={true}>
					<InputText
						menu
						onMenu={onMenu(_id)}
						onValue={onComplexValue}
						onDelete={onComplexDelete}
						name={_id}
						id={_id}
						defaultValue={bodyData[id].value}
						onChange={onChangeValue(id)} />
					<MenuSource aria={_id} />
				</Grid>
				{bodyKeys.length > 1
					? <Grid
						item
						xs={false}
						style={{
							padding: 0,
						}}>
						<IconButton 
							color="secondary"
							size="small"
							onClick={onDeleteValue(id)}>
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Grid>
					: <React.Fragment />}
			</Grid>
		</Box>;
	});*/
};
Body = React.memo(Body);
Body.defaultProps = {
};