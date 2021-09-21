import { 
	emailCheck,
	nameCheck, 
} from 'utils/validators.js';

const onNext = (e, action) => {
	e.preventDefault();

	const form = e.currentTarget.parentNode.parentNode;
	const email = form.elements.email.value;
	const name = form.elements.name.value;
	let step = 0;

	try {
		emailCheck(email);
	}
	catch (err) {
		step++;
		action((currentState) => {
			return {
				...currentState,
				email: err.message,
			};
		});
	}

	try {
		nameCheck(name);
	}
	catch (err) {
		step++;
		action((currentState) => {
			return {
				...currentState,
				name: err.message,
			};
		});
	}

	if (step === 0) {
		action((currentState) => {
			return {
				...currentState,
				email: '',
				name: '',
				activeStep: 1,
			};
		});
	}
};

export default onNext;
