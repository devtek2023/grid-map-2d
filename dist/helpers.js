"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printLine = exports.printColumn = exports.getMaxCellSize = void 0;
const PRINT_DATA_FCT = {
    0: 'getcellId',
    1: 'getX',
    2: 'getY',
    3: 'getData',
};
const PRINT_LABEL = {
    0: 'id',
    1: 'x',
    2: 'y',
    3: 'data',
};
/**
 * Get max cell size.
 * @param cells Array of cells
 * @param quantity Number of columns or lines
 * @param minSize Min size of cell
 * @returns Max cell size
 */
const getMaxCellSize = (cells, quantity, minSize = 32) => __awaiter(void 0, void 0, void 0, function* () {
    const separatorSize = [];
    for (let i = 0; i < quantity; i++) {
        const str = JSON.stringify(cells[i].getData());
        const size = str.length + 8;
        separatorSize.push(size > minSize ? size : minSize);
    }
    return Math.max(...separatorSize);
});
exports.getMaxCellSize = getMaxCellSize;
/**
 * Print a column of a map.
 * @param cells Array of cells (Use `OurGridMap.getAllColumn()`)
 * @param lines Number of lines
 * @param maxCellSize Max cell size
 */
const printColumn = (cells, lines, maxCellSize) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < lines; i++) {
        yield (0, exports.printLine)([cells[i]], 1, maxCellSize);
    }
});
exports.printColumn = printColumn;
/**
 * Print a line of a map.
 * @param cells Array of cells (Use `OurGridMap.getAllLine()`)
 * @param columns Number of columns
 * @param maxCellSize Max cell size
 */
const printLine = (cells, columns, maxCellSize) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('_'.repeat(maxCellSize * columns));
    for (let i = 0; i < 4; i++) {
        let strLine = '';
        for (let y = 0; y < columns; y++) {
            let data = cells[y][PRINT_DATA_FCT[i]]();
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }
            else if (typeof data === 'number') {
                data = data.toString();
            }
            const tmpLine = `| ${PRINT_LABEL[i]}: ${data}`;
            strLine += tmpLine;
            strLine += ' '.repeat(maxCellSize - tmpLine.length);
            if (y === columns - 1) {
                strLine += ' |';
            }
        }
        console.log(strLine);
    }
});
exports.printLine = printLine;
