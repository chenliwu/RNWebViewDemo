import React, { Component } from 'react';
import { View ,SafeAreaView} from 'react-native';
import { WebView } from 'react-native-webview';

/**

 - RN端注入JS脚本到Web端。
 - 这是在首次加载网页之前运行的脚本。
 - 即使页面重新加载或导航离开，它也只能运行一次。 如果要在执行Web代码之前将任何内容注入到窗口，本地存储或文档中，这将很有用。

 */
export default class App extends Component {
    render() {
        const runFirst = `
      window.isNativeApp = true;
      true; // note: this is required, or you'll sometimes get silent failures
    `;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <WebView
                    source={{
                        uri: 'https://github.com/react-native-community/react-native-webview',
                    }}
                    injectedJavaScriptBeforeContentLoaded={runFirst}
                />
            </SafeAreaView>
        );
    }
}
