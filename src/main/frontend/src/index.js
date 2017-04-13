/* eslint-disable import/default */
import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {browserHistory, Router} from 'react-router';
import configureStore from './store/configureStore';
import {syncHistoryWithStore} from 'react-router-redux';
import vex from 'vex-js';
import routes from './routes';
import '../node_modules/vex-js/dist/css/vex.css';
import '../node_modules/vex-js/dist/css/vex-theme-top.css';
import './styles/style.css'; // Also you can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import './styles/notifier.css';
//require('./favicon.ico'); // Tell webpack to load favicon.ico
vex.defaultOptions.className = 'vex-theme-top';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>, document.getElementById('app')
);
