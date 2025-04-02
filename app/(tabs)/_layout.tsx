import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';



// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
 

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black'

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Animated Accordion',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown:false
        }}
      />
      <Tabs.Screen
        name="animatedTabs"
        options={{
          title: 'Animated Tabs',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown:false
        }}
      />
    </Tabs>
  );
}
