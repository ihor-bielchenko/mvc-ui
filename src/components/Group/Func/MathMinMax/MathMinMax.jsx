import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import InputNumeric from 'components/Input/Numeric';
import onAddField from './onAddField.js';
import onDeleteField from './onDeleteField.js';

let MathMinMax = ({ scriptId }) => {
	const props = useSelector((state) => state.func[scriptId].props);
	const propsKeys = Object.keys(props);
	const _onAddField = React.useCallback((e) => onAddField(e, scriptId), [
		scriptId,
	]);
	const _onDeleteField = React.useCallback((key) => (e) => onDeleteField(e, scriptId, key), [
		scriptId,
	]);

	return <React.Fragment>
		{propsKeys.map((key) => {
			return <Box 
				key={key}
				py={2}>
				<Grid 
					container
					spacing={3}
					py={2}>
					<Grid
						item
						xs={true}>
						<InputNumeric
							menu
							name="prop-1"
							label="Значение"
							placeholder="Число"
							helperText="Выберите созданный параметр или укажите значение вручную"
							defaultValue={props[key].value} />
					</Grid>
					<Grid
						item
						xs="auto">
						<IconButton 
							color="secondary"
							onClick={_onDeleteField(key)}>
							<CloseIcon />
						</IconButton>
					</Grid>
				</Grid>
			</Box>;
		})}
		<Button
			variant="outlined"
			color="primary"
			startIcon={<AddIcon fontSize="small" />}
			onClick={_onAddField}>
			Добавить значение
		</Button>
	</React.Fragment>;
};

MathMinMax = React.memo(MathMinMax);
MathMinMax.defaultProps = {
};

export default MathMinMax;