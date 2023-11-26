// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import mixpanel from 'mixpanel-browser';

process.env.REACT_APP_MIXPANEL_PROJECT_ID = "fec442c009d17d45a524d687d515bb9a";
mixpanel.init(process.env.REACT_APP_MIXPANEL_PROJECT_ID, {debug: true});
