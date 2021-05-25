import React, { Component } from 'react';
import { View, BackHandler, Platform, } from 'react-native';
import { WebView } from 'react-native-webview';
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  render() {
    if (Platform.OS === 'android') {
      return (
        <View style={{ flex: 1 }}>
          <WebView
            ref={(webView) => { this.webView.ref = webView; }}
            onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
            originWhitelist={['*']}
            automaticallyAdjustContentInsets={false}
            source={{ uri: 'file:///android_asset/index.html' }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
          />
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1 }}>
          <WebView
            ref={(webView) => { this.webView.ref = webView; }}
            onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
            originWhitelist={['*']}
            automaticallyAdjustContentInsets={false}
            source={{ uri: 'Web.bundle/index.html' }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
          />
        </View>
      )
    }
  }

}
