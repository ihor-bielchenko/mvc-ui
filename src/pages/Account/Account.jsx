import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';
import CancelIcon from '@material-ui/icons/Cancel';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputText from 'components/Input/Text';
import onSave from './onSave';
import onMount from './onMount';
import onChange from './onChange';
import onUpload from './onUpload';

let Account = () => {
	const uniqueName = useSelector((state) => state.account.unique_name);
	const name = useSelector((state) => state.account.name);
	const email = useSelector((state) => state.account.email);
	const avatar = useSelector((state) => state.account.avatar);
	const flag = useSelector((state) => state.account.editFlag);
	

	return <React.Fragment>
		<Box py={6}>
			<Grid
				container
				spacing={3}>
				<Grid
					item
					xs={3}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center' }} >
					{avatar
						?	<Avatar 
								src={avatar} 
								alt='avatar'
								style={{ width: '180px', height: '180px' }}
							/> 
						:	<AccountCircleIcon
								style={{
									fontSize: 202,
									color: '#90caf9',
								}} />}
					{flag
						?	<>
								<input
									accept="image/*"
									name="avatar"
									onChange={onUpload}
									id="contained-button-file"
									multiple
									type="file"
									style={{ display: 'none' }}
								/>
								<label htmlFor="contained-button-file">
									<Button 
										startIcon={<GetAppIcon />}
										color="primary" 
										component="span"
									>
										Загрузить фото
									</Button>
								</label>

						    </>
						:	<React.Fragment/>
					}
				</Grid>
				<Grid
					item
					xs={9}>
					<Box pb={2}>
						<InputText
							disabled={!flag}
							name="unique_name"
							label="Уникальный идентификатор"
							value={uniqueName}
							onChange={onChange}/>
					</Box>
					<Box py={2}>
						<InputText
							disabled={!flag}
							name="name"
							label="Имя пользователя"
							value={name}
							onChange={onChange}/>
					</Box>
					<Box py={2}>
						<InputText
							disabled={!flag}
							name="email"
							label="Email"
							value={email}
							onChange={onChange} />
					</Box>
					<Box py={2}>
						{!flag 
							?	<Button
									onClick={onChange}
									startIcon={<EditIcon />}
									color="primary">
									Изменить
								</Button>
							:	<>
									<Button
										onClick={onMount} 
										startIcon={<CancelIcon />}
										color="primary">
										Отменить
									</Button>
									<Button
										onClick={onSave} 
										startIcon={<SaveIcon />}
										color="primary">
										Сохранить
									</Button>
								</>}
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
