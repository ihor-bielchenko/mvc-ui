import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import InputText from 'components/Input/Text';
import onAdd from './onAdd.js';
import onDelete from './onDelete.js';

let TextJoin = () => {
	const [ rows, setRows ] = React.useState(() => ({
		1: {
			id: 1,
			value: '',
		}
	}));
	const _onAdd = React.useCallback((e) => onAdd(e, setRows), [
		setRows,
	]);
	const _onDelete = React.useCallback((id) => (e) => onDelete(e, id, setRows), [
		setRows,
	]);
	const _rowsKeys = Object.keys(rows);

	return <React.Fragment>
		<Box mt={2} />
		<Grid 
			container
			spacing={3}
			alignItems="flex-start">
			<Grid 
				item
				xs={8}>
				{_rowsKeys.map((key, index) => (
					<Grid 
						key={rows[key].id}
						container
						spacing={3}>
						<Grid
							item
							xs={true}>
							<InputText
								menu
								id={`prop-${rows[key].id}`}
								name={`prop-${rows[key].id}`}
								label="Значение"
								placeholder="Текст или число"
								helperText="Выберите созданный параметр или укажите значение вручную"
								defaultValue={rows[key].value} />
						</Grid>
						{_rowsKeys.length > 1
							? <Grid
								item
								xs="auto">
								<IconButton
									size="small"
									color="secondary"
									onClick={_onDelete(rows[key].id)}>
									<DeleteIcon />
								</IconButton>
							</Grid>
							: <React.Fragment />}
					</Grid>
				))}
				<Box mt={3}>
					<Button
						startIcon={<AddIcon />}
						variant="outlined"
						color="primary"
						onClick={_onAdd}>
						Добавить значение
					</Button>
				</Box>
			</Grid>
			<Grid 
				item
				xs={4}>
				<InputText
					menu
					name="prop-2"
					label="Символ объединения"
					placeholder="Текст или число"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
		</Grid>
	</React.Fragment>;
};

TextJoin = React.memo(TextJoin);
TextJoin.defaultProps = {
};

export default TextJoin;
