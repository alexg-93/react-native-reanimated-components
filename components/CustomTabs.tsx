import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const HORIZONTAL_PADDING = 10; // adjust as needed

interface TabItem {
  id: number;
  name: string;
  selected?: boolean;
}

interface CustomTabsProps {
  tabs: TabItem[];
}

const tabs = [
    {
      id: 0,
      name: 'Light',
    },
    {
      id: 1,
      name: 'Dark',
    },
    {
      id: 3,
      name: 'System',
    },
  ];

const CustomAnimatedTabs = () => {

  const [tabItems] = useState(tabs);
  const [activeTab, setActiveTab] = useState(tabItems[0]);

  // Shared value for indicator translation
  const indicatorTranslateX = useSharedValue(0);

  // Calculate the effective width (container width minus horizontal padding)
  const containerWidth = SCREEN_WIDTH * 0.9;
  const effectiveWidth = containerWidth - HORIZONTAL_PADDING * 2;
  const numTabs = tabItems.length;
  const slotWidth = effectiveWidth / numTabs;

  // Indicator width (can match your tab item width)
  const indicatorWidth = slotWidth;

  // Animated style for indicator
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorTranslateX.value }],
    };
  });

  const handlePress = (tab: TabItem) => {
    setActiveTab(tab);
    const index = tabItems.findIndex(t => t.id === tab.id);
    indicatorTranslateX.value = withTiming(index * slotWidth, { duration: 300 });
};

  return (
    <View style={styles.tabsContainer}>
      {/* Animated indicator */}
      <Animated.View
        style={[
          indicatorStyle,
          {
            position: 'absolute',
            left: HORIZONTAL_PADDING,
            width: indicatorWidth,
            height: '100%',
            borderRadius: 15,
            backgroundColor: '#ffffff',
          },
        ]}
      />
      {tabItems.map((tab, index) => (
        <Animated.View
          key={index}
          style={{
            ...styles.tabItem,
            width: indicatorWidth,
          }}
        >
          <TouchableOpacity onPress={() => handlePress(tab)} style={{ width: '100%' }}>
            <Text style={[styles.tabText, { fontWeight: activeTab.id === tab.id ? '600' : '400' }]}>{tab.name}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

export default CustomAnimatedTabs;

const styles = StyleSheet.create({
  tabsContainer: {
    width: SCREEN_WIDTH * 0.9,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#E3E2DA',
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: 5,
  },
  tabItem: {
    borderRadius: 15,
    justifyContent: 'center',
    height: '100%',
  },
  tabText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});