import { SafeAreaView, StyleSheet,View} from 'react-native';
import React from 'react';
import AnimatedTabs from '@/components/CustomTabs';

export default function AnimatedAccordion() {

  return (
    <SafeAreaView style={styles.safeAreaView}>
    <View style={styles.container}>
        <AnimatedTabs/>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView:{
    flex:1,
    backgroundColor:"#ffffff"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#ffffff"
  },
});
