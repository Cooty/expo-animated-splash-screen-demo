import { useEffect, useState, useMemo } from "react";
import { Animated, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Constants from "expo-constants";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

function AnimatedSplashScreen({ children, onPreload }) {
  const exitAnimation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isExitAnimationComplete, setExitAnimationComplete] = useState(false);

  useEffect(() => {
    onPreload()
      .then((loadedValues) => {
        console.log(loadedValues);
        console.log(
          "now all the stuff we want to has loaded, we are ready to show the app"
        );
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setAppReady(true);
      });
  }, []);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(exitAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setExitAnimationComplete(true));
    }
  }, [isAppReady]);

  return (
    <>
      {isAppReady && children}
      {!isExitAnimationComplete && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Constants.expoConfig.splash.backgroundColor,
              opacity: exitAnimation,
            },
          ]}
        >
          <AnimatedLottieView
            autoPlay
            style={{
              width: "80%",
              maxWidth: 400,
              transform: [
                {
                  scale: exitAnimation,
                },
              ],
            }}
            source={require("../../assets/lottie/netflix.json")}
            loop
          />
        </Animated.View>
      )}
    </>
  );
}

export default AnimatedSplashScreen;
