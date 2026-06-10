import React from 'react';
import { StyleSheet, View } from 'react-native';

const SIZE = 9;
const CELL = 8;

// Fixed pattern (not a real QR code) used purely for visual mock purposes.
const PATTERN: number[][] = [
  [1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 0],
  [1, 0, 1, 1, 0, 1, 0, 0, 1],
  [0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0],
];

export default function QRCodeMock() {
  return (
    <View style={styles.frame}>
      {PATTERN.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <View
              key={colIndex}
              style={[styles.cell, cell ? styles.cellOn : styles.cellOff]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: SIZE * CELL,
    height: SIZE * CELL,
    backgroundColor: '#ffffff',
    padding: 4,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL,
    height: CELL,
  },
  cellOn: {
    backgroundColor: '#0a1628',
  },
  cellOff: {
    backgroundColor: '#ffffff',
  },
});
