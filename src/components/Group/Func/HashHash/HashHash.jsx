import React from 'react';
// import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DbFilter from 'components/Dialog/SourceDb/Filter';
import DbSort from 'components/Dialog/SourceDb/Sort';
import DbQuery from 'components/Dialog/SourceDb/Query';

let HashHash = ({ scriptId }) => {
	return <React.Fragment>
		<Paper>
			<Box p={2}>
				<Typography>
					Фильтры:
				</Typography>
				<DbFilter />
			</Box>
		</Paper>
		<Box mt={4} />
		<Paper>
			<Box p={2}>
				<Typography>
					Сортировка:
				</Typography>
				<DbSort />
			</Box>
		</Paper>
		<Box mt={4} />
		<Paper>
			<Box p={2}>
				<Typography>
					Поиск:
				</Typography>
				<Box pt={4} />
				<DbQuery />
			</Box>
		</Paper>
	</React.Fragment>;
};

HashHash = React.memo(HashHash);
HashHash.defaultProps = {
	scriptId: 0,
};

export default HashHash;

