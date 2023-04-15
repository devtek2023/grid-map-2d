import { OurCell } from "./our-cell";
/**
 * Get max cell size.
 * @param cells Array of cells
 * @param quantity Number of columns or lines
 * @param minSize Min size of cell
 * @returns Max cell size
 */
export declare const getMaxCellSize: (cells: OurCell[], quantity: number, minSize?: number) => Promise<number>;
/**
 * Print a column of a map.
 * @param cells Array of cells (Use `OurGridMap.getAllColumn()`)
 * @param lines Number of lines
 * @param maxCellSize Max cell size
 */
export declare const printColumn: (cells: OurCell[], lines: number, maxCellSize: number) => Promise<void>;
/**
 * Print a line of a map.
 * @param cells Array of cells (Use `OurGridMap.getAllLine()`)
 * @param columns Number of columns
 * @param maxCellSize Max cell size
 */
export declare const printLine: (cells: OurCell[], columns: number, maxCellSize: number) => Promise<void>;
