import AnimatedSplashScreen from "./AnimatedSplashScreen";

function AnimatedAppLoader({ children }) {
  // Imagine that instead of sleep we have function here that do login, load fonts, pre-load recourses, etc.
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "Some value from storage");
  });
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "Some font");
  });
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "Some API response");
  });

  const loadAllTheStuff = async () =>
    Promise.all([promise1, promise2, promise3]);

  return (
    <AnimatedSplashScreen onPreload={loadAllTheStuff}>
      {children}
    </AnimatedSplashScreen>
  );
}

export default AnimatedAppLoader;
