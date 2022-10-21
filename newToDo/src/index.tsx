import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {lightBlue, purple} from "@material-ui/core/colors";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";

const theme = createTheme({
    palette: {
        primary: purple,
        secondary: lightBlue,
        type: "dark"
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
