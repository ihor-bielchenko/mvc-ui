import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	body,
	html {
		margin: 0;
		padding: 0 !important;
		outline: none;
		display: block;
		height: 100%;
	}
	body {
		width: calc(100% - 278px);
		margin: 0 auto;
		border-right: 1px solid rgba(0, 0, 0, 0.12);
		border-left: 1px solid rgba(0, 0, 0, 0.12);
	}
	#root {
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	.MuiAlert-filledWarning {
		background-color: rgb(239, 108, 0) !important;
	}
	.MuiOutlinedInput-adornedStart {
		padding-left: 6px !important;
	}
	.MuiTab-textColorSecondary.Mui-disabled {
		color: rgba(0, 0, 0, 0.2) !important;
	}
	.MuiDialog-root,
	.MuiBackdrop-root {
		background-color: rgba(0, 0, 0, 0) !important;
		margin: 0 auto;
		max-width: calc(100% - 278px);
	}
	a {
		text-decoration: none;
		color: #2196f3;
		&:hover {
			color: #1565c0;
		}
	}
`;