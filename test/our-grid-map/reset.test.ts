import { describe, it, expect } from '@jest/globals';

import { OurGridMap } from '../../src/grid-map';

describe('`OurGridMap` class', () => {
  it('resetAllColumnData', async () => {
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

    await mapTest.resetAllColumnData(1);

    cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(JSON.stringify(cell?.getData())).toBe('{}');
  });

  it('resetAllLineData', async () => {
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

    await mapTest.resetAllLineData(0);

    cell = await mapTest.getCellByPos(0, 0);
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(0, 1);
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
  });

  it('resetAllMapData', async () => {
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

    await mapTest.resetAllMapData();

    cell = await mapTest.getCellByPos(0, 0);
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(0, 1);
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(1, 0);
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(1, 1);
    expect(JSON.stringify(cell?.getData())).toBe('{}');
  });

  it('resetCellDataById', async () => {
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
        await mapTest.resetCellDataById(cell.getcellId());
    }

    cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(JSON.stringify(cell?.getData())).toBe('{}');
  });

  it('resetCellDataByPos', async () => {
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
        await mapTest.resetCellDataByPos(1, 1);
    }

    cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(JSON.stringify(cell?.getData())).toBe('{}');
  });

  it('resetMultipleCellsDataByIds', async () => {
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
        await mapTest.resetMultipleCellsDataByIds([cell1.getcellId(), cell2.getcellId()]);
    }

    cell = await mapTest.getCellByPos(0, 0);
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(0, 1);
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
  });

  it('resetMultipleCellsDataByPos', async () => {
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

    await mapTest.resetMultipleCellsDataByPos([{x: 0, y: 0}, {x: 0, y: 1}]);

    cell = await mapTest.getCellByPos(0, 0);
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(0, 1);
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
  });
});