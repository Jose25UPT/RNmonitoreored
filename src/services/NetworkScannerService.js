// src/services/NetworkScannerService.js
import LanPortScanner from '@johndoenull/react-native-lan-port-scanner';

export const startSecurityAudit = async (onDeviceFound) => {
  try {
    const networkInfo = await LanPortScanner.getNetworkInfo();
    if (!networkInfo.ipAddress) return;

    const subnet = networkInfo.ipAddress.substring(0, networkInfo.ipAddress.lastIndexOf('.'));

    LanPortScanner.startScan({
      ipRange: `${subnet}.0`,
      ports: [21, 22, 80, 443, 8080],
      timeout: 1000,
      onFound: (device) => {
        onDeviceFound({
          ip: device.ip,
          ports: device.ports,
          manufacturer: "Dispositivo Detectado",
        });
      },
    });
  } catch (e) {
    console.error(e);
  }
};
