import React, { Suspense } from 'react';
import "./i18n";
import Store from './store';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import mixpanel from 'mixpanel-browser';

mixpanel.init(process.env.REACT_APP_MIXPANEL_PROJECT_ID, { debug: true, ignore_dnt: true });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Suspense fallback={<div className="initialLoader"></div>}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
