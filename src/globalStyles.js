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
		width: 100%;
		margin: 0 auto;
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
	.MuiPaper-root.MuiDialog-paper.MuiDialog-paperFullScreenMuiDialog-paperFullWidth {
		background-color: #FFF !important;
	}
	a {
		text-decoration: none;
		color: #2196f3;
		&:hover {
			color: #1565c0;
		}
	}
`;