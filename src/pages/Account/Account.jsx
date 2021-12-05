import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputText from 'components/Input/Text';

let Account = () => {
	const uniqueName = useSelector((state) => state.account.unique_name);
	const name = useSelector((state) => state.account.name);
	const email = useSelector((state) => state.account.email);

	return <React.Fragment>
		<Box py={6}>
			<Grid
				container
				spacing={3}>
				<Grid
					item
					xs={3}>
					<AccountCircleIcon
						style={{
							fontSize: 202,
							color: '#90caf9',
						}} />
				</Grid>
				<Grid
					item
					xs={9}>
					<Box pb={2}>
						<InputText
							disabled
							name="unique_name"
							label="Уникальный идентификатор"
							value={uniqueName} />
					</Box>
					<Box py={2}>
						<InputText
							disabled
							name="name"
							label="Имя пользователя"
							value={name} />
					</Box>
					<Box py={2}>
						<InputText
							disabled
							name="email"
							label="Email"
							value={email} />
					</Box>
				</Grid>
			</Grid>
		</Box>
	</React.Fragment>;
};

Account = React.memo(Account);
Account.defaultProps = {
};

export default Account;
