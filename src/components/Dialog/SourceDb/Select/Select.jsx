import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Store from 'components/Store';
import InputNumeric from 'components/Input/Numeric';
import { SOURCE_SCRIPT } from 'structures/source.js';
import { COLUMN_ID } from 'structures/columnTypes.js';
import onDialog from '../../onDialog.js';
import onCollection from './onCollection.js';
import onOffset from './onOffset.js';
import onLimit from './onLimit.js';
import onColumn from './onColumn.js';
import onChangeByLogicOffset from './onChangeByLogicOffset.js';
import onChangeByLogicLimit from './onChangeByLogicLimit.js';
import onClearOffset from './onClearOffset.js';
import onClearLimit from './onClearLimit.js';

let Select = () => {
	const dbColumnsKeys = useSelector((state) => Object.keys(state.dbColumns.data));
	const isCollection = useSelector((state) => state.prop.tempValue.is_collection);
	const offset = useSelector((state) => state.prop.tempValue.offset);
	const limit = useSelector((state) => state.prop.tempValue.limit);
	const selectData = useSelector((state) => state.prop.tempValue.select || []);

	return <React.Fragment>
		<Box py={3}>
			<Grid 
				container
				alignItems="center">
				<Grid
					item
					xs={6}> 
					<Box py={2}>
						<FormControlLabel
							label="Получать из базы коллекцию элементов"
							name="is_collection"
							control={<Switch 
								checked={!!isCollection}
								onChange={onCollection} />} />
					</Box>
				</Grid>
				{isCollection
					? <Grid
						item
						container
						xs={6}
						spacing={2}>
						<Grid
							item
							xs={6}>
							<InputNumeric
								menu
								onMenu={onDialog(SOURCE_SCRIPT.id, {
									onClickEntity: onChangeByLogicOffset,
									formatValidating: () => ([
										process.env.FORMAT_NUM,
									]),
								})}
								onValue={onDialog(SOURCE_SCRIPT.id, {
									onClickEntity: onChangeByLogicOffset,
									formatValidating: () => ([
										process.env.FORMAT_NUM,
									]),
								})}
								onDelete={onClearOffset}
								name="offset"
								label="Начало выборки (offset)"
								placeholder="0"
								defaultValue={offset}
								onChange={onOffset} />
						</Grid>
						<Grid
							item
							xs={6}>
							<InputNumeric
								menu
								onMenu={onDialog(SOURCE_SCRIPT.id, {
									onClickEntity: onChangeByLogicLimit,
									formatValidating: () => ([
										process.env.FORMAT_NUM,
									]),
								})}
								onValue={onDialog(SOURCE_SCRIPT.id, {
									onClickEntity: onChangeByLogicLimit,
									formatValidating: () => ([
										process.env.FORMAT_NUM,
									]),
								})}
								onDelete={onClearLimit}
								name="limit"
								label="Лимит"
								placeholder="10"
								defaultValue={limit}
								onChange={onLimit} />
						</Grid>
					</Grid>
					: <React.Fragment />}
			</Grid>
		</Box>
		<Divider />
		<Box 
			mt={3}
			mb={2}>
			<Typography 
				variant="subtitle2"
				color="textSecondary">
				Какие поля нужно выбрать из базы данных?
			</Typography>
		</Box>
		<FormGroup>
			{dbColumnsKeys.map((key) => {
				const dbColumnsData = Store().getState().dbColumns.data;

				return <FormControlLabel
					key={key}
					control={<Checkbox 
						value={key}
						checked={selectData.indexOf(Number(key)) > -1}
						onChange={onColumn} />}
					label={<Typography 
						variant="h6"
						color={dbColumnsData[key].type_id === COLUMN_ID.id
							? 'secondary'
							: 'initial'}>
						<b>{dbColumnsData[key].name}</b>
					</Typography>} />
			})}
		</FormGroup>
	</React.Fragment>;
};

Select = React.memo(Select);
Select.defaultProps = {
};

export default Select;
