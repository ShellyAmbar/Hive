import {View, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import createStyles from './multi-slider.styles';
import MuliSliderProps from './interfaces';

const MultiSlider = ({
  sliderWidth,
  min,
  max,
  step,
  onValueChange,
  initialMaxValue,
  initialMinValue,
  primaryColor = '#3F4CF6',
  seconderyColor = '#DFEAFB',
}: MuliSliderProps) => {
  const position = useSharedValue(0);
  const position2 = useSharedValue(sliderWidth);
  const opacity = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const zIndex2 = useSharedValue(0);
  const context = useSharedValue(0);
  const context2 = useSharedValue(0);

  const styles = createStyles({primaryColor, seconderyColor});
  // Using new Gesture API
  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = position.value;
    })
    .onUpdate(e => {
      opacity.value = 1;
      if (context.value + e.translationX < 0) {
        position.value = 0;
      } else if (context.value + e.translationX > position2.value) {
        position.value = position2.value;
        zIndex.value = 1;
        zIndex2.value = 0;
      } else {
        position.value = context.value + e.translationX;
      }
    })
    .onEnd(() => {
      opacity.value = 0;
      runOnJS(onValueChange)({
        min:
          min +
          Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
            step,
        max:
          min +
          Math.floor(position2.value / (sliderWidth / ((max - min) / step))) *
            step,
      });
    });

  const pan2 = Gesture.Pan()
    .onBegin(() => {
      context2.value = position2.value;
    })
    .onUpdate(e => {
      opacity2.value = 1;
      if (context2.value + e.translationX > sliderWidth) {
        position2.value = sliderWidth;
      } else if (context2.value + e.translationX < position.value) {
        position2.value = position.value;
        zIndex.value = 0;
        zIndex2.value = 1;
      } else {
        position2.value = context2.value + e.translationX;
      }
    })
    .onEnd(() => {
      opacity2.value = 0;
      runOnJS(onValueChange)({
        min:
          min +
          Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
            step,
        max:
          min +
          Math.floor(position2.value / (sliderWidth / ((max - min) / step))) *
            step,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}],
    zIndex: zIndex.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{translateX: position2.value}],
    zIndex: zIndex2.value,
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}],
    width: position2.value - position.value,
  }));

  const setStepSize = (max: number, min: number, step: number) => {
    const numberOfSteps = (max - min) / step;
    const stepSize = sliderWidth / numberOfSteps;

    return stepSize;
  };

  useEffect(() => {
    const stepSize = setStepSize(max, min, step);

    position.value = timingPosition(
      ((initialMinValue - min) / step) * stepSize,
    );
    position2.value = timingPosition(
      ((initialMaxValue - min) / step) * stepSize,
    );
  }, []);

  const timingPosition = (toValue: number) => {
    return withTiming(toValue, {
      duration: 500,
    });
  };

  // Add this line for Reanimated from v3.5.0
  Animated.addWhitelistedNativeProps({text: true});
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const minLabelText = useAnimatedProps(() => {
    return {
      text: `${
        min +
        Math.floor(position.value / (sliderWidth / ((max - min) / step))) * step
      }`,
    };
  });
  const maxLabelText = useAnimatedProps(() => {
    return {
      text: `${
        min +
        Math.floor(position2.value / (sliderWidth / ((max - min) / step))) *
          step
      }`,
    };
  });

  return (
    <View style={[styles.sliderContainer, {width: sliderWidth}]}>
      <View style={[styles.sliderBack, {width: sliderWidth}]} />
      <Animated.View style={[sliderStyle, styles.sliderFront]} />
      <GestureDetector gesture={pan}>
        <Animated.View style={[animatedStyle, styles.thumb]}>
          <Animated.View style={[styles.label]}>
            <AnimatedTextInput
              style={styles.labelText}
              animatedProps={minLabelText}
              editable={false}
              defaultValue={`${
                min +
                Math.floor(
                  position.value / (sliderWidth / ((max - min) / step)),
                ) *
                  step
              }`}
            />
          </Animated.View>
          <View style={styles.labelLine} />
        </Animated.View>
      </GestureDetector>
      <GestureDetector gesture={pan2}>
        <Animated.View style={[animatedStyle2, styles.thumb]}>
          <Animated.View style={[styles.label]}>
            <AnimatedTextInput
              style={styles.labelText}
              animatedProps={maxLabelText}
              editable={false}
              defaultValue={`${
                min +
                Math.floor(
                  position2.value / (sliderWidth / ((max - min) / step)),
                ) *
                  step
              }`}
            />
          </Animated.View>
          <View style={styles.labelLine} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default MultiSlider;
