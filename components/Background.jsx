import React, { useEffect } from "react";
import { Platform, View } from "react-native";

export default function Background() {
  useEffect(() => {
    if (Platform.OS === "web") {
      // Inject CSS keyframes once
      if (!document.getElementById("blob-animation-styles")) {
        const style = document.createElement("style");
        style.id = "blob-animation-styles";
        style.innerHTML = `
          @keyframes blobMove1 {
            0% { transform: translate(0px, 0px); }
            25% { transform: translate(80px, -60px); }
            50% { transform: translate(160px, 20px); }
            75% { transform: translate(80px, 40px); }
            100% { transform: translate(0px, 0px); }
          }

          @keyframes blobMove2 {
            0% { transform: translate(0px, 0px); }
            25% { transform: translate(-70px, 50px); }
            50% { transform: translate(-150px, -30px); }
            75% { transform: translate(-80px, 40px); }
            100% { transform: translate(0px, 0px); }
          }

          @keyframes blobMove3 {
            0% { transform: translate(0px, 0px); }
            25% { transform: translate(60px, 70px); }
            50% { transform: translate(100px, -20px); }
            75% { transform: translate(40px, 60px); }
            100% { transform: translate(0px, 0px); }
          }

          @keyframes blobMove4 {
            0% { transform: translate(0px, 0px); }
            25% { transform: translate(-80px, -50px); }
            50% { transform: translate(-120px, 40px); }
            75% { transform: translate(-60px, -20px); }
            100% { transform: translate(0px, 0px); }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, []);

  if (Platform.OS !== "web") {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#1a1a2e",
          zIndex: -1,
        }}
      />
    );
  }

  // For web
  const baseStyle = {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(100px)",
    opacity: 0.6,
    zIndex: -1,
  };

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: -1,
        backgroundColor: "#e9e9ffff",
      }}
    >
      <View
        style={{
          ...baseStyle,
          backgroundColor: "rgba(255, 0, 150, 0.6)",
          width: 400,
          height: 400,
          top: "10%",
          left: "15%",
          animation: "blobMove1 10s ease-in-out infinite",
        }}
      />
      <View
        style={{
          ...baseStyle,
          backgroundColor: "rgba(0, 200, 255, 0.6)",
          width: 350,
          height: 350,
          top: "40%",
          left: "60%",
          animation: "blobMove2 20s ease-in-out infinite",
        }}
      />
      <View
        style={{
          ...baseStyle,
          backgroundColor: "rgba(0, 255, 150, 0.6)",
          width: 450,
          height: 450,
          top: "60%",
          left: "20%",
          animation: "blobMove3 30s ease-in-out infinite",
        }}
      />
      <View
        style={{
          ...baseStyle,
          backgroundColor: "rgba(255, 255, 0, 0.5)",
          width: 300,
          height: 300,
          top: "30%",
          left: "70%",
          animation: "blobMove4 28s ease-in-out infinite",
        }}
      />
    </View>
  );
}
