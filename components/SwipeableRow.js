import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.3;

const SwipeableRow = ({ children, onDelete, backgroundColor = "#FF0000" }) => {
  const translateX = useSharedValue(0);
  const rowHeight = useSharedValue(54);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      const newValue = Math.min(0, context.x + event.translationX);
      translateX.value = newValue;
    },
    onEnd: () => {
      const shouldDelete = translateX.value < SWIPE_THRESHOLD;

      if (shouldDelete) {
        translateX.value = withSpring(-SCREEN_WIDTH);
        opacity.value = withSpring(0);
        rowHeight.value = withSpring(0, {}, (finished) => {
          if (finished) {
            runOnJS(onDelete)();
          }
        });
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rContainerStyle = useAnimatedStyle(() => ({
    height: rowHeight.value,
    opacity: opacity.value,
    marginBottom: rowHeight.value === 0 ? 0 : 20,
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = Math.min(1, -translateX.value / SWIPE_THRESHOLD);
    return {
      opacity,
    };
  });

  return (
    <Animated.View style={rContainerStyle}>
      <View style={[styles.deleteBackground, { backgroundColor }]}>
        <Animated.View style={[styles.deleteIcon, rIconContainerStyle]}>
          <View style={styles.iconContainer}>
            {/* You can add your delete icon here */}
          </View>
        </Animated.View>
      </View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={rStyle}>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  deleteBackground: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 5,
  },
  deleteIcon: {
    position: "absolute",
    right: 20,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SwipeableRow;
