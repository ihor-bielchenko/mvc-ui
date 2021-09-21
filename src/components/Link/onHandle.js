import onLoader from 'components/Loader/onLoader.js';

let timeout;
const onHandle = (e, history, onClick = () => {}) => {
	e.preventDefault();

	const target = e.currentTarget;
	const href = target.href;

	onLoader(true);
	window.scrollTo(0, 0);
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		history.push(href.replace(window.location.origin, ''));
		onClick(e);
	}, 300);
};

export default onHandle;
