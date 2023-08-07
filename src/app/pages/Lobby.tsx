import { rootStore, useStore } from "app/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, StyleSheet, Text, View } from "react-native";

const LobbyPage = ({ navigation }) => {
  const { auth, spotify } = useStore();
  useEffect(() => {
    auth.fetchCurrentSession();
  }, []);

  console.log("!2 loaded lobby");
  return (
    <View style={styles.container}>
      <Text> Lobby page </Text>
      <Button onPress={() => navigation.navigate("Auth")} title={"Auth page"} />
      <Button
        onPress={() => navigation.navigate("Player")}
        title={"Player page"}
      />
      <Button onPress={() => spotify.getPlaybackState()} title={"getState"} />
      <Button onPress={() => spotify.pause()} title={"pause"} />
      <Button onPress={() => spotify.play()} title={"play"} />
      <Button onPress={() => spotify.getDevices()} title={"devices"} />
      <Button onPress={() => spotify.setDevice()} title={"setdev"} />
      <Text> token: {auth.accessToken} </Text>
      <Text> device: {spotify.deviceId} </Text>
    </View>
  );
};

export default observer(LobbyPage);

// --- styles
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
