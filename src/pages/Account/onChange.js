import Store from 'components/Store';

const onChange = (e) =>  {

	const account = Store().getState().account;
	

	if (e.target.name) {

		account[e.target.name] = e.target.value;

		Store().dispatch({
			type: 'account',
			payload: () => ({ ...account }),	
		});

	} else {

		account.editFlag = true;

		Store().dispatch({
			type: 'account',
			payload: () => ({ ...account }),	
		});
	}
}


export default onChange;	