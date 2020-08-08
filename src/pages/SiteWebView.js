import React from "react";
import { Text } from "react-native";

import { WebView } from "react-native-webview";

function SiteWebView({ navigation }){
    return(
        <WebView style={{flex: 1}} source={{uri: "https://radiosucessoi.wixsite.com/inicio"}}/>
    );
}

export default SiteWebView;