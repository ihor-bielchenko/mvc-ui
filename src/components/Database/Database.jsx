import React from 'react';
import { useSelector } from 'react-redux';
import SlotTable from './Slot/Table';

let Database = () => {
	const tableKeys = useSelector((state) => Object.keys(state.db.tables || {}));

	return <React.Fragment>
		{tableKeys.map((tableId) => {
			return <React.Fragment key={tableId}>
				<SlotTable id={Number(tableId)} />
			</React.Fragment>;
		})}		
	</React.Fragment>;
};

Database = React.memo(Database);
Database.defaultProps = {
};

export default Database;
