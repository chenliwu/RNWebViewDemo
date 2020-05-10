import React, {Component} from 'react';
import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {WebView} from 'react-native-webview';


const html = `
      <html>
      <head></head>
      <style>
      
      </style>
      <body>
      
        <h1>这是H5页面</h1>
        <button onclick="sayHelloToApp()">sayHelloToApp</button>
      
        <script>
            
            function sayHelloToApp(){
                let data = {};
                data.params={
                    msg:'从H5页面发来的消息',
                };
                // 传递事件和数据到APP端
                window.H5AppBridge.sayHello && window.H5AppBridge.sayHello(data);
            }
                     
            // 这里的方法是提供给APP端调用的
            window.sayHello=function(data){
                alert(JSON.stringify(data));        
            }     
          
        </script>
      </body>
      </html>
    `;

/**
 * APP端注入JS脚本到H5端，供H5页面调用。
 * @type {string}
 */
const H5AppBridge = `
    window.H5AppBridge={
        sayHello:function(data){
            let objData = {};
            // 声明事件类型。
            objData.type='sayHello';
            // 传递数据。
            objData.data = data;
            // 这里注意要把data转化为JSON字符串，postMessage()只接受字符串参数。
            window.ReactNativeWebView.postMessage(JSON.stringify(objData));
        }
    };   
    true;
`;

export default class WebviewH5 extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <SafeAreaView style={{flex: 1, paddingTop: 50,}}>

                <TouchableOpacity
                    style={{
                        height: 40,
                        borderRadius: 20,
                        paddingLeft: 15,
                        paddingRight: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#2988ff'
                    }}
                    onPress={() => {
                        const webView = this.refs['webview_ref'];
                        let params = {
                            msg: '这是从RN端传来的消息'
                        };
                        // 注意：APP端传递参数到H5页面，要将对象转为JSON字符串
                        let jsCode = `window.sayHello && window.sayHello(${JSON.stringify(params)});`;
                        // 调用H5端的方法，并传递数据
                        webView.injectJavaScript(jsCode);
                    }}
                >
                    <Text>
                        sayHello
                    </Text>
                </TouchableOpacity>

                <WebView
                    ref={'webview_ref'}
                    source={{html: html}}
                    // 初始化webview注入全局代码
                    injectedJavaScript={H5AppBridge}
                    domStorageEnabled={true}
                    scrollEnabled={true}
                    javaScriptEnabled={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onMessage={event => {
                        this._handleMessage(event);
                    }}
                />
            </SafeAreaView>
        );
    }

    /**
     *
     * @param event
     * @private
     */
    _handleMessage = (event) => {
        console.log("event.nativeEvent", event.nativeEvent);
        const message = event.nativeEvent;
        const webView = this.refs['webview_ref'];
        try {
            let objData = JSON.parse(message.data);
            // let data = JSON.parse(objData.data);
            let data = objData.data;
            console.log("data", data);
            switch (objData.type) {
                case 'sayHello':
                    let params = data.params;
                    if (params) {
                        alert("sayHello:" + params.msg);
                    }
                    break;
            }
        } catch (e) {
            alert("调用APP方法参数错误！参数为：" + message.data);
        }
    };

}
