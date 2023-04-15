import { OurCell } from "./our-cell";

const PRINT_DATA_FCT = {
  0: 'getcellId',
  1: 'getX',
  2: 'getY',
  3: 'getData',
}

const PRINT_LABEL = {
  0: 'id',
  1: 'x',
  2: 'y',
  3: 'data',
}

/**
 * Get max cell size.
 * @param cells Array of cells
 * @param quantity Number of columns or lines
 * @param minSize Min size of cell
 * @returns Max cell size
 */
export const getMaxCellSize = async (
  cells: OurCell[],
  quantity: number,
  minSize = 32,
): Promise<number> => {
  const separatorSize: number[] = [];

  for (let i = 0; i < quantity; i++) {
    const str = JSON.stringify(cells[i].getData());
    const size = str.length + 8;

    separatorSize.push(size > minSize ? size : minSize);
  }

  return Math.max(...separatorSize);
}

/**
 * Print a column of a map.
 * @param cells Array of cells (Use `OurGridMap.getAllColumn()`)
 * @param lines Number of lines
 * @param maxCellSize Max cell size
 */
export const printColumn = async (
  cells: OurCell[],
  lines: number,
  maxCellSize: number,
): Promise<void> => {
  for (let i = 0; i < lines; i++) {
    await printLine([cells[i]], 1, maxCellSize);
  }
}

/**
 * Print a line of a map.
 * @param cells Array of cells (Use `OurGridMap.getAllLine()`)
 * @param columns Number of columns
 * @param maxCellSize Max cell size
 */
export const printLine = async (
  cells: OurCell[],
  columns: number,
  maxCellSize: number,
): Promise<void> => {
  console.log('_'.repeat(maxCellSize * columns));

  for (let i = 0; i < 4; i++) {
    let strLine = '';

    for (let y = 0; y < columns; y++) {
      let data = cells[y][PRINT_DATA_FCT[i]]();

      if (typeof data === 'object') {
        data = JSON.stringify(data);
      } else if (typeof data === 'number') {
        data = data.toString();
      }

      const tmpLine = `| ${PRINT_LABEL[i]}: ${data}` 
      strLine += tmpLine;
      strLine += ' '.repeat(maxCellSize - tmpLine.length);

      if (y === columns - 1) {
        strLine += ' |'
      }
    }

    console.log(strLine);
  }
}