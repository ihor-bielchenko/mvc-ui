import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import columnTypes from 'structures/columnTypes.js';

let DbColumnDelete = ({ scriptId }) => {
	const dbColumns = useSelector((state) => state.dbColumns.data);
	const dbColumnsKeys = Object.keys(dbColumns);

	return <React.Fragment>
		<Grid
			container
			spacing={3}
			alignItems="center">
			<Grid
				item
				xs={true}>
				<FormControl component="fieldset">
					<FormLabel component="legend">
						Укажите колонку:
					</FormLabel>
					<RadioGroup 
						aria-label="column" 
						name="column_id">
					{dbColumnsKeys.map((key) => {
						return <FormControlLabel 
							key={key}
							value={dbColumns[key].name} 
							control={<Radio />} 
							label={<React.Fragment>
								{dbColumns[key].name} <b>({columnTypes[dbColumns[key].type_id].text()})</b>
							</React.Fragment>} />
					})}
					</RadioGroup>
				</FormControl>
			</Grid>
			<Grid
				item
				xs="auto">
				<Typography
					variant="h6"
					color="primary">
					или
				</Typography>
			</Grid>
			<Grid
				item
				xs={true}>
				<Button
					variant="outlined"
					color="primary"
					startIcon={<AddIcon fontSize="small" />}>
					Выбрать название поля из логики
				</Button>
			</Grid>
		</Grid>
	</React.Fragment>;
};

DbColumnDelete = React.memo(DbColumnDelete);
DbColumnDelete.defaultProps = {
	scriptId: 0,
};

export default DbColumnDelete;