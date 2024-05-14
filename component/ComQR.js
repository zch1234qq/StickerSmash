import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function ComQR() {
  return (
    <View style={styles.container}>
      <QRCode
        value="https://example.com"  // 这里是你想转换成二维码的信息，例如网址、文本等。
        size={200}                   // 二维码的大小，单位是像素。
        color="black"                // 二维码的颜色。
        backgroundColor="white"      // 二维码的背景色。
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
