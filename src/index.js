import React from 'react';
import ReactDOM from 'react-dom';
import {ConWrapper} from './App';
import { Provider } from 'react-redux'
import { store } from './Redux/store'

ReactDOM.render(
    <Provider store={store}>
        <ConWrapper />
    </Provider>, 
    document.getElementById('root')
)