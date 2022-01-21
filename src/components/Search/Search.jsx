import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { getLang } from 'components/Language';
// import MenuFilter from 'components/Menu/Filter';
import onExactMatch from './onExactMatch.js';
import onCollection from './onCollection.js';

let Search = ({
	aria,
	label,
	placeholder,
	withExactMatch,
	withSomeResults,
	onSubmit,
}) => {
	const submitRef = React.useRef(null);
	const placeholders = useSelector((state) => state.list.search.placeholders);
	const isExactMatch = useSelector((state) => state.list.search.isExactMatch);
	const isCollection = useSelector((state) => state.list.search.isCollection);
	const [ value, setValue ] = React.useState(() => '');
	const _onInput = React.useCallback((e) => setValue(e.target.value), [
		setValue,
	]);
	const _onClear = React.useCallback((e) => {
		setValue('');
		submitRef.current.click();
	}, [
		setValue,
		submitRef,
	]);

	return <form onSubmit={onSubmit}>
		<Grid 
			container
			alignItems="center">
			<Grid 
				item 
				xs={true}>
				<Autocomplete
					freeSolo
					id="input-search"
					value={value}
					onInput={_onInput}
					options={placeholders.map((item) => item.text)}
					renderInput={(params) => (
						<TextField 
							{...params} 
							label={label}
							placeholder={placeholder} 
							name="query"
							margin="normal" 
							variant="outlined"
							InputProps={{
								endAdornment: value.length > 0
									? <InputAdornment position="start">
										<IconButton 
											size="small"
											onClick={_onClear}>
											<CloseIcon fontSize="small" />
										</IconButton>
									</InputAdornment>
									: <React.Fragment />,
							}} />
					)} />
			</Grid>
			<Grid
				item
				xs={false}>
				<IconButton
					ref={submitRef}
					type="submit">
					<SearchIcon fontSize="large" />
				</IconButton>
			</Grid>
		</Grid>
		{withExactMatch
			? <React.Fragment>
				<Box mt={2} />
				<FormControlLabel
					control={<Switch
						checked={isExactMatch}
						onChange={onExactMatch}
						name="is_exact_match" />}
					color="primary"
					label={<Typography variant="body2">
						{getLang('cmpSearchExact')}
					</Typography>} />
			</React.Fragment>
			: <React.Fragment />}
		{withSomeResults
			? <React.Fragment>
				<Box mt={2} />
				<FormControlLabel
					control={<Switch
						checked={isCollection}
						onChange={onCollection}
						name="is_collection" />}
					color="primary"
					label={getLang('cmpSearchSomeResult')} />
			</React.Fragment>
			: <React.Fragment />}
	</form>;
};

Search = React.memo(Search);
Search.defaultProps = {
	aria: 'menu-filter-list',
	label: getLang('cmpSearch'),
	placeholder: getLang('cmpSearchQuery'),
	withExactMatch: false,
	withSomeResults: false,
};

export default Search;
