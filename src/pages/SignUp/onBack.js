
const onBack = (e, action) => {
	e.preventDefault();

	action((currentState) => {
		return {
			...currentState,
			activeStep: 0,
		};
	});
};

export default onBack;
