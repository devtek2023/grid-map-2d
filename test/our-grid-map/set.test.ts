import { describe, it, expect } from '@jest/globals';

import { OurGridMap } from '../../src/grid-map';

describe('`OurGridMap` class', () => {
  it('setAllColumnData', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(
      2,
      2,
      [
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 0,
        },
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 1,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 0,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 1,
        },
      ],
    );

    let cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');

    await mapTest.setAllColumnData(1, {test: 'test'});

    cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'foo')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'bar')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');
  });

  it('setAllLineData', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(
      2,
      2,
      [
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 0,
        },
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 1,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 0,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 1,
        },
      ],
    );

    let cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');

    await mapTest.setAllLineData(0, {test: 'test'});

    cell = await mapTest.getCellByPos(0, 0);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'foo')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(0, 1);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'foo')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
  });

  it('setAllMapData', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(
      2,
      2,
      [
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 0,
        },
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 1,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 0,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 1,
        },
      ],
    );

    let cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');

    await mapTest.setAllMapData({test: 'test'});

    cell = await mapTest.getCellByPos(0, 0);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'foo')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(0, 1);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'foo')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(1, 0);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'bar')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(1, 1);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'bar')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');
  });

  it('setCellDataById', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(
      2,
      2,
      [
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 0,
        },
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 1,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 0,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 1,
        },
      ],
    );

    let cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');

    expect(cell).toBeDefined();
    if (cell) {
        await mapTest.setCellDataById(cell.getcellId(), {test: 'test'});
    }

    cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'bar')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');
  });

  it('setCellDataByPos', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(
      2,
      2,
      [
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 0,
        },
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 1,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 0,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 1,
        },
      ],
    );

    let cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');

    expect(cell).toBeDefined();
    if (cell) {
        await mapTest.setCellDataByPos(1, 1, {test: 'test'});
    }

    cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'bar')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');
  });

  it('setMultipleCellsDataByIds', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(
      2,
      2,
      [
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 0,
        },
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 1,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 0,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 1,
        },
      ],
    );

    const cell1 = await mapTest.getCellByPos(0, 0);
    expect(cell1?.getData()['foo']).toBe('foo');

    const cell2 = await mapTest.getCellByPos(0, 1);
    expect(cell2?.getData()['foo']).toBe('foo');

    let cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');

    expect(cell1).toBeDefined();
    expect(cell2).toBeDefined();
    if (cell1 && cell2) {
      await mapTest.setMultipleCellsDataByIds(
        [
          cell1.getcellId(),
          cell2.getcellId(),
        ],
        {test: 'test'},
      );
    }

    cell = await mapTest.getCellByPos(0, 0);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'foo')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(0, 1);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'foo')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
  });

  it('setMultipleCellsDataByPos', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(
      2,
      2,
      [
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 0,
        },
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 1,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 0,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 1,
        },
      ],
    );

    let cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');

    await mapTest.setMultipleCellsDataByPos(
      [
        {x: 0, y: 0},
        {x: 0, y: 1},
      ],
      {test: 'test'}
    );

    cell = await mapTest.getCellByPos(0, 0);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'foo')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(0, 1);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'foo')).toBe(false);
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
  });

  it('setOrUpdateMultipleCellsData', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(
      2,
      2,
      [
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 0,
        },
        {
          data: {
            foo: 'foo',
          },
          x: 0,
          y: 1,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 0,
        },
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 1,
        },
      ],
    );

    let cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');

    await mapTest.setOrUpdateMultipleCellsData(
      [
        {x: 0, y: 0, data: {test: 'test'}},
      ],
      'set',
    );

    cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['test']).toBe('test');
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'foo')).toBe(false);

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');

    await mapTest.setOrUpdateMultipleCellsData(
      [
        {cellId: cell?.getcellId(), data: {test: 'test'}},
      ],
      'update',
    );

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
    expect(cell?.getData()['test']).toBe('test');
  });
});