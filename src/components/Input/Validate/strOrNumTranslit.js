
const strOrNumTranslit = (e) => {
	const target = e.target;

	target.value = target.value.replace(/[^A-Za-zА-Яа-я0-9]/ig, '');
};

export default strOrNumTranslit;
