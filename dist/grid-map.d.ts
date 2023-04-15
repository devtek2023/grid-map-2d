import { OurCell } from "./our-cell";
import type { BasicCell, BasicCellPayload, Position } from "./our-cell";
/**
 * A 2D array of `OurCell`.
 */
export type OurMap = OurCell[][];
/**
 * A `OurGridMap` contains these follows property: `columns`, `lines`, `map`.
 *
 * You can access and modify them with their getters and setters.
 *
 * Use `initMap` to initialize the map.
 */
export declare class OurGridMap {
    protected columns: number;
    protected lines: number;
    protected map: OurMap;
    private getBasicCellData;
    /**
     * Predicate if payload is a `Position`
     * @param payload string or `Position`
     * @returns If payload is a `Position`
     */
    private isPosition;
    /**
     * Get witch cell is the first and last in the map
     * @param cell1 A cell
     * @param cell2 Another cell
     * @returns A tuple of cells with [`first`, `last`]
     */
    private whichIsFirst;
    /**
     * Get all column cells.
     * @param y Column index
     * @returns An array of `OurCell` including all column cells
     */
    getAllColumn(y: number): Promise<OurCell[]>;
    /**
     * Get all line cells.
     * @param x Line index
     * @returns An array of `OurCell` including all line cells
     */
    getAllLine(x: number): Promise<OurCell[]>;
    /**
     * Get a cell by identifier.
     * @param id Cell identifier
     * @returns A `OurCell` or undefined
     */
    getCellById(id: string): Promise<OurCell | undefined>;
    /**
     * Get a cell by `x` and `y` indexes.
     * @param x Line index
     * @param y Column index
     * @returns A `OurCell` or undefined
     */
    getCellByPos(x: number, y: number): Promise<OurCell | undefined>;
    /**
     * Get cells by identifiers.
     * @param ids Array of cell identifiers
     * @returns A `OurCell` array
     */
    getCellsByIds(ids: string[]): Promise<OurCell[]>;
    /**
     * Get a cells by key in `data`.
     * @param key The key to use in data
     * @returns A `OurCell` or undefined
     */
    getCellsByKeyInData(key: string | number): Promise<OurCell[]>;
    /**
     * Get cells by multiple positions.
     * @param positions Array of multiple positions
     * @returns A `OurCell` array
     */
    getCellsByPositions(positions: Position[]): Promise<OurCell[]>;
    /**
     * Get a cells by value in `data`.
     * @param key The key to use in data
     * @param value The value of the key
     * @returns A `OurCell` or undefined
     */
    getCellsByValueInData(key: string | number, value: string | number | boolean): Promise<OurCell[]>;
    /**
     * Get the number of columns of the map.
     * @returns The number of columns
     */
    getColumns(): number;
    /**
     * Get a diagonal of cells.
     * @param start Starter cell identifier or positions
     * @param end Finisher cell identifier or positions
     * @returns Diagonal of cells
     */
    getDiagonal(start: string | Position, end: string | Position): Promise<OurCell[]>;
    /**
     * Get the number of lines of the map.
     * @returns The number of lines
     */
    getLines(): number;
    /**
     * Get the map.
     * @returns A `OurMap` object
     */
    getMap(): OurMap;
    /**
     * Get a range of cells between two cells (include the two cells).
     * @param start Starter cell identifier or positions
     * @param end Finisher cell identifier or positions
     * @returns Range of cells between two cells (include the two cells)
     */
    getRange(start: string | Position, end: string | Position): Promise<OurCell[]>;
    /**
     * Initialize the map.
     * @param lines Number of lines of the map
     * @param columns Number of columns of the map
     * @param cells An optional array of `BasicCell` for prefilling cells data
     */
    initMap(lines: number, columns: number, cells?: BasicCell[]): Promise<void>;
    /**
     * Print a column.
     * @param y Column index
     */
    printColumn(y: number): Promise<void>;
    /**
     * Print a line.
     * @param x Line index
     */
    printLine(x: number): Promise<void>;
    /**
     * Print a map.
     */
    printMap(): Promise<void>;
    /**
     * Reset all column data.
     * @param y Column index
     * @returns An array of `OurCell` including all column cells
     */
    resetAllColumnData(y: number): Promise<OurCell[]>;
    /**
     * Reset all line data.
     * @param x Line index
     * @returns An array of `OurCell` including all line cells
     */
    resetAllLineData(x: number): Promise<OurCell[]>;
    /**
     * Reset all map data.
     * @returns The map
     */
    resetAllMapData(): Promise<OurMap>;
    /**
     * Reset cell data by identifier.
     * @param id Cell identifier
     * @returns A `OurCell` or undefined
     */
    resetCellDataById(id: string): Promise<OurCell | undefined>;
    /**
     * Reset cell data by `x` and `y` indexes.
     * @param x Line index
     * @param y Column index
     * @returns A `OurCell` or undefined
     */
    resetCellDataByPos(x: number, y: number): Promise<OurCell | undefined>;
    /**
     * Reset multiple cells data by identifiers.
     * @param ids Array of cell identifiers
     * @returns An array of `OurCell`
     */
    resetMultipleCellsDataByIds(ids: string[]): Promise<OurCell[]>;
    /**
     * Reset multiple cells data by positions.
     * @param positions Array of multiple positions
     * @returns An array of `OurCell`
     */
    resetMultipleCellsDataByPos(positions: Position[]): Promise<OurCell[]>;
    /**
     * Set all column data.
     * @param y Column index
     * @param data Data to set
     * @returns An array of `OurCell` including all column cells
     */
    setAllColumnData(y: number, data: object): Promise<OurCell[]>;
    /**
     * Set all line data.
     * @param x Line index
     * @param data Data to set
     * @returns An array of `OurCell` including all line cells
     */
    setAllLineData(x: number, data: object): Promise<OurCell[]>;
    /**
     * Set all map data.
     * @param data Data to set
     * @returns The map
     */
    setAllMapData(data: object): Promise<OurMap>;
    /**
     * Set cell data by identifier.
     * @param id Cell identifier
     * @param data Data to set
     * @returns A `OurCell` or undefined
     */
    setCellDataById(id: string, data: object): Promise<OurCell | undefined>;
    /**
     * Set cell data by `x` and `y` indexes.
     * @param x Line index
     * @param y Column index
     * @param data Data to set
     * @returns A `OurCell` or undefined
     */
    setCellDataByPos(x: number, y: number, data: object): Promise<OurCell | undefined>;
    /**
     * Set the map with new data.
     * @param map A 2D array of `OurCell`.
     * @returns The new map
     */
    setMap(map: OurMap): Promise<OurMap>;
    /**
     * Set multiple cells data by identifiers.
     * @param ids Array of cell identifiers
     * @param data Data to set
     * @returns An array of `OurCell`
     */
    setMultipleCellsDataByIds(ids: string[], data: object): Promise<OurCell[]>;
    /**
     * Set multiple cells data by positions.
     * @param positions Array of multiple positions
     * @param data Data to set
     * @returns An array of `OurCell`
     */
    setMultipleCellsDataByPos(positions: Position[], data: object): Promise<OurCell[]>;
    /**
     * Set or update multiple cells data.
     * @param payload Array of multiple `BasicCellPayload`
     * @param action `set` or `update`
     * @returns An array of `OurCell` updated
     */
    setOrUpdateMultipleCellsData(payload: BasicCellPayload[], action: 'set' | 'update'): Promise<OurCell[]>;
    /**
     * Update all column data.
     * @param y Column index
     * @param data Data to update
     * @returns An array of `OurCell` including all column cells
     */
    updateAllColumnData(y: number, data: object): Promise<OurCell[]>;
    /**
     * Update all line data.
     * @param x Line index
     * @param data Data to update
     * @returns An array of `OurCell` including all line cells
     */
    updateAllLineData(x: number, data: object): Promise<OurCell[]>;
    /**
     * Update all map data.
     * @param data Data to update
     * @returns The map
     */
    updateAllMapData(data: object): Promise<OurMap>;
    /**
     * Update cell data by identifier.
     * @param id Cell identifier
     * @param data Data to update
     * @returns A `OurCell` or undefined
     */
    updateCellDataById(id: string, data: object): Promise<OurCell | undefined>;
    /**
     * Update cell data by `x` and `y` indexes.
     * @param x Line index
     * @param y Column index
     * @param data Data to update
     * @returns A `OurCell` or undefined
     */
    updateCellDataByPos(x: number, y: number, data: object): Promise<OurCell | undefined>;
    /**
     * Update multiple cells data by identifiers.
     * @param ids Array of cell identifiers
     * @param data Data to update
     * @returns An array of `OurCell`
     */
    updateMultipleCellsDataByIds(ids: string[], data: object): Promise<OurCell[]>;
    /**
     * Update multiple cells data by positions.
     * @param positions Array of multiple positions
     * @param data Data to update
     * @returns An array of `OurCell`
     */
    updateMultipleCellsDataByPos(positions: Position[], data: object): Promise<OurCell[]>;
}
