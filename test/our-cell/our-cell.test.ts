import { describe, it, expect } from '@jest/globals';

import { OurGridMap } from '../../src/grid-map';

describe('`OurCell` class', () => {
  it('Reset data', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(2, 2);

    await mapTest.updateAllMapData({test: 'test'});

    const cell = await mapTest.getCellByPos(0, 0);
  
    expect(cell).toBeDefined();
    expect(cell?.getData()['test']).toBe('test');

    cell?.resetData();

    expect(JSON.stringify(cell?.getData())).toBe('{}');
  });

  it('Set data', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(2, 2);

    await mapTest.updateAllMapData({test: 'test'});

    const cell = await mapTest.getCellByPos(0, 0);
  
    expect(cell).toBeDefined();
    expect(cell?.getData()['test']).toBe('test');

    cell?.setData({test: 'foo'});

    expect(cell?.getData()['test']).toBe('foo');
  });

  it('Update data', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(2, 2);

    await mapTest.updateAllMapData({test: 'test'});

    const cell = await mapTest.getCellByPos(0, 0);
  
    expect(cell).toBeDefined();
    expect(cell?.getData()['test']).toBe('test');

    cell?.updateData({bar: 'bar'});

    expect(cell?.getData()['test']).toBe('test');
    expect(cell?.getData()['bar']).toBe('bar');
  });
});