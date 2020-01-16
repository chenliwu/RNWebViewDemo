import React, {Component} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const runFirst = `
      document.body.style.backgroundColor = 'red';
      setTimeout(function() { window.alert('hi') }, 3000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;
/**
 *
 - RN端注入JS脚本到Web端。
 - 这是一个脚本，该脚本在首次加载网页后立即运行。
 - 即使页面重新加载或导航离开，它也只能运行一次。
 */
export default class App extends Component {
    render() {

        return (
            <SafeAreaView style={{flex: 1}}>
                <WebView
                    source={{
                        uri:
                            'https://github.com/react-native-community/react-native-webview',
                    }}
                    injectedJavaScript={runFirst}
                />
            </SafeAreaView>
        );
    }
}
