import styled from 'styled-components';
import Box from '@material-ui/core/Box';

const BoxControlWrapper = styled(Box)`
	& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline,
	& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline,
	& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
		border-color: rgba(0, 0, 0, 0.23);
		border-width: 1px;
		${(props) => props['data-border_left_radius_0']
			? `
				border-top-left-radius: 0px;
				border-bottom-left-radius: 0px;
			`
			: ''}
		${(props) => props['data-border_right_radius_0']
			? `
				border-top-right-radius: 0px;
				border-bottom-right-radius: 0px;
			`
			: ''}
		${(props) => props['data-border_left_hide']
			? `
				border-left: none;
			`
			: ''}
		${(props) => props['data-border_right_hide']
			? `
				border-right: none;
			`
			: ''}
	}
`;

export default BoxControlWrapper;
