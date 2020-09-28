import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
${({ theme }) => css`
	html {
		body {
			#root {
				background: ${theme.colors.background};
			}
		}
	}
`}
`;
