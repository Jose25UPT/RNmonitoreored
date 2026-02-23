import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// Importamos el componente por defecto (sin llaves)
import SecurityScannerScreen from './src/screens/SecurityScannerScreen';

export default function App() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const askPermission = async () => {
      if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        setGranted(result === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setGranted(true);
      }
    };
    askPermission();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        {granted ? <SecurityScannerScreen /> : null}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0f172a' }
});
