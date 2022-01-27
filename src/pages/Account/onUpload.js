import Store from 'components/Store';

const onUpload = (e) =>  {

	const account = Store().getState().account;
	const file = e.target.files[0]
	

		
	if (!file.type.match('image')) {
			return
		}

		const reader = new FileReader()
		account.avatarFile = file;

		reader.onload = ev => {

			account.avatar = ev.target.result;
			Store().dispatch({
				type: 'account',
				payload: () => ({ ...account }),

			});
	}
	reader.readAsDataURL(file)
		
		
}


export default onUpload;	

