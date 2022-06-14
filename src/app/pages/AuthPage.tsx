import { clientId } from "../../config/spotify";
import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useStore } from "app/store";
import { scopes } from "features/auth/config";

// WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export const AuthPage = () => {
  const { auth } = useStore();
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: clientId,
      scopes: scopes,
      usePKCE: false,
      redirectUri: makeRedirectUri({
        // native: "ravify-redirect://",
        useProxy: true,
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      auth.saveAccessToken(access_token);

      console.log("!2 AT", access_token);
    }
  }, [response]);

  return (
    <View>
      <Text> Auth page </Text>
      <Button
        disabled={!request}
        onPress={() => {
          promptAsync({ useProxy: true });
        }}
        title={"Auth"}
      />
    </View>
  );
};
