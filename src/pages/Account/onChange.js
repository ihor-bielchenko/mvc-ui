import Store from 'components/Store';

const onChange = (e) =>  {

	const account = Store().getState().account;
	

	if (e.target.name) {

		if(e.target.name === 'avatar'){
			let files = Array.from(e.target.files)

			files.forEach(file => {
				if (!file.type.match('image')) {
					return
				}

				const reader = new FileReader()

				reader.onload = ev => {
					account.avatar = ev.target.result;
					Store().dispatch({
						type: 'account',
						payload: () => ({ ...account }),

					});
				}
				reader.readAsDataURL(file)
			})
		}

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