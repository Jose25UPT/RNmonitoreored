import React, { useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
// Importamos la función nombrada con llaves
import { startSecurityAudit } from '../services/NetworkScannerService';

const SecurityScannerScreen = () => {
  const [devices, setDevices] = useState([]);

  const handleScan = () => {
    setDevices([]); 
    startSecurityAudit((newDevice) => {
      setDevices(prev => {
        const exists = prev.find(d => d.ip === newDevice.ip);
        if (exists) {
          return prev.map(d => d.ip === newDevice.ip ? {...d, ...newDevice} : d);
        }
        return [...prev, newDevice];
      });
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Iniciar Auditoría de Red" onPress={handleScan} color="#22c55e" />
      <FlatList
        data={devices}
        keyExtractor={(item) => item.ip}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.ip}>IP: {item.ip}</Text>
            <Text style={styles.info}>Fabricante: {item.manufacturer || item.name || 'Desconocido'}</Text>
            <Text style={styles.info}>Puertos Abiertos: {item.ports?.join(', ') || 'Ninguno'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f172a' },
  card: { padding: 15, backgroundColor: '#1e293b', marginBottom: 10, borderRadius: 8 },
  ip: { color: '#22c55e', fontWeight: 'bold', fontSize: 16 },
  info: { color: '#cbd5e1' }
});

// EXPORTACIÓN POR DEFECTO (Vital para evitar el error que tienes)
export default SecurityScannerScreen;
