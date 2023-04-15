import { describe, it, expect } from '@jest/globals';

import { OurGridMap } from '../../src/grid-map';

describe('`OurGridMap` class', () => {
  it('initMap', async () => {
    const mapTest = new OurGridMap();
    const cols = 2 + Math.floor(Math.random() * 10);
    const lines = 2 + Math.floor(Math.random() * 10);
    await mapTest.initMap(
      lines,
      cols,
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

    expect(mapTest.getColumns()).toBe(cols);
    expect(mapTest.getLines()).toBe(lines);

    let cell = await mapTest.getCellByPos(0, 0);
    expect(cell?.getData()['foo']).toBe('foo');

    cell = await mapTest.getCellByPos(0, 1);
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(1, 0);
    expect(JSON.stringify(cell?.getData())).toBe('{}');

    cell = await mapTest.getCellByPos(1, 1);
    expect(cell?.getData()['bar']).toBe('bar');
  });
});