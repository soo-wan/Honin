import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from "react-router-dom";

import { PersistGate  } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import store from './Component/store';
import { RecoilRoot } from 'recoil';
export let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </PersistGate>
      </Provider>
    </BrowserRouter>
);

reportWebVitals();
