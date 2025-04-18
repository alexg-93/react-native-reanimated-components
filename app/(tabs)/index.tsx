import { SafeAreaView, StyleSheet,View} from 'react-native';
import React from 'react';
import Accordion from '@/components/Accordion';

export default function AnimatedAccordion() {

  return (
    <SafeAreaView style={styles.safeAreaView}>
    <View style={styles.container}>
    <Accordion data={[{title:"Accordion 1",content:"Content for Accordion 1"},{title:"Accordion 2",content:"Content for Accordion 2"},{title:"Accordion 3",content:"Content for Accordion 3"}]}/>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView:{
    flex:1,
    backgroundColor:"#ffffff",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#ffffff"
  },
});
