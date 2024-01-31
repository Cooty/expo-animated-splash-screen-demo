import { useCallback, useEffect, useMemo, useState } from "react";
import Constants from "expo-constants";
import { Animated, StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

function AnimatedSplashScreen({ children, image, onPreload }) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync().then(() => {
        console.log("The default splash screen is hidden at this point");
      });
      // Load stuff
      await onPreload()
        .then((loadedValues) => {
          console.log(loadedValues);
          console.log(
            "now all the stuff we want to has loaded, we are ready to show the app"
          );
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (e) {
      // handle errors
      console.error(e);
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        // This is a 'fake' splash screen that we have more control over
        // we use the same asset as the initial splash screen
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.expoConfig.splash.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.expoConfig.splash.resizeMode || "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

export default AnimatedSplashScreen;
