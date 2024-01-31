import { useAssets } from "expo-asset";

import AnimatedSplashScreen from "./AnimatedSplashScreen";

function AnimatedAppLoader({ children }) {
  const [assets, error] = useAssets([require("../assets/splash.png")]);
  // Imagine that instead of sleep we have function here that do login, load fonts, pre-load recourses, etc.
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "Some value from storage");
  });
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "Some font");
  });
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "Some API response");
  });

  const loadAllTheStuff = async () =>
    Promise.all([promise1, promise2, promise3]);

  if (!assets || !assets[0].downloaded || error) {
    return null;
  }

  return (
    <AnimatedSplashScreen image={assets[0]} onPreload={loadAllTheStuff}>
      {children}
    </AnimatedSplashScreen>
  );
}

export default AnimatedAppLoader;
