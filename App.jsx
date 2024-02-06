import AnimatedAppLoader from "./components/splash-animation/AnimatedAppLoader";
import MainScreen from "./components/screens/MainScreen";

export default function App() {
  return (
    <AnimatedAppLoader>
      <MainScreen />
    </AnimatedAppLoader>
  );
}
