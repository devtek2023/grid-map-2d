import { describe, it, expect } from '@jest/globals';

import { OurGridMap } from '../../src/grid-map';

describe('`OurGridMap` class', () => {
  it('updateAllColumnData', async () => {
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

    await mapTest.updateAllColumnData(1, {test: 'test'});

    cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
    expect(cell?.getData()['test']).toBe('test');
  });

  it('updateAllLineData', async () => {
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

    await mapTest.updateAllLineData(0, {test: 'test'});

    cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
  });

  it('updateAllMapData', async () => {
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

    await mapTest.updateAllMapData({test: 'test'});

    cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
    expect(cell?.getData()['test']).toBe('test');
  });

  it('updateCellDataById', async () => {
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
        await mapTest.updateCellDataById(cell.getcellId(), {test: 'test'});
    }

    cell = await mapTest.getCellByPos(0, 0);
    expect(Object.prototype.hasOwnProperty.call(cell?.getData(), 'test')).toBe(false);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
    expect(cell?.getData()['test']).toBe('test');

    await mapTest.setAllMapData({foofoo: ''});
    await mapTest.updateCellDataById(cell?.getcellId() ?? '', { foofoo: 'foofoo' });

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['foofoo']).toBe('');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['foofoo']).toBe('foofoo');
  });

  it('updateCellDataByPos', async () => {
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
        await mapTest.updateCellDataByPos(1, 1, {test: 'test'});
    }

    cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
    expect(cell?.getData()['test']).toBe('test');
  });

  it('updateMultipleCellsDataByIds', async () => {
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
      await mapTest.updateMultipleCellsDataByIds(
        [
          cell1.getcellId(),
          cell2.getcellId(),
        ],
        {test: 'test'},
      );
    }

    cell = await mapTest.getCellByPos(0, 0);
    expect(cell1?.getData()['foo']).toBe('foo');
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell1?.getData()['foo']).toBe('foo');
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
  });

  it('updateMultipleCellsDataByPos', async () => {
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

    await mapTest.updateMultipleCellsDataByPos(
      [
        {x: 0, y: 0},
        {x: 0, y: 1},
      ],
      {test: 'test'}
    );

    cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(0, 1);
    expect(cell?.getData()['foo']).toBe('foo');
    expect(cell?.getData()['test']).toBe('test');

    cell = await mapTest.getCellByPos(1, 0);
    expect(cell?.getData()['bar']).toBe('bar');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
  });
});