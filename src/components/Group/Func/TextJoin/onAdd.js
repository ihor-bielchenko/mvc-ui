
const onAdd = (e, setRows) => {
	setRows((rows) => {
		const id = Date.now();

		rows[id] = {
			id,
			value: '', 
		};

		return ({ ...rows });
	});
};

export default onAdd;
