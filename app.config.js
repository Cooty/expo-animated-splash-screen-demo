export default ({ config }) => ({
  ...config,
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#000000",
  },
  expo: {
    extra: {
      eas: {
        projectId: "bfc681c5-e7cd-458e-bcf4-9fdc45704664",
      },
    },
  },
});
