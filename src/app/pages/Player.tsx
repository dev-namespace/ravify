import { Component } from "react";
import { WebView } from "react-native-webview";

class MyWeb extends Component {
  webview = null;

  render() {
    return (
      <WebView
        ref={(ref) => (this.webview = ref)}
        source={{
          uri: "https://www.chosic.com/playlist-generator/?track=6umKcjGSEcThGs5dcYEnoU",
        }}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    );
  }

  handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    if (!url) return;

    // handle certain doctypes
    if (url.includes(".pdf")) {
      this.webview.stopLoading();
      // open a modal with the PDF viewer
    }

    // one way to handle a successful form submit is via query strings
    if (url.includes("?message=success")) {
      this.webview.stopLoading();
      // maybe close this view?
    }

    // one way to handle errors is via query string
    if (url.includes("?errors=true")) {
      this.webview.stopLoading();
    }

    // redirect somewhere else
    if (url.includes("google.com")) {
      const newURL = "https://reactnative.dev/";
      const redirectTo = 'window.location = "' + newURL + '"';
      this.webview.injectJavaScript(redirectTo);
    }
  };
}
// import { observer } from "mobx-react-lite";
// import React, { useState, useEffect } from "react";
// import { Button, StyleSheet, Text, View } from "react-native";

// function WebPlayback(props) {
//   const [player, setPlayer] = useState(undefined);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://sdk.scdn.co/spotify-player.js";
//     script.async = true;

//     document.body.appendChild(script);

//     (window as any).onSpotifyWebPlaybackSDKReady = () => {
//       const player = new (window as any).Spotify.Player({
//         name: "Web Playback SDK",
//         getOAuthToken: (cb) => {
//           cb(props.token);
//         },
//         volume: 0.5,
//       });

//       setPlayer(player);

//       player.addListener("ready", ({ device_id }) => {
//         console.log("Ready with Device ID", device_id);
//       });

//       player.addListener("not_ready", ({ device_id }) => {
//         console.log("Device ID has gone offline", device_id);
//       });

//       player.connect();
//     };
//   }, []);

//   return <View></View>;
// }

export default MyWeb;
