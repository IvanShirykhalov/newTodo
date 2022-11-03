import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import AppWithRedux from "./app/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {lightBlue, purple} from "@mui/material/colors";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from '@mui/material/styles';


const theme = createTheme({
    palette: {
        primary: purple,
        secondary: lightBlue,
        /*        type: "dark"*/
    }
}) /*Изменение стиля mui*/

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/> {/*сброс стилей css*/}
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>
    </ThemeProvider>
    , document.getElementById('root'));

serviceWorker.unregister();
