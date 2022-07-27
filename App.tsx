import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { DeviceMotion } from 'expo-sensors';
import { useEffect, useState } from 'react';

export default function App() {
  const [orientation, setOrientation] = useState('protrait');

  useEffect(() => {
    DeviceMotion.addListener(({rotation}) => {
      const alpha = Math.floor(Math.abs(rotation.alpha));
      setOrientation(alpha === 1 ? 'landscape' : 'protrait');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{orientation}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
