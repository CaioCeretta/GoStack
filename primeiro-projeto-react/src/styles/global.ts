import { createGlobalStyle } from 'styled-components';

import githubBackground from '../assets/github-background.svg';

export default createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: 0;
}

body {
  background: #f0f0f5 url(${githubBackground}) no-repeat 70% top;
  -webkit-font-smoothing: antialiased;
}

body, input-security, button {
  font: 16px Roboto, sans-serif
}

#root {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
}

button {
  cursor: pointer;
}
`;
