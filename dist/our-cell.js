"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OurCell = void 0;
const id_gen_1 = require("./id-gen");
/**
 * A `OurCell` contains these follows property: `cellId`, `data`, `x`, `y`.
 *
 * You can access and modify them with their getters and setters.
 */
class OurCell {
    /**
     * Init a cell.
     * @param x Line index
     * @param y Column index
     * @param data Optional data
     */
    constructor(x, y, data = {}) {
        this.cellId = (0, id_gen_1.idGen)();
        this.data = data;
        this.x = x;
        this.y = y;
    }
    getcellId() {
        return this.cellId;
    }
    getData() {
        return this.data;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    resetData() {
        this.data = Object.assign({}, {}, {});
        return this.data;
    }
    setData(data) {
        this.data = Object.assign({}, {}, data);
        return this.data;
    }
    updateData(data) {
        this.data = Object.assign({}, this.data, data);
        return this.data;
    }
}
exports.OurCell = OurCell;
