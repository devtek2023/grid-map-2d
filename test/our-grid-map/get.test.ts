import { describe, it, expect } from '@jest/globals';

import { OurGridMap } from '../../src/grid-map';

describe('`OurGridMap` class', () => {
  it('getBasicCellData', async () => {
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
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(1, 0);
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
  });

  it('getAllColumn', async () => {
    const mapTest = new OurGridMap();
    const cols = 2 + Math.floor(Math.random() * 10);
    const lines = 2 + Math.floor(Math.random() * 10);

    await mapTest.initMap(lines, cols);

    const cells = await mapTest.getAllColumn(1);
    expect(cells.length).toBe(lines);

    expect(cells[0].getX()).toBe(0);
    expect(cells[0].getY()).toBe(1);

    expect(cells[1].getX()).toBe(1);
    expect(cells[1].getY()).toBe(1);
  });

  it('getCellById', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(2, 2);

    const cell1 = await mapTest.getCellByPos(0, 0);

    expect(cell1).toBeDefined();

    if (cell1) {
      const cell2 = await mapTest.getCellById(cell1.getcellId());

      expect(cell1.getcellId()).toBe(cell2?.getcellId());
    }
  });

  it('getCellByPos', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(
      2,
      2,
      [
        {
          data: {
            bar: 'bar',
          },
          x: 1,
          y: 1,
        },
      ],
    );

    const cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
  });

  it('getCellsByIds', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(2, 2);

    const cell1 = await mapTest.getCellByPos(0, 0);
    const cell2 = await mapTest.getCellByPos(0, 1);

    expect(cell1).toBeDefined();
    expect(cell2).toBeDefined();

    if (cell1 && cell2) {
      const cells = await mapTest.getCellsByIds([cell1.getcellId(), cell2.getcellId()]);

      expect(cells.length).toBe(2);
      expect(cells[0].getcellId()).toBe(cell1.getcellId());
      expect(cells[1].getcellId()).toBe(cell2.getcellId());
    }
  });

  it('getCellsByKeyInData', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(
      2,
      2,
      [
        {
          data: {
            bar: 'bar',
          },
          x: 0,
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

    const cells = await mapTest.getCellsByKeyInData('bar');
    expect(cells.length).toBe(2);
  });

  it('getCellsByPositions', async () => {
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
          y: 1,
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

    const cells = await mapTest.getCellsByPositions([{x: 0, y: 1}, {x: 1, y: 1}]);
    
    expect(cells.length).toBe(2);
    expect(cells[0].getData()['foo']).toBe('foo');
    expect(cells[1].getData()['bar']).toBe('bar');
  });

  it('getCellsByValueInData', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(
      2,
      2,
      [
        {
          data: {
            bar: 'bar',
          },
          x: 0,
          y: 0,
        },
        {
          data: {
            foo: 'bar',
          },
          x: 0,
          y: 1,
        },
        {
          data: {
            bar: 'foo',
          },
          x: 1,
          y: 0,
        },
        {
          data: {
            bar: 'foo',
          },
          x: 1,
          y: 1,
        },
      ],
    );

    const cells = await mapTest.getCellsByValueInData('bar', 'foo');
    expect(cells.length).toBe(2);
  });

  it('getRange', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(
      3,
      3,
      [
        {
          data: {
            foo: 'foo',
          },
          x: 1,
          y: 1,
        },
        {
          data: {
            foo: 'foo',
          },
          x: 1,
          y: 2,
        },
        {
          data: {
            foo: 'foo',
          },
          x: 2,
          y: 0,
        },
        {
          data: {
            foo: 'foo',
          },
          x: 2,
          y: 1,
        },
      ],
    );

    const cells = await mapTest.getRange({x: 1, y: 1 }, {x: 2, y: 1 });
    
    expect(cells.length).toBe(4);

    expect(cells[0].getData()['foo']).toBe('foo');
    expect(cells[0].getX()).toBe(1);
    expect(cells[0].getY()).toBe(1);

    expect(cells[1].getData()['foo']).toBe('foo');
    expect(cells[1].getX()).toBe(1);
    expect(cells[1].getY()).toBe(2);

    expect(cells[2].getData()['foo']).toBe('foo');
    expect(cells[2].getX()).toBe(2);
    expect(cells[2].getY()).toBe(0);

    expect(cells[3].getData()['foo']).toBe('foo');
    expect(cells[3].getX()).toBe(2);
    expect(cells[3].getY()).toBe(1);
  });

  it('getDiagonal', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(5, 5);

    let cells = await mapTest.getDiagonal({x:3, y:4}, {x:0, y:1});
    
    expect(cells.length).toBe(4);

    expect(cells[0].getX()).toBe(0);
    expect(cells[0].getY()).toBe(1);

    expect(cells[1].getX()).toBe(1);
    expect(cells[1].getY()).toBe(2);

    expect(cells[2].getX()).toBe(2);
    expect(cells[2].getY()).toBe(3);

    expect(cells[3].getX()).toBe(3);
    expect(cells[3].getY()).toBe(4);

    cells = await mapTest.getDiagonal({x:3, y:4}, {x:0, y:0});
    expect(cells.length).toBe(0);

    cells = await mapTest.getDiagonal({x:0, y:4}, {x:4, y:0});

    expect(cells.length).toBe(5);

    expect(cells[0].getX()).toBe(0);
    expect(cells[0].getY()).toBe(4);

    expect(cells[1].getX()).toBe(1);
    expect(cells[1].getY()).toBe(3);

    expect(cells[2].getX()).toBe(2);
    expect(cells[2].getY()).toBe(2);

    expect(cells[3].getX()).toBe(3);
    expect(cells[3].getY()).toBe(1);

    expect(cells[4].getX()).toBe(4);
    expect(cells[4].getY()).toBe(0);

    cells = await mapTest.getDiagonal({x:0, y:4}, {x:0, y:4});
    expect(cells.length).toBe(0);

    cells = await mapTest.getDiagonal({x:0, y:4}, {x:1, y:4});
    expect(cells.length).toBe(0);

    cells = await mapTest.getDiagonal({x:0, y:4}, {x:0, y:3});
    expect(cells.length).toBe(0);
  });
});