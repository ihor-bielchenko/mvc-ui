import React from 'react';
import { useSelector } from 'react-redux';
import SlotTable from './Slot/Table';
import onMount from './onMount.js';

let Database = () => {
	const tableKeys = useSelector((state) => Object.keys(state.db.tables || {}));

	React.useEffect(() => {
		onMount();
	}, []);

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
