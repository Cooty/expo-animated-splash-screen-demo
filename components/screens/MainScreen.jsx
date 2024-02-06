import { useCallback, useRef } from "react";
import { Platform, View, Button, Text } from "react-native";
import LottieView from "lottie-react-native";
import * as Updates from "expo-updates";

function MainScreen() {
  const animation = useRef(null);
  const onReloadPress = useCallback(() => {
    if (Platform.OS === "web") {
      location.reload();
    } else {
      Updates.reloadAsync();
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "plum",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: 30,
          marginBottom: 15,
          fontWeight: "bold",
        }}
      >
        Pretty Cool!
      </Text>
      <Button title="Run Again" onPress={onReloadPress} />

      <View
        style={{
          marginVertical: 20,
          borderColor: "black",
          borderWidth: 1,
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: "80%",
            maxWidth: 400,
            // height: 200,
            backgroundColor: "white",
          }}
          source={require("../../assets/lottie/netflix.json")}
        />
      </View>
      <Button
        title="Play"
        onPress={() => {
          if (animation.current) {
            animation.current.play();
          }
        }}
      />
    </View>
  );
}

export default MainScreen;
