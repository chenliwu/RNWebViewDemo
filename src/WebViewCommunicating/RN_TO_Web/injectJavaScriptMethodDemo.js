import React, {Component} from 'react';
import {View,SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

const run = `
      document.body.style.backgroundColor = 'blue';
      true;
    `;
/**
 *
 - RN端注入JS脚本到Web端。
 - 前面提到的injectedJavaScript道具的缺点是只能运行一次。
 - 这就是为什么我们还在webview ref上公开了一个称为injectJavaScript的方法（请注意稍有不同的名称！）。
 */
export default class App extends Component {

    /**
     * 运行效果：
     *
     * 页面运行3秒，背景颜色编程了蓝色。这说明this.webref.injectJavaScript(run)方法所注入的JS脚本得到了执行。
     *
     * @returns {*}
     */
    render() {

        setTimeout(() => {
            this.webref.injectJavaScript(run);
        }, 3000);

        return (
            <SafeAreaView style={{flex: 1}}>
                <WebView
                    ref={r => (this.webref = r)}
                    source={{
                        uri: 'https://github.com/react-native-community/react-native-webview',
                    }}
                />
            </SafeAreaView>
        );
    }
}
