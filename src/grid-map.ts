import { getMaxCellSize, printColumn, printLine } from "./helpers";
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
export class OurGridMap {
  protected columns: number;
  protected lines: number;
  protected map: OurMap;

  private async getBasicCellData(cells: BasicCell[], x: number, y: number): Promise<object> {
    const cell = cells.filter((cell) => cell.x === x && cell.y === y);

    if (cell.length) {
      return cell[0].data;
    }

    return {};
  }

  /**
   * Predicate if payload is a `Position`
   * @param payload string or `Position`
   * @returns If payload is a `Position`
   */
  private isPosition(payload: string | Position): payload is Position {
    return (payload as Position).x !== undefined;
  }

  /**
   * Get witch cell is the first and last in the map 
   * @param cell1 A cell
   * @param cell2 Another cell
   * @returns A tuple of cells with [`first`, `last`]
   */
  private async whichIsFirst(
    cell1: OurCell,
    cell2: OurCell,
  ): Promise<[OurCell, OurCell]> {
    const xMin = Math.min(...[cell1.getX(), cell2.getX()]);
    const yMin = Math.min(...[cell1.getY(), cell2.getY()]);

    let starter = [cell1, cell2].filter((cell) => cell.getX() === xMin);

    if (starter.length > 1) {
      starter = [cell1, cell2].filter((cell) => cell.getY() === yMin);
    }

    const finisher = cell1.getcellId() === starter[0].getcellId() ? cell2 : cell1;

    return [starter[0], finisher];
  }

  /**
   * Get all column cells.
   * @param y Column index
   * @returns An array of `OurCell` including all column cells
   */
  public async getAllColumn(y: number): Promise<OurCell[]> {
    const cells: OurCell[] = [];

    for (let x = 0; x < this.lines; x++) {
      const cell = await this.getCellByPos(x, y);

      cells.push(cell);
    }

    return cells;
  }

  /**
   * Get all line cells.
   * @param x Line index
   * @returns An array of `OurCell` including all line cells
   */
  public async getAllLine(x: number): Promise<OurCell[]> {
    return this.map[x];
  }

  /**
   * Get a cell by identifier.
   * @param id Cell identifier
   * @returns A `OurCell` or undefined
   */
  public async getCellById(id: string): Promise<OurCell | undefined> {
    for (let x = 0; x < this.lines; x++) {
      const cell = this.map[x].filter((cell) => cell.getcellId() === id);

      if (cell.length) {
        return cell[0];
      }
    }
  }

  /**
   * Get a cell by `x` and `y` indexes.
   * @param x Line index
   * @param y Column index
   * @returns A `OurCell` or undefined
   */
  public async getCellByPos(x: number, y: number): Promise<OurCell | undefined> {
    if (x < 0 || x >= this.lines) {
      return;
    }

    const cell = this.map[x].filter((cell) => cell.getY() === y);

    if (cell.length) {
      return cell[0];
    }
  }

  /**
   * Get cells by identifiers.
   * @param ids Array of cell identifiers
   * @returns A `OurCell` array
   */
  public async getCellsByIds(ids: string[]): Promise<OurCell[]> {
    const cells: OurCell[] = [];

    for (let i = 0; i < ids.length; i++) {
      const cell = await this.getCellById(ids[i]);

      if (cell) {
        cells.push(cell);
      }
    }

    return cells;
  }

  /**
   * Get a cells by key in `data`.
   * @param key The key to use in data
   * @returns A `OurCell` or undefined
   */
  public async getCellsByKeyInData(
    key: string | number,
  ): Promise<OurCell[]> {
    let cells: OurCell[] = [];

    for (let x = 0; x < this.lines; x++) {
      const cellsFound = this.map[x].filter((cell) => Object.prototype.hasOwnProperty.call(cell.getData(), key));

      if (cellsFound.length) {
        cells = cells.concat(cellsFound);
      }
    }

    return cells;
  }

  /**
   * Get cells by multiple positions.
   * @param positions Array of multiple positions
   * @returns A `OurCell` array
   */
  public async getCellsByPositions(positions: Position[]): Promise<OurCell[]> {
    const cells: OurCell[] = [];

    for (let i = 0; i < positions.length; i++) {
      const cell = await this.getCellByPos(positions[i].x, positions[i].y);

      if (cell) {
        cells.push(cell);
      }
    }

    return cells;
  }

  /**
   * Get a cells by value in `data`.
   * @param key The key to use in data
   * @param value The value of the key
   * @returns A `OurCell` or undefined
   */
  public async getCellsByValueInData(
    key: string | number,
    value: string | number | boolean,
  ): Promise<OurCell[]> {
    let cells: OurCell[] = [];

    for (let x = 0; x < this.lines; x++) {
      const cellsFound = this.map[x].filter(
        (cell) => {
          const tmp = cell.getData();
          return Object.prototype.hasOwnProperty.call(tmp, key) && tmp[key] === value;
        }
      );

      if (cellsFound.length) {
        cells = cells.concat(cellsFound);
      }
    }

    return cells;
  }

  /**
   * Get the number of columns of the map.
   * @returns The number of columns
   */
  public getColumns(): number {
    return this.columns;
  }

  /**
   * Get a diagonal of cells.
   * @param start Starter cell identifier or positions
   * @param end Finisher cell identifier or positions
   * @returns Diagonal of cells
   */
  public async getDiagonal(
    start: string | Position,
    end: string | Position,
  ): Promise<OurCell[]> {
    const cells: OurCell[] = [];
    const cellStart = this.isPosition(start) ? await this.getCellByPos(start.x, start.y) : await this.getCellById(start);
    const cellEnd = this.isPosition(end) ? await this.getCellByPos(end.x, end.y) : await this.getCellById(end);
    let increaseCol = true;

    if (cellStart && cellEnd) {
      if (cellStart.getcellId() === cellEnd.getcellId()) {
        return [];
      }

      if (cellStart.getX() === cellEnd.getX() || cellStart.getY() === cellEnd.getY()) {
        return [];
      }

      const res = await this.whichIsFirst(cellStart, cellEnd);
      const starter = res[0];
      const finisher = res[1];

      if (finisher.getY() > starter.getY()) {
        if (finisher.getX() - starter.getX() !== finisher.getY() - starter.getY()) {
          return [];
        }
      } else {
        if (finisher.getX() - starter.getX() !== starter.getY() - finisher.getY()) {
          return [];
        }

        increaseCol = false;
      }

      let x = starter.getX();
      let y = starter.getY();

      while (x !== finisher.getX() && y !== finisher.getY()) {
        cells.push(this.map[x][y]);

        x++;
        y = increaseCol ? y + 1 : y - 1;
      }

      cells.push(this.map[x][y]);
    }

    return cells;
  }

  /**
   * Get the number of lines of the map.
   * @returns The number of lines
   */
  public getLines(): number {
    return this.lines;
  }

  /**
   * Get the map.
   * @returns A `OurMap` object
   */
  public getMap(): OurMap {
    return this.map;
  }

  /**
   * Get a range of cells between two cells (include the two cells).
   * @param start Starter cell identifier or positions
   * @param end Finisher cell identifier or positions
   * @returns Range of cells between two cells (include the two cells)
   */
  public async getRange(
    start: string | Position,
    end: string | Position,
  ): Promise<OurCell[]> {
    const cells: OurCell[] = [];
    const cellStart = this.isPosition(start) ? await this.getCellByPos(start.x, start.y) : await this.getCellById(start);
    const cellEnd = this.isPosition(end) ? await this.getCellByPos(end.x, end.y) : await this.getCellById(end);

    if (cellStart && cellEnd) {
      if (cellStart.getcellId() === cellEnd.getcellId()) {
        return [cellStart];
      }

      const res = await this.whichIsFirst(cellStart, cellEnd);
      const starter = res[0];
      const finisher = res[1];
      let push = false;

      for (let x = 0; x < this.lines; x++) {
        for (let y = 0; y < this.columns; y++) {
          if (x === starter.getX() && y === starter.getY()) {
            push = true;
          }

          if (push) {
            cells.push(this.map[x][y]);
          }

          if (x === finisher.getX() && y === finisher.getY()) {
            return cells;
          }
        }
      }
    }

    return cells;
  }

  /**
   * Initialize the map.
   * @param lines Number of lines of the map
   * @param columns Number of columns of the map
   * @param cells An optional array of `BasicCell` for prefilling cells data
   */
  public async initMap(lines: number, columns: number, cells: BasicCell[] = []): Promise<void> {
    this.lines = lines;
    this.columns = columns;
    this.map = [];

    for (let x = 0; x < lines; x++) {
      this.map.push([]);

      for (let y = 0; y < columns; y++) {
        const data = await this.getBasicCellData(cells, x, y);
        this.map[x].push(new OurCell(x, y, data));
      }  
    }
  }

  /**
   * Print a column.
   * @param y Column index
   */
  public async printColumn(y: number): Promise<void> {
    const cells = await this.getAllColumn(y);
    const maxCellSize = await getMaxCellSize(cells, this.lines);
    
    console.log('Column', y, ':');
    await printColumn(cells, this.lines, maxCellSize);
    console.log('_'.repeat(maxCellSize));
  }

  /**
   * Print a line.
   * @param x Line index
   */
  public async printLine(x: number): Promise<void> {
    const cells = await this.getAllLine(x);
    const maxCellSize = await getMaxCellSize(cells, this.columns);

    console.log('Line', x, ':');
    await printLine(cells, this.columns, maxCellSize);
    console.log('_'.repeat(maxCellSize * this.columns));
  }

  /**
   * Print a map.
   */
  public async printMap(): Promise<void> {
    const map: OurMap = [];
    const cellSizes: number[] = [];

    for (let x = 0; x < this.lines; x++) {
      map.push(await this.getAllLine(x));
      cellSizes.push(await getMaxCellSize(map[x], this.columns));
    }

    const maxCellSize = Math.max(...cellSizes);

    console.log('Map:');

    for (let x = 0; x < map.length; x++) {
      await printLine(map[x], this.columns, maxCellSize);
    }

    console.log('_'.repeat(maxCellSize * this.columns));
  }

  /**
   * Reset all column data.
   * @param y Column index
   * @returns An array of `OurCell` including all column cells
   */
  public async resetAllColumnData(y: number): Promise<OurCell[]> {
    const cells = await this.getAllColumn(y);

    for (let i = 0; i < cells.length; i++) {
      cells[i].resetData();
    }

    return cells;
  }

  /**
   * Reset all line data.
   * @param x Line index
   * @returns An array of `OurCell` including all line cells
   */
  public async resetAllLineData(x: number): Promise<OurCell[]> {
    const cells = await this.getAllLine(x);

    for (let i = 0; i < cells.length; i++) {
      cells[i].resetData();
    }

    return cells;
  }

  /**
   * Reset all map data.
   * @returns The map
   */
  public async resetAllMapData(): Promise<OurMap> {
    for (let x = 0; x < this.lines; x++) {
      await this.resetAllLineData(x);
    }

    return this.map;
  }

  /**
   * Reset cell data by identifier.
   * @param id Cell identifier
   * @returns A `OurCell` or undefined
   */
  public async resetCellDataById(id: string): Promise<OurCell | undefined> {
    const cell = await this.getCellById(id);

    if (cell) {
      cell.resetData();
      return cell;
    }
  }

  /**
   * Reset cell data by `x` and `y` indexes.
   * @param x Line index
   * @param y Column index
   * @returns A `OurCell` or undefined
   */
  public async resetCellDataByPos(x: number, y: number): Promise<OurCell | undefined> {
    const cell = await this.getCellByPos(x, y);

    if (cell) {
      cell.resetData();
      return cell;
    }
  }

  /**
   * Reset multiple cells data by identifiers.
   * @param ids Array of cell identifiers
   * @returns An array of `OurCell`
   */
  public async resetMultipleCellsDataByIds(ids: string[]): Promise<OurCell[]> {
    const cells = await this.getCellsByIds(ids);

    for (let i = 0; i < cells.length; i++) {
      cells[i].resetData();
    }

    return cells;
  }

  /**
   * Reset multiple cells data by positions.
   * @param positions Array of multiple positions
   * @returns An array of `OurCell`
   */
  public async resetMultipleCellsDataByPos(positions: Position[]): Promise<OurCell[]> {
    const cells = await this.getCellsByPositions(positions);

    for (let i = 0; i < cells.length; i++) {
      cells[i].resetData();
    }

    return cells;
  }

  /**
   * Set all column data.
   * @param y Column index
   * @param data Data to set
   * @returns An array of `OurCell` including all column cells
   */
  public async setAllColumnData(y: number, data: object): Promise<OurCell[]> {
    const cells = await this.getAllColumn(y);

    for (let i = 0; i < cells.length; i++) {
      cells[i].setData(data);
    }

    return cells;
  }

  /**
   * Set all line data.
   * @param x Line index
   * @param data Data to set
   * @returns An array of `OurCell` including all line cells
   */
  public async setAllLineData(x: number, data: object): Promise<OurCell[]> {
    const cells = await this.getAllLine(x);

    for (let i = 0; i < cells.length; i++) {
      cells[i].setData(data);
    }

    return cells;
  }

  /**
   * Set all map data.
   * @param data Data to set
   * @returns The map
   */
  public async setAllMapData(data: object): Promise<OurMap> {
    for (let x = 0; x < this.lines; x++) {
      await this.setAllLineData(x, data);
    }

    return this.map;
  }

  /**
   * Set cell data by identifier.
   * @param id Cell identifier
   * @param data Data to set
   * @returns A `OurCell` or undefined
   */
  public async setCellDataById(id: string, data: object): Promise<OurCell | undefined> {
    const cell = await this.getCellById(id);

    if (cell) {
      cell.setData(data);
      return cell;
    }
  }

  /**
   * Set cell data by `x` and `y` indexes.
   * @param x Line index
   * @param y Column index
   * @param data Data to set
   * @returns A `OurCell` or undefined
   */
  public async setCellDataByPos(x: number, y: number, data: object): Promise<OurCell | undefined> {
    const cell = await this.getCellByPos(x, y);

    if (cell) {
      cell.setData(data);
      return cell;
    }
  }

  /**
   * Set the map with new data.
   * @param map A 2D array of `OurCell`.
   * @returns The new map
   */
  public async setMap(map: OurMap): Promise<OurMap> {
    this.map = map;

    return this.map;
  }

  /**
   * Set multiple cells data by identifiers.
   * @param ids Array of cell identifiers
   * @param data Data to set
   * @returns An array of `OurCell`
   */
  public async setMultipleCellsDataByIds(ids: string[], data: object): Promise<OurCell[]> {
    const cells = await this.getCellsByIds(ids);

    for (let i = 0; i < cells.length; i++) {
      cells[i].setData(data);
    }

    return cells;
  }

  /**
   * Set multiple cells data by positions.
   * @param positions Array of multiple positions
   * @param data Data to set
   * @returns An array of `OurCell`
   */
  public async setMultipleCellsDataByPos(positions: Position[], data: object): Promise<OurCell[]> {
    const cells = await this.getCellsByPositions(positions);

    for (let i = 0; i < cells.length; i++) {
      cells[i].setData(data);
    }

    return cells;
  }

  /**
   * Set or update multiple cells data.
   * @param payload Array of multiple `BasicCellPayload`
   * @param action `set` or `update`
   * @returns An array of `OurCell` updated
   */
  public async setOrUpdateMultipleCellsData(
    payload: BasicCellPayload[],
    action: 'set' | 'update',
  ): Promise<OurCell[]> {
    const CELL_FCT = {
      'set': 'setData',
      'update': 'updateData',
    };
    const cells: OurCell[] = [];

    for (let i = 0; i < payload.length; i++) {
      if (Object.prototype.hasOwnProperty.call(payload[i], 'cellId')) {
        const cell = await this.getCellById(payload[i].cellId);

        if (cell) {
          cell[CELL_FCT[action]](payload[i].data);
          cells.push(cell);
        }
      } else if (
        Object.prototype.hasOwnProperty.call(payload[i], 'x') &&
        Object.prototype.hasOwnProperty.call(payload[i], 'y')
      ) {
        const cell = await this.getCellByPos(payload[i].x, payload[i].y);

        if (cell) {
          cell[CELL_FCT[action]](payload[i].data);
          cells.push(cell);
        }
      }
    }

    return cells;
  }

  /**
   * Update all column data.
   * @param y Column index
   * @param data Data to update
   * @returns An array of `OurCell` including all column cells
   */
  public async updateAllColumnData(y: number, data: object): Promise<OurCell[]> {
    const cells = await this.getAllColumn(y);

    for (let i = 0; i < cells.length; i++) {
      cells[i].updateData(data);
    }

    return cells;
  }

  /**
   * Update all line data.
   * @param x Line index
   * @param data Data to update
   * @returns An array of `OurCell` including all line cells
   */
  public async updateAllLineData(x: number, data: object): Promise<OurCell[]> {
    const cells = await this.getAllLine(x);

    for (let i = 0; i < cells.length; i++) {
      cells[i].updateData(data);
    }

    return cells;
  }

  /**
   * Update all map data.
   * @param data Data to update
   * @returns The map
   */
  public async updateAllMapData(data: object): Promise<OurMap> {
    for (let x = 0; x < this.lines; x++) {
      await this.updateAllLineData(x, data);
    }

    return this.map;
  }

  /**
   * Update cell data by identifier.
   * @param id Cell identifier
   * @param data Data to update
   * @returns A `OurCell` or undefined
   */
  public async updateCellDataById(id: string, data: object): Promise<OurCell | undefined> {
    const cell = await this.getCellById(id);

    if (cell) {
      cell.updateData(data);
      return cell;
    }
  }

  /**
   * Update cell data by `x` and `y` indexes.
   * @param x Line index
   * @param y Column index
   * @param data Data to update
   * @returns A `OurCell` or undefined
   */
  public async updateCellDataByPos(x: number, y: number, data: object): Promise<OurCell | undefined> {
    const cell = await this.getCellByPos(x, y);

    if (cell) {
      cell.updateData(data);
      return cell;
    }
  }

  /**
   * Update multiple cells data by identifiers.
   * @param ids Array of cell identifiers
   * @param data Data to update
   * @returns An array of `OurCell`
   */
  public async updateMultipleCellsDataByIds(ids: string[], data: object): Promise<OurCell[]> {
    const cells = await this.getCellsByIds(ids);

    for (let i = 0; i < cells.length; i++) {
      cells[i].updateData(data);
    }

    return cells;
  }

  /**
   * Update multiple cells data by positions.
   * @param positions Array of multiple positions
   * @param data Data to update
   * @returns An array of `OurCell`
   */
  public async updateMultipleCellsDataByPos(positions: Position[], data: object): Promise<OurCell[]> {
    const cells = await this.getCellsByPositions(positions);

    for (let i = 0; i < cells.length; i++) {
      cells[i].updateData(data);
    }

    return cells;
  }
}
