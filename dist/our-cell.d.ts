/**
 * You can use this interface with `OurGridMap.initMap()` and initialize an array of cells.
 *
 * This interface contains these follows property: `data`, `x`, `y`.
 */
export interface BasicCell {
    data: object;
    x: number;
    y: number;
}
/**
 * You can use it with `OurGridMap.setOrUpdateMultipleCellsData()`
 *
 * Specified `cellId` or `x and y`
 */
export interface BasicCellPayload {
    cellId?: string;
    data: object;
    x?: number;
    y?: number;
}
/**
 * A `OurCell` contains these follows property: `cellId`, `data`, `x`, `y`.
 *
 * You can access and modify them with their getters and setters.
 */
export declare class OurCell {
    protected cellId: string;
    protected data: object;
    protected x: number;
    protected y: number;
    /**
     * Init a cell.
     * @param x Line index
     * @param y Column index
     * @param data Optional data
     */
    constructor(x: number, y: number, data?: object);
    getcellId(): string;
    getData(): object;
    getX(): number;
    getY(): number;
    resetData(): object;
    setData(data: object): object;
    updateData(data: object): object;
}
export interface Position {
    x: number;
    y: number;
}
