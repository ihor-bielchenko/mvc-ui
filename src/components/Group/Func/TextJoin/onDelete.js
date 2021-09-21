
const onDelete = (e, id, setRows) => {
	setRows((rows) => {
		if (rows[id]) {
			delete rows[id];

			return ({ ...rows });
		}
		return rows;
	});
};

export default onDelete;
