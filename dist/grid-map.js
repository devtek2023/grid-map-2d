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
exports.OurGridMap = void 0;
const helpers_1 = require("./helpers");
const our_cell_1 = require("./our-cell");
/**
 * A `OurGridMap` contains these follows property: `columns`, `lines`, `map`.
 *
 * You can access and modify them with their getters and setters.
 *
 * Use `initMap` to initialize the map.
 */
class OurGridMap {
    getBasicCellData(cells, x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            const cell = cells.filter((cell) => cell.x === x && cell.y === y);
            if (cell.length) {
                return cell[0].data;
            }
            return {};
        });
    }
    /**
     * Predicate if payload is a `Position`
     * @param payload string or `Position`
     * @returns If payload is a `Position`
     */
    isPosition(payload) {
        return payload.x !== undefined;
    }
    /**
     * Get witch cell is the first and last in the map
     * @param cell1 A cell
     * @param cell2 Another cell
     * @returns A tuple of cells with [`first`, `last`]
     */
    whichIsFirst(cell1, cell2) {
        return __awaiter(this, void 0, void 0, function* () {
            const xMin = Math.min(...[cell1.getX(), cell2.getX()]);
            const yMin = Math.min(...[cell1.getY(), cell2.getY()]);
            let starter = [cell1, cell2].filter((cell) => cell.getX() === xMin);
            if (starter.length > 1) {
                starter = [cell1, cell2].filter((cell) => cell.getY() === yMin);
            }
            const finisher = cell1.getcellId() === starter[0].getcellId() ? cell2 : cell1;
            return [starter[0], finisher];
        });
    }
    /**
     * Get all column cells.
     * @param y Column index
     * @returns An array of `OurCell` including all column cells
     */
    getAllColumn(y) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = [];
            for (let x = 0; x < this.lines; x++) {
                const cell = yield this.getCellByPos(x, y);
                cells.push(cell);
            }
            return cells;
        });
    }
    /**
     * Get all line cells.
     * @param x Line index
     * @returns An array of `OurCell` including all line cells
     */
    getAllLine(x) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.map[x];
        });
    }
    /**
     * Get a cell by identifier.
     * @param id Cell identifier
     * @returns A `OurCell` or undefined
     */
    getCellById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let x = 0; x < this.lines; x++) {
                const cell = this.map[x].filter((cell) => cell.getcellId() === id);
                if (cell.length) {
                    return cell[0];
                }
            }
        });
    }
    /**
     * Get a cell by `x` and `y` indexes.
     * @param x Line index
     * @param y Column index
     * @returns A `OurCell` or undefined
     */
    getCellByPos(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            if (x < 0 || x >= this.lines) {
                return;
            }
            const cell = this.map[x].filter((cell) => cell.getY() === y);
            if (cell.length) {
                return cell[0];
            }
        });
    }
    /**
     * Get cells by identifiers.
     * @param ids Array of cell identifiers
     * @returns A `OurCell` array
     */
    getCellsByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = [];
            for (let i = 0; i < ids.length; i++) {
                const cell = yield this.getCellById(ids[i]);
                if (cell) {
                    cells.push(cell);
                }
            }
            return cells;
        });
    }
    /**
     * Get a cells by key in `data`.
     * @param key The key to use in data
     * @returns A `OurCell` or undefined
     */
    getCellsByKeyInData(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let cells = [];
            for (let x = 0; x < this.lines; x++) {
                const cellsFound = this.map[x].filter((cell) => Object.prototype.hasOwnProperty.call(cell.getData(), key));
                if (cellsFound.length) {
                    cells = cells.concat(cellsFound);
                }
            }
            return cells;
        });
    }
    /**
     * Get cells by multiple positions.
     * @param positions Array of multiple positions
     * @returns A `OurCell` array
     */
    getCellsByPositions(positions) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = [];
            for (let i = 0; i < positions.length; i++) {
                const cell = yield this.getCellByPos(positions[i].x, positions[i].y);
                if (cell) {
                    cells.push(cell);
                }
            }
            return cells;
        });
    }
    /**
     * Get a cells by value in `data`.
     * @param key The key to use in data
     * @param value The value of the key
     * @returns A `OurCell` or undefined
     */
    getCellsByValueInData(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let cells = [];
            for (let x = 0; x < this.lines; x++) {
                const cellsFound = this.map[x].filter((cell) => {
                    const tmp = cell.getData();
                    return Object.prototype.hasOwnProperty.call(tmp, key) && tmp[key] === value;
                });
                if (cellsFound.length) {
                    cells = cells.concat(cellsFound);
                }
            }
            return cells;
        });
    }
    /**
     * Get the number of columns of the map.
     * @returns The number of columns
     */
    getColumns() {
        return this.columns;
    }
    /**
     * Get a diagonal of cells.
     * @param start Starter cell identifier or positions
     * @param end Finisher cell identifier or positions
     * @returns Diagonal of cells
     */
    getDiagonal(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = [];
            const cellStart = this.isPosition(start) ? yield this.getCellByPos(start.x, start.y) : yield this.getCellById(start);
            const cellEnd = this.isPosition(end) ? yield this.getCellByPos(end.x, end.y) : yield this.getCellById(end);
            let increaseCol = true;
            if (cellStart && cellEnd) {
                if (cellStart.getcellId() === cellEnd.getcellId()) {
                    return [];
                }
                if (cellStart.getX() === cellEnd.getX() || cellStart.getY() === cellEnd.getY()) {
                    return [];
                }
                const res = yield this.whichIsFirst(cellStart, cellEnd);
                const starter = res[0];
                const finisher = res[1];
                if (finisher.getY() > starter.getY()) {
                    if (finisher.getX() - starter.getX() !== finisher.getY() - starter.getY()) {
                        return [];
                    }
                }
                else {
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
        });
    }
    /**
     * Get the number of lines of the map.
     * @returns The number of lines
     */
    getLines() {
        return this.lines;
    }
    /**
     * Get the map.
     * @returns A `OurMap` object
     */
    getMap() {
        return this.map;
    }
    /**
     * Get a range of cells between two cells (include the two cells).
     * @param start Starter cell identifier or positions
     * @param end Finisher cell identifier or positions
     * @returns Range of cells between two cells (include the two cells)
     */
    getRange(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = [];
            const cellStart = this.isPosition(start) ? yield this.getCellByPos(start.x, start.y) : yield this.getCellById(start);
            const cellEnd = this.isPosition(end) ? yield this.getCellByPos(end.x, end.y) : yield this.getCellById(end);
            if (cellStart && cellEnd) {
                if (cellStart.getcellId() === cellEnd.getcellId()) {
                    return [cellStart];
                }
                const res = yield this.whichIsFirst(cellStart, cellEnd);
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
        });
    }
    /**
     * Initialize the map.
     * @param lines Number of lines of the map
     * @param columns Number of columns of the map
     * @param cells An optional array of `BasicCell` for prefilling cells data
     */
    initMap(lines, columns, cells = []) {
        return __awaiter(this, void 0, void 0, function* () {
            this.lines = lines;
            this.columns = columns;
            this.map = [];
            for (let x = 0; x < lines; x++) {
                this.map.push([]);
                for (let y = 0; y < columns; y++) {
                    const data = yield this.getBasicCellData(cells, x, y);
                    this.map[x].push(new our_cell_1.OurCell(x, y, data));
                }
            }
        });
    }
    /**
     * Print a column.
     * @param y Column index
     */
    printColumn(y) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getAllColumn(y);
            const maxCellSize = yield (0, helpers_1.getMaxCellSize)(cells, this.lines);
            console.log('Column', y, ':');
            yield (0, helpers_1.printColumn)(cells, this.lines, maxCellSize);
            console.log('_'.repeat(maxCellSize));
        });
    }
    /**
     * Print a line.
     * @param x Line index
     */
    printLine(x) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getAllLine(x);
            const maxCellSize = yield (0, helpers_1.getMaxCellSize)(cells, this.columns);
            console.log('Line', x, ':');
            yield (0, helpers_1.printLine)(cells, this.columns, maxCellSize);
            console.log('_'.repeat(maxCellSize * this.columns));
        });
    }
    /**
     * Print a map.
     */
    printMap() {
        return __awaiter(this, void 0, void 0, function* () {
            const map = [];
            const cellSizes = [];
            for (let x = 0; x < this.lines; x++) {
                map.push(yield this.getAllLine(x));
                cellSizes.push(yield (0, helpers_1.getMaxCellSize)(map[x], this.columns));
            }
            const maxCellSize = Math.max(...cellSizes);
            console.log('Map:');
            for (let x = 0; x < map.length; x++) {
                yield (0, helpers_1.printLine)(map[x], this.columns, maxCellSize);
            }
            console.log('_'.repeat(maxCellSize * this.columns));
        });
    }
    /**
     * Reset all column data.
     * @param y Column index
     * @returns An array of `OurCell` including all column cells
     */
    resetAllColumnData(y) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getAllColumn(y);
            for (let i = 0; i < cells.length; i++) {
                cells[i].resetData();
            }
            return cells;
        });
    }
    /**
     * Reset all line data.
     * @param x Line index
     * @returns An array of `OurCell` including all line cells
     */
    resetAllLineData(x) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getAllLine(x);
            for (let i = 0; i < cells.length; i++) {
                cells[i].resetData();
            }
            return cells;
        });
    }
    /**
     * Reset all map data.
     * @returns The map
     */
    resetAllMapData() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let x = 0; x < this.lines; x++) {
                yield this.resetAllLineData(x);
            }
            return this.map;
        });
    }
    /**
     * Reset cell data by identifier.
     * @param id Cell identifier
     * @returns A `OurCell` or undefined
     */
    resetCellDataById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cell = yield this.getCellById(id);
            if (cell) {
                cell.resetData();
                return cell;
            }
        });
    }
    /**
     * Reset cell data by `x` and `y` indexes.
     * @param x Line index
     * @param y Column index
     * @returns A `OurCell` or undefined
     */
    resetCellDataByPos(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            const cell = yield this.getCellByPos(x, y);
            if (cell) {
                cell.resetData();
                return cell;
            }
        });
    }
    /**
     * Reset multiple cells data by identifiers.
     * @param ids Array of cell identifiers
     * @returns An array of `OurCell`
     */
    resetMultipleCellsDataByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getCellsByIds(ids);
            for (let i = 0; i < cells.length; i++) {
                cells[i].resetData();
            }
            return cells;
        });
    }
    /**
     * Reset multiple cells data by positions.
     * @param positions Array of multiple positions
     * @returns An array of `OurCell`
     */
    resetMultipleCellsDataByPos(positions) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getCellsByPositions(positions);
            for (let i = 0; i < cells.length; i++) {
                cells[i].resetData();
            }
            return cells;
        });
    }
    /**
     * Set all column data.
     * @param y Column index
     * @param data Data to set
     * @returns An array of `OurCell` including all column cells
     */
    setAllColumnData(y, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getAllColumn(y);
            for (let i = 0; i < cells.length; i++) {
                cells[i].setData(data);
            }
            return cells;
        });
    }
    /**
     * Set all line data.
     * @param x Line index
     * @param data Data to set
     * @returns An array of `OurCell` including all line cells
     */
    setAllLineData(x, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getAllLine(x);
            for (let i = 0; i < cells.length; i++) {
                cells[i].setData(data);
            }
            return cells;
        });
    }
    /**
     * Set all map data.
     * @param data Data to set
     * @returns The map
     */
    setAllMapData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let x = 0; x < this.lines; x++) {
                yield this.setAllLineData(x, data);
            }
            return this.map;
        });
    }
    /**
     * Set cell data by identifier.
     * @param id Cell identifier
     * @param data Data to set
     * @returns A `OurCell` or undefined
     */
    setCellDataById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cell = yield this.getCellById(id);
            if (cell) {
                cell.setData(data);
                return cell;
            }
        });
    }
    /**
     * Set cell data by `x` and `y` indexes.
     * @param x Line index
     * @param y Column index
     * @param data Data to set
     * @returns A `OurCell` or undefined
     */
    setCellDataByPos(x, y, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cell = yield this.getCellByPos(x, y);
            if (cell) {
                cell.setData(data);
                return cell;
            }
        });
    }
    /**
     * Set the map with new data.
     * @param map A 2D array of `OurCell`.
     * @returns The new map
     */
    setMap(map) {
        return __awaiter(this, void 0, void 0, function* () {
            this.map = map;
            return this.map;
        });
    }
    /**
     * Set multiple cells data by identifiers.
     * @param ids Array of cell identifiers
     * @param data Data to set
     * @returns An array of `OurCell`
     */
    setMultipleCellsDataByIds(ids, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getCellsByIds(ids);
            for (let i = 0; i < cells.length; i++) {
                cells[i].setData(data);
            }
            return cells;
        });
    }
    /**
     * Set multiple cells data by positions.
     * @param positions Array of multiple positions
     * @param data Data to set
     * @returns An array of `OurCell`
     */
    setMultipleCellsDataByPos(positions, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getCellsByPositions(positions);
            for (let i = 0; i < cells.length; i++) {
                cells[i].setData(data);
            }
            return cells;
        });
    }
    /**
     * Set or update multiple cells data.
     * @param payload Array of multiple `BasicCellPayload`
     * @param action `set` or `update`
     * @returns An array of `OurCell` updated
     */
    setOrUpdateMultipleCellsData(payload, action) {
        return __awaiter(this, void 0, void 0, function* () {
            const CELL_FCT = {
                'set': 'setData',
                'update': 'updateData',
            };
            const cells = [];
            for (let i = 0; i < payload.length; i++) {
                if (Object.prototype.hasOwnProperty.call(payload[i], 'cellId')) {
                    const cell = yield this.getCellById(payload[i].cellId);
                    if (cell) {
                        cell[CELL_FCT[action]](payload[i].data);
                        cells.push(cell);
                    }
                }
                else if (Object.prototype.hasOwnProperty.call(payload[i], 'x') &&
                    Object.prototype.hasOwnProperty.call(payload[i], 'y')) {
                    const cell = yield this.getCellByPos(payload[i].x, payload[i].y);
                    if (cell) {
                        cell[CELL_FCT[action]](payload[i].data);
                        cells.push(cell);
                    }
                }
            }
            return cells;
        });
    }
    /**
     * Update all column data.
     * @param y Column index
     * @param data Data to update
     * @returns An array of `OurCell` including all column cells
     */
    updateAllColumnData(y, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getAllColumn(y);
            for (let i = 0; i < cells.length; i++) {
                cells[i].updateData(data);
            }
            return cells;
        });
    }
    /**
     * Update all line data.
     * @param x Line index
     * @param data Data to update
     * @returns An array of `OurCell` including all line cells
     */
    updateAllLineData(x, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getAllLine(x);
            for (let i = 0; i < cells.length; i++) {
                cells[i].updateData(data);
            }
            return cells;
        });
    }
    /**
     * Update all map data.
     * @param data Data to update
     * @returns The map
     */
    updateAllMapData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let x = 0; x < this.lines; x++) {
                yield this.updateAllLineData(x, data);
            }
            return this.map;
        });
    }
    /**
     * Update cell data by identifier.
     * @param id Cell identifier
     * @param data Data to update
     * @returns A `OurCell` or undefined
     */
    updateCellDataById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cell = yield this.getCellById(id);
            if (cell) {
                cell.updateData(data);
                return cell;
            }
        });
    }
    /**
     * Update cell data by `x` and `y` indexes.
     * @param x Line index
     * @param y Column index
     * @param data Data to update
     * @returns A `OurCell` or undefined
     */
    updateCellDataByPos(x, y, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cell = yield this.getCellByPos(x, y);
            if (cell) {
                cell.updateData(data);
                return cell;
            }
        });
    }
    /**
     * Update multiple cells data by identifiers.
     * @param ids Array of cell identifiers
     * @param data Data to update
     * @returns An array of `OurCell`
     */
    updateMultipleCellsDataByIds(ids, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getCellsByIds(ids);
            for (let i = 0; i < cells.length; i++) {
                cells[i].updateData(data);
            }
            return cells;
        });
    }
    /**
     * Update multiple cells data by positions.
     * @param positions Array of multiple positions
     * @param data Data to update
     * @returns An array of `OurCell`
     */
    updateMultipleCellsDataByPos(positions, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cells = yield this.getCellsByPositions(positions);
            for (let i = 0; i < cells.length; i++) {
                cells[i].updateData(data);
            }
            return cells;
        });
    }
}
exports.OurGridMap = OurGridMap;
