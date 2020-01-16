/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import injectedJavaScriptPropDemo from './src/WebViewCommunicating/RN_TO_Web/injectedJavaScriptPropDemo';
import injectJavaScriptMethodDemo from './src/WebViewCommunicating/RN_TO_Web/injectJavaScriptMethodDemo';
import injectedJavaScriptBeforeContentLoadedDemo from './src/WebViewCommunicating/RN_TO_Web/injectedJavaScriptBeforeContentLoadedDemo';

import WebToRn from './src/WebViewCommunicating/Web_TO_RN/WebToRn';

AppRegistry.registerComponent(appName, () => WebToRn);
