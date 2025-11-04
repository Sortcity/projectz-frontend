import carouselData from "@/scripts/carouselData";
import { Marquee } from "@animatereactnative/marquee";
import { Image } from "expo-image";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

// const { width } = Dimensions.get("window");
// const _itemWidth =
//   Platform.OS == "web" ? Math.min(width * 0.5, 500) : width * 0.62;

const { width } = Dimensions.get("window");
let _itemWidth;

if (width <= 400) {
  _itemWidth = width * 0.5;
} else if (width <= 480) {
  // small screens (phones)
  _itemWidth = width * 0.6;
} else if (width <= 1024) {
  // tablets or medium devices
  _itemWidth = width * 0.8;
} else {
  // large screens (desktops)
  _itemWidth = 450;
}
const _itemHeight = _itemWidth * 1.6;

const Slider = () => {
  return (
    <View style={styles.container}>
      <Marquee spacing={16} speed={0.4}>
        <View style={styles.mar}>
          {carouselData.map((item, id) => (
            <View key={id} style={styles.imgCon}>
              {/* <Image source={item.img} style={styles.img} /> */}
              <Image source={item.img} style={styles.img} />

              <View style={styles.txtWrap}>
                <Text style={styles.txt}>{item.title}</Text>
              </View>
              <View style={styles.descWrap}>
                <Text style={styles.desc} numberOfLines={2}>
                  {item.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Marquee>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mar: { flexDirection: "row", gap: 16 },
  imgCon: {
    width: _itemWidth,
    height: _itemHeight,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    marginHorizontal: 8,
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  txtWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(17, 63, 103, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  txt: {
    color: "#fff9deff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  descWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(17, 66, 103, 0.05)",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  desc: {
    color: "#fff9deff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
