import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/lib/theme';
import { GridCellComponent } from './grid-cell';
import type { GridCell, GridCriteria } from '@/types';

interface GridBoardProps {
  cells: GridCell[][];
  rows: GridCriteria[];
  columns: GridCriteria[];
  selectedCell: { row: number; col: number } | null;
  onCellPress: (row: number, col: number) => void;
}

export function GridBoard({ cells, rows, columns, selectedCell, onCellPress }: GridBoardProps) {
  return (
    <View style={styles.container}>
      {/* Column headers */}
      <View style={styles.headerRow}>
        <View style={styles.cornerCell} />
        {columns.map((col, i) => (
          <View key={`col-${i}`} style={styles.headerCell}>
            <Text style={styles.headerText} numberOfLines={2}>
              {col.displayText}
            </Text>
          </View>
        ))}
      </View>

      {/* Grid rows */}
      {cells.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.gridRow}>
          {/* Row header */}
          <View style={styles.rowHeaderCell}>
            <Text style={styles.headerText} numberOfLines={2}>
              {rows[rowIndex].displayText}
            </Text>
          </View>

          {/* Grid cells */}
          {row.map((cell, colIndex) => (
            <GridCellComponent
              key={`cell-${rowIndex}-${colIndex}`}
              cell={cell}
              isSelected={
                selectedCell?.row === rowIndex && selectedCell?.col === colIndex
              }
              onPress={() => onCellPress(rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  cornerCell: {
    width: 80,
    marginRight: 2,
  },
  headerCell: {
    flex: 1,
    margin: 2,
    padding: spacing.xs,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
  },
  headerText: {
    color: colors.accent,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
  },
  gridRow: {
    flexDirection: 'row',
  },
  rowHeaderCell: {
    width: 80,
    marginRight: 2,
    padding: spacing.xs,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
