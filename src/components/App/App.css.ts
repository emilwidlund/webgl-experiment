import {injectGlobal} from 'emotion';

injectGlobal`
    body {
        display: flex;
        flex-direction: column;
        height: 100vh;
        margin: 0;

        #root {
            display: flex;
            flex-direction: column;
            flex-grow: 1;

            canvas {
                flex-grow: 1;
            }
        }
    }
`;