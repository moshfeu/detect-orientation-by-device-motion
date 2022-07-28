import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { DeviceMotion } from 'expo-sensors';
import { useEffect, useState } from 'react';

export default function App() {
  const [orientation, setOrientation] = useState('protrait');

  // https://github.com/expo/expo/issues/2430#issuecomment-538074235
  function orientationCalculation(gamma: number, beta: number) {
    let ABSOLUTE_GAMMA = Math.abs(gamma);
    let ABSOLUTE_BETA = Math.abs(beta);
    let isGammaNegative = Math.sign(gamma) == -1;
    let orientation = 0;

    if (ABSOLUTE_GAMMA <= 0.04 && ABSOLUTE_BETA <= 0.24) {
      //Portrait mode, on a flat surface.
      orientation = 0;
    } else if (
      (ABSOLUTE_GAMMA <= 1.0 || ABSOLUTE_GAMMA >= 2.3) &&
      ABSOLUTE_BETA >= 0.5
    ) {
      //General Portrait mode, accounting for forward and back tilt on the top of the phone.
      orientation = 0;
    } else {
      if (isGammaNegative) {
        //Landscape mode with the top of the phone to the left.
        orientation = -90;
      } else {
        //Landscape mode with the top of the phone to the right.
        orientation = 90;
      }
    }
    return orientation;
  }

  useEffect(() => {
    DeviceMotion.addListener(({ orientation, rotation }) => {
      setOrientation(
        orientationCalculation(rotation.gamma, rotation.beta) === 0
          ? 'protrait'
          : 'landscape'
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{orientation}</Text>
      <Text>Version: 2.0.0</Text>
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
