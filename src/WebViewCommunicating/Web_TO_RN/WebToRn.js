import React, {Component} from 'react';
import {View, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

import testHtmlPage from './testHtmlPage';

const html = `
      <html>
      <head></head>
      <body>
      
        <h1>Web页面端</h1>
      
        <script>
          setTimeout(function () {
            window.ReactNativeWebView.postMessage("Hello!");
          }, 2000)
        </script>
      </body>
      </html>
    `;
/**

 - Web端往RN传递事件和数据可以通过window.ReactNativeWebView.postMessage(params)方法和WebView组件的onMessage属性来实现。
 - Web端调用window.ReactNativeWebView.postMessage(params)方法，携带一个字符串参数，往RN传递数据。
 - RN端通过onMessage来监听Web传递的事件和数据，然后进行处理。
 - 我们必须设置onMessage或window.ReactNativeWebView.postMessage方法。
 - window.ReactNativeWebView.postMessage仅接受一个参数，该参数必须是字符串。

 */
export default class App extends Component {
    render() {


        return (
            <SafeAreaView style={{flex: 1}}>
                <WebView
                    source={{html:testHtmlPage}}
                    onMessage={event => {
                        console.log("onMessage.event.nativeEvent", event.nativeEvent);
                        alert(event.nativeEvent.data);
                    }}
                />
            </SafeAreaView>
        );
    }
}
