import { idGen } from "./id-gen";

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
export class OurCell {
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
  constructor(x: number, y: number, data: object = {}) {
    this.cellId = idGen();
    this.data = data;
    this.x = x;
    this.y = y;
  }

  public getcellId(): string {
    return this.cellId;
  }

  public getData(): object {
    return this.data;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public resetData(): object {
    this.data = Object.assign({}, {}, {});

    return this.data;
  }

  public setData(data: object): object {
    this.data = Object.assign({}, {}, data);

    return this.data;
  }

  public updateData(data: object): object {
    this.data = Object.assign({}, this.data, data);

    return this.data;
  }
}

export interface Position {
  x: number;
  y: number;
}
