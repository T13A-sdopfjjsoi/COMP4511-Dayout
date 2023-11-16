import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const WelcomeBackground = ({ children }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#9f78f0", "#9d76bb"]}
      style={{ flex: 1 }}>
      {children}
    </LinearGradient>
  );
};

export default WelcomeBackground;
