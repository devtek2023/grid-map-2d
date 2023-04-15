import { describe, it, expect } from '@jest/globals';

import { getMaxCellSize } from '../../src/helpers';
import { OurGridMap } from '../../src/grid-map';

describe('Get max cell size', () => {
  it('Default size', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(2, 2);

    const cells = await mapTest.getAllLine(0);
    const quantity = mapTest.getColumns();
    const maxCellSize = await getMaxCellSize(cells, quantity)
  
    expect(maxCellSize).toBe(32);
  });

  it('Dynamic size', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(2, 2);

    const data = {
      test: 'a'.repeat(Math.floor(Math.random() * 50)),
      test2: 'b'.repeat(Math.floor(Math.random() * 10)),
      test3: {
        test4: 'c'.repeat(Math.floor(Math.random() * 20)),
      }
    };
    await mapTest.updateCellDataByPos(0, 0, data);

    const cells = await mapTest.getAllLine(0);
    const quantity = mapTest.getColumns();
    const maxCellSize = await getMaxCellSize(cells, quantity)
  
    expect(maxCellSize).toBe(JSON.stringify(data).length + 8);
  });

  it('Change minimum size', async () => {
    const mapTest = new OurGridMap();
    await mapTest.initMap(2, 2);

    const data = {
      test: 'a'.repeat(Math.floor(Math.random() * 50)),
      test2: 'b'.repeat(Math.floor(Math.random() * 10)),
      test3: {
        test4: 'c'.repeat(Math.floor(Math.random() * 20)),
      }
    };
    await mapTest.updateCellDataByPos(0, 0, data);

    const cells = await mapTest.getAllLine(0);
    const quantity = mapTest.getColumns();
    let maxCellSize = await getMaxCellSize(cells, quantity, 500);
  
    expect(maxCellSize).toBe(500);

    maxCellSize = await getMaxCellSize(cells, quantity, 10);

    expect(maxCellSize).toBe(JSON.stringify(data).length + 8);
  });
});