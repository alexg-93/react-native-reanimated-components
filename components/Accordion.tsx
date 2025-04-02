import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  LayoutChangeEvent,
  FlatList,
} from 'react-native';
import React, { memo } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnUI,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  data?: AccordionItem[];
}

const accordionItems: AccordionItem[] = [
  {
    title: 'Accordion 1',
    content: 'Content for Accordion 1',
  },
  {
    title: 'Accordion 2',
    content: 'Content for Accordion 2',
  },
  {
    title: 'Accordion 3',
    content: 'Content for Accordion 1',
  },
];

const SCREEN_WIDTH = Dimensions.get('window').width;

const AccordionItem = memo(({ title, content }: AccordionItem) => {
  const isOpen = useSharedValue(false);
  const arrowRotation = useSharedValue(0);
  const measuredHeight = useSharedValue(0);

  const animatedArrowStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${arrowRotation.value}deg` }],
  }));

  const animatedAccordionStyle = useAnimatedStyle(() => ({
    height: withTiming(isOpen.value ? measuredHeight.value : 0, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  const toggleAccordion = () => {
    runOnUI(() => {
      'worklet'; // Ensures this runs on the UI thread
      isOpen.value = !isOpen.value;
      arrowRotation.value = withTiming(isOpen.value ? 0 : 180, {
        duration: 400,
        easing: Easing.ease,
      });
    })();
  };

  const onLayout = (event: LayoutChangeEvent) => {
    measuredHeight.value = event.nativeEvent.layout.height;
  };

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={toggleAccordion}
      >
        <View>
          <Text>{title}</Text>
        </View>
        <Animated.View style={animatedArrowStyles}>
          <Ionicons name="chevron-down" size={20} color="black" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[styles.accordionContent, animatedAccordionStyle]}
      >
        <View style={styles.accordionTextContainer} onLayout={onLayout}>
          <Text style={styles.accordionText}>{content}</Text>
        </View>
      </Animated.View>
    </View>
  );
});

const Accordion = ({
  data = accordionItems,
}: AccordionProps) => {
  return (
 
      <FlatList
        data={data}
        renderItem={({ item }) => <AccordionItem {...item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
  
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accordionItem: {
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    overflow: 'hidden',
    marginVertical: 5,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 15,
  },
  accordionContent: {
    backgroundColor: '#E1ECFA',
  },
  accordionTextContainer: {
    position: 'absolute',
    padding: 15,
  },
  accordionText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
});
