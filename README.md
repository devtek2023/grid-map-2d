# grid-map-2d

A basic library (TS/JS) that allows to create grids/maps with various useful functions to manipulate them.

- [ Installation ](#installation)
- [ Get started ](#get-started)
    - [ Initialize the grid ](#init-map)
    - [ Display functions ](#display-functions)
- [ Cell ](#cell)
- [ Get data ](#get-data)
    - [ Get the number of columns of the map ](#get-columns)
    - [ Get the number of rows of the map ](#get-lines)
    - [ Get all column cells ](#get-all-column)
    - [ Get all line cells ](#get-all-line)
    - [ Get the map ](#get-map)
    - [ Get a cell by identifier ](#get-cell-by-id)
    - [ Get cells by multiple identifiers ](#get-cell-by-multiple-id)
    - [ Get a cell by `x` and `y` position ](#get-cell-by-pos)
    - [ Get cells by multiple positions ](#get-cell-by-multiple-pos)
    - [ Get a cells by key in `data` ](#get-cell-by-key)
    - [ Get a cells by value in `data` ](#get-cell-by-value)
    - [ Get a diagonal of cells ](#get-diagonal)
    - [ Get a range of cells ](#get-range)
- [ Set and reset data ](#set-data)
    - [ Set all column data ](#set-all-column-data)
    - [ Set all line data ](#set-all-line-data)
    - [ Set the map with new data ](#set-map)
    - [ Set cell data by identifier ](#set-cell-data-by-id)
    - [ Set multiple cells data by identifiers ](#set-multiple-cells-data-by-ids)
    - [ Set cell data by `x` and `y` position ](#set-cell-data-by-pos)
    - [ Set multiple cells data by positions ](#set-multiple-cells-data-by-pos)
    - [ Set or update multiple cells data ](#set-or-update-multiple-cells-data)
- [ Update data ](#update-data)
    - [ Update all column data ](#update-all-column-data)
    - [ Update all line data ](#update-all-line-data)
    - [ Update all map data ](#update-all-map-data)
    - [ Update cell data by identifier ](#update-cell-data-by-id)
    - [ Update multiple cells data by identifiers ](#update-multiple-cells-data-by-ids)
    - [ Update cell data by `x` and `y` position ](#update-cell-data-by-pos)
    - [ Update multiple cells data by positions ](#update-multiple-cells-data-by-pos)


<a id="installation"></a>
## Installation

```sh
# with npm
npm install grid-map-2d
# with yarn
yarn add grid-map-2d
```


<a id="get-started"></a>
## Get started

```ts
import { OurGridMap } from 'grid-map-2d';

const myMap = new OurGridMap();
await myMap.initMap(3, 3);
myMap.printMap();
```

```sh
Map:
________________________________________________________________________________________________
| id: n6YL0LrYx9GMQBM_p6Hw9JqoE | id: bNKJreC5StdWO7mIdnKKOlWZg | id: MO0G1ZJjvQIzN6e7F5GQCvYhA  |
| x: 0                          | x: 0                          | x: 0                           |
| y: 0                          | y: 1                          | y: 2                           |
| data: {}                      | data: {}                      | data: {}                       |
________________________________________________________________________________________________
| id: BfioRp78GWfbW1aHE9X8Ywlsj | id: 2fsK2-r4SLF-q2T6GgDp7lI7q | id: jVgz48XZbpsBj1ENj50lddR_N  |
| x: 1                          | x: 1                          | x: 1                           |
| y: 0                          | y: 1                          | y: 2                           |
| data: {}                      | data: {}                      | data: {}                       |
________________________________________________________________________________________________
| id: ks9jPVDoHZ3wEGnFzEuBOUEWj | id: SywJhTs5KrpF5uU93tJeZBIY5 | id: vKqsZILPaPX1YQ_2IdRhFQ7Zp  |
| x: 2                          | x: 2                          | x: 2                           |
| y: 0                          | y: 1                          | y: 2                           |
| data: {}                      | data: {}                      | data: {}                       |
________________________________________________________________________________________________
```

<a id="init-map"></a>
### Initialize the grid

You can initialize the grid by passing it a number of rows and columns.

```ts
import { OurGridMap } from 'grid-map-2d';

const myMap = new OurGridMap();
await myMap.initMap(3, 3);
```

You can also pass it a array with pre-filled cells as a parameter.

```ts
import { OurGridMap } from 'grid-map-2d';

const myMap = new OurGridMap();
await myMap.initMap(
  3,
  3,
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
myMap.printMap();
```

```sh
Map:
________________________________________________________________________________________________
| id: CJYXjnc7_snlrpdYfU6-LKgWv | id: BYo24dTj4f3dXjInW7hwdX7x1 | id: IOpsY6lhjL6wgkHD8HgE0adFb  |
| x: 0                          | x: 0                          | x: 0                           |
| y: 0                          | y: 1                          | y: 2                           |
| data: {"foo":"foo"}           | data: {}                      | data: {}                       |
________________________________________________________________________________________________
| id: mGSusN_koreYV1cHMa5wXeUa_ | id: gfexjURMBgNvuGN_vL_aaefq3 | id: V1zuzqK_ge6-Dm9gObVMDyG9n  |
| x: 1                          | x: 1                          | x: 1                           |
| y: 0                          | y: 1                          | y: 2                           |
| data: {}                      | data: {"bar":"bar"}           | data: {}                       |
________________________________________________________________________________________________
| id: gOHscmxXUOXYQEiI_0ggkPf74 | id: bDdEcfCoBdE2-gYGHemiihEXR | id: lrWAxOjbhsBdviaa1LxDfq9y8  |
| x: 2                          | x: 2                          | x: 2                           |
| y: 0                          | y: 1                          | y: 2                           |
| data: {}                      | data: {}                      | data: {}                       |
________________________________________________________________________________________________
```

<a id="display-functions"></a>
### Display functions

To help you visualize or debug you can display the map, a row or a column.

```ts
import { OurGridMap } from 'grid-map-2d';

const myMap = new OurGridMap();
await myMap.initMap(3, 3);

await myMap.printMap();
await myMap.printLine(0);
await myMap.printColumn(1);
```

```sh
Map:
________________________________________________________________________________________________
| id: HF3ZbYWZ3I-6Gip70ygwTLd9L | id: IOCBkHC0GuFrb9vlxWbuaDOvP | id: tYThW0VbP6mLpq4VE7GzCT-WF  |
| x: 0                          | x: 0                          | x: 0                           |
| y: 0                          | y: 1                          | y: 2                           |
| data: {}                      | data: {}                      | data: {}                       |
________________________________________________________________________________________________
| id: IC9Y-R6dIrxoOhHhHY8m1z0UE | id: Oi1yYQ-Lw6quYVaQVb7yADBuB | id: UK5CTucLITGabh4aQZd0KFjOi  |
| x: 1                          | x: 1                          | x: 1                           |
| y: 0                          | y: 1                          | y: 2                           |
| data: {}                      | data: {}                      | data: {}                       |
________________________________________________________________________________________________
| id: cSIabX1VXoDOxGqIhX6WH24n4 | id: eQFzx0230CwjuDOt4JblxQ2Cz | id: cRe8ijDdCK62HVQiPPPAa_X1v  |
| x: 2                          | x: 2                          | x: 2                           |
| y: 0                          | y: 1                          | y: 2                           |
| data: {}                      | data: {}                      | data: {}                       |
________________________________________________________________________________________________

Line 0 :
________________________________________________________________________________________________
| id: HF3ZbYWZ3I-6Gip70ygwTLd9L | id: IOCBkHC0GuFrb9vlxWbuaDOvP | id: tYThW0VbP6mLpq4VE7GzCT-WF  |
| x: 0                          | x: 0                          | x: 0                           |
| y: 0                          | y: 1                          | y: 2                           |
| data: {}                      | data: {}                      | data: {}                       |
________________________________________________________________________________________________

Column 1 :
________________________________
| id: IOCBkHC0GuFrb9vlxWbuaDOvP  |
| x: 0                           |
| y: 1                           |
| data: {}                       |
________________________________
| id: Oi1yYQ-Lw6quYVaQVb7yADBuB  |
| x: 1                           |
| y: 1                           |
| data: {}                       |
________________________________
| id: eQFzx0230CwjuDOt4JblxQ2Cz  |
| x: 2                           |
| y: 1                           |
| data: {}                       |
________________________________
```


<a id="cell"></a>
## Cell

The grid consists of several cells (`OurCell` class) which you can manipulate with several functions.

```ts
import { OurGridMap } from 'grid-map-2d';

const myMap = new OurGridMap();
await myMap.initMap(3, 3);

const myCell = await myMap.getCellByPos(0, 0);

// Get cell identifier
myCell.getcellId();

// Get cell data
myCell.getData();

// Get `x` position of the cell
myCell.getX();

// Get `y` position of the cell
myCell.getY();

// Reset cell data
myCell.resetData();

// Set cell data
myCell.setData({foo: 'foo'});

// Update cell data
myCell.updateData({bar: 'bar'});
```


<a id="get-data"></a>
## Get data

You can retrieve cells and other data in different ways.

<a id="get-columns"></a>
### Get the number of columns of the map

You can use `getColumns` to get the numbers of columns.

```ts
import { OurGridMap } from 'grid-map-2d';

const myMap = new OurGridMap();
await myMap.initMap(2, 3);

myMap.getColumns(); // Return 3
```

<a id="get-lines"></a>
### Get the number of rows of the map

You can use `getLines` to get the numbers of rows.

```ts
import { OurGridMap } from 'grid-map-2d';

const myMap = new OurGridMap();
await myMap.initMap(2, 3);

myMap.getLines(); // Return 2
```

<a id="get-all-column"></a>
### Get all column cells

You can use `getAllColumn` to get all column cells.

```ts
// Get all cells of the second column
await myMap.getAllColumn(1);
```

<a id="get-all-line"></a>
### Get all line cells

You can use `getAllLine` to get all row cells.

```ts
// Get all cells of the first row
await myMap.getAllLine(0);
```

<a id="get-map"></a>
### Get the map

You can use `getMap` to get all the map.

```ts
// Get all the map
myMap.getMap();
```

<a id="get-cell-by-id"></a>
### Get a cell by identifier

You can use `getCellById` to get a cell by id.

```ts
const cell = await myMap.getCellById('cell-id');

// `cell` can be undefined if `cell-id` doesn't exist
if (cell) {
  // do something
}
```

<a id="get-cell-by-multiple-id"></a>
### Get cells by multiple identifiers

You can use `getCellsByIds` to get multiple cells by ids.

```ts
// Get an array of `OurCell`
const cells = await myMap.getCellsByIds(['cell-id1', 'cell-id2']);
```

<a id="get-cell-by-pos"></a>
### Get a cell by `x` and `y` position

You can use `getCellByPos` to get a cell by position.

```ts
const cells = await myMap.getCellByPos(0, 0);

// `cell` can be undefined if position doesn't exist
if (cell) {
  // do something
}
```

<a id="get-cell-by-multiple-pos"></a>
### Get cells by multiple positions

You can use `getCellsByPositions` to get multiple cells by positions.

```ts
// Get an array of `OurCell`
const cells = await myMap.getCellsByPositions([{x: 0, y: 0}, {x: 1, y: 0}]);
```

<a id="get-cell-by-key"></a>
### Get a cells by key in `data`

You can use `getCellsByKeyInData` to get a cells by an existing key in data.

```ts
const myMap = new OurGridMap();
await myMap.initMap(
  3,
  3,
  [
    {
      data: {
        foo: 'test',
      },
      x: 0,
      y: 0,
    },
    {
      data: {
        foo: 'test2',
      },
      x: 0,
      y: 1,
    },
    {
      data: {
        bar: 'test3',
      },
      x: 1,
      y: 1,
    },
  ],
);

// Get an array of `OurCell`
const cells = await myMap.getCellsByKeyInData('foo');
```

<a id="get-cell-by-value"></a>
### Get a cells by value in `data`

You can use `getCellsByValueInData` to get a cells by value in an existing key in data.

```ts
const myMap = new OurGridMap();
await myMap.initMap(
  3,
  3,
  [
    {
      data: {
        foo: 'test',
      },
      x: 0,
      y: 0,
    },
    {
      data: {
        foo: 'test2',
      },
      x: 0,
      y: 1,
    },
    {
      data: {
        foo: 'test2',
      },
      x: 1,
      y: 1,
    },
  ],
);

// Get an array of `OurCell`
const cells = await myMap.getCellsByValueInData('foo', 'test2');
```

<a id="get-diagonal"></a>
### Get a diagonal of cells

You can use `getDiagonal` to get a diagonal of cells.

```ts
const myMap = new OurGridMap();
await myMap.initMap(3, 3);

// Get an array of `OurCell` by passing positions of the first and last cell of the diagonal
let cells = await myMap.getDiagonal({x: 0, y: 0}, {x: 2, y: 2});

// Get an array of `OurCell` by passing id of the first and last cell of the diagonal
cells = await myMap.getDiagonal('cell-id1', 'cell-id2');
```

<a id="get-range"></a>
### Get a range of cells

You can use `getRange` to get a range of cells.

```ts
const myMap = new OurGridMap();
await myMap.initMap(3, 3);

// Get an array of `OurCell` by passing positions of the first and last cell of the range
let cells = await myMap.getRange({x: 0, y: 0}, {x: 1, y: 1});

// Get an array of `OurCell` by passing id of the first and last cell of the range
cells = await myMap.getRange('cell-id1', 'cell-id2');
```


<a id="set-data"></a>
## Set and reset data

`set` functions removes all old data and assigns new data.

<a id="set-all-column-data"></a>
### Set all column data

You can use `setAllColumnData` to set a column with the same data.

```ts
// Set the second colum of the map with the same data
// Get an array of `OurCell` with all column cells
const cells = await myMap.setAllColumnData(1, {foo: 'foo'});
```

You can use `resetAllColumnData` to reset a column.

```ts
// Reset data of the second colum of the map
// Get an array of `OurCell` with all column cells
const cells = await myMap.resetAllColumnData(1);
```

<a id="set-all-line-data"></a>
### Set all line data

You can use `setAllLineData` to set a row with the same data.

```ts
// Set the first row of the map with the same data
// Get an array of `OurCell` with all row cells
const cells = await myMap.setAllLineData(0, {foo: 'foo'});
```

You can use `resetAllLineData` to reset a row.

```ts
// Reset data of the first row of the map
// Get an array of `OurCell` with all row cells
const cells = await myMap.resetAllLineData(0);
```

<a id="set-map"></a>
### Set the map with new data

You can use `setAllMapData` to set all map with the same data.

```ts
// Set the map with the same data
// Get the map (`OurMap`)
const maps = await myMap.setAllMapData({foo: 'foo'});
```

You can use `resetAllMapData` to reset all map.

```ts
// Reset the map with
// Get the map (`OurMap`)
const maps = await myMap.resetAllMapData();
```

You can also use `setMap` to set the map by a new map.

```ts
// Set the map by a new map
// Get the map (`OurMap`)
const maps = await myMap.setMap(
  [
    [
      {
        data: {},
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
    ],
    [
      {
        data: {},
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
  ]
);
```

<a id="set-cell-data-by-id"></a>
### Set cell data by identifier

You can use `setCellDataById` to set cell data by id.

```ts
// Set cell data by id
const cell = await myMap.setCellDataById('cell-id', {foo: 'foo'});

// `cell` can be undefined if `cell-id` doesn't exist
if (cell) {
  // do something
}
```

You can use `resetCellDataById` to reset cell data by id.

```ts
// Reset cell data by id
const cell = await myMap.resetCellDataById('cell-id');

// `cell` can be undefined if `cell-id` doesn't exist
if (cell) {
  // do something
}
```

<a id="set-multiple-cells-data-by-ids"></a>
### Set multiple cells data by identifiers

You can use `setMultipleCellsDataByIds` to set with the same data multiple cells data.

```ts
// Set multiple cells data
// Get an array of `OurCell`
const cells = await myMap.setMultipleCellsDataByIds(['cell-id1', 'cell-id2'], {foo: 'foo'});
```

You can use `resetMultipleCellsDataByIds` to reset multiple cells data.

```ts
// Reset multiple cells data
// Get an array of `OurCell`
const cells = await myMap.resetMultipleCellsDataByIds(['cell-id1', 'cell-id2']);
```

<a id="set-cell-data-by-pos"></a>
### Set cell data by `x` and `y` position

You can use `setCellDataByPos` to set cell data by position.

```ts
// Set cell data by position
const cell = await myMap.setCellDataByPos(0, 0, {foo: 'foo'});

// `cell` can be undefined if `cell-id` doesn't exist
if (cell) {
  // do something
}
```

You can use `resetCellDataByPos` to reset cell data by position.

```ts
// Reset cell data by position
const cell = await myMap.resetCellDataByPos(0, 0);

// `cell` can be undefined if `cell-id` doesn't exist
if (cell) {
  // do something
}
```

<a id="set-multiple-cells-data-by-pos"></a>
### Set multiple cells data by positions

You can use `setMultipleCellsDataByPos` to set with the same data multiple cells data.

```ts
// Set multiple cells data
// Get an array of `OurCell`
const cells = await myMap.setMultipleCellsDataByPos([{x: 0, y: 0, x:2, y:0}], {foo: 'foo'});
```

You can use `resetMultipleCellsDataByPos` to reset multiple cells data by positions.

```ts
// Reset multiple cells data
// Get an array of `OurCell`
const cells = await myMap.resetMultipleCellsDataByPos([{x: 0, y: 0, x:2, y:0}]);
```

<a id="set-or-update-multiple-cells-data"></a>
### Set or update multiple cells data

You can use `setOrUpdateMultipleCellsData` to set or update specific cells with for specific data.

```ts
const myMap = new OurGridMap();
await myMap.initMap(
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

// Set specific cells with specific data
// Get an array of `OurCell`
let cells = await mapTest.setOrUpdateMultipleCellsData(
  [
    {x: 0, y: 0, data: {test: 'test'}},
    {cellId: 'cell-id1', data: {test: 'test'}},
  ],
  'set',
);

// Update specific cells with specific data
// Get an array of `OurCell`
cells = await mapTest.setOrUpdateMultipleCellsData(
  [
    {cellId: 'cell-id1', data: {test2: 'test2'}},
    {x: 0, y: 0, data: {test: 'test2'}},
  ],
  'update',
);
```


<a id="update-data"></a>
## Update data

`update` functions can add and update data.


<a id="update-all-column-data"></a>
### Update all column data

You can use `updateAllColumnData` to update a column with the same data.

```ts
// Update the second colum of the map with the same data
// Get an array of `OurCell` with all column cells
const cells = await myMap.updateAllColumnData(1, {foo: 'foo'});
```

<a id="update-all-line-data"></a>
### Update all line data

You can use `updateAllLineData` to update a row with the same data.

```ts
// Update the first row of the map with the same data
// Get an array of `OurCell` with all row cells
const cells = await myMap.updateAllLineData(0, {foo: 'foo'});
```

<a id="update-all-map-data"></a>
### Update all map data

You can use `updateAllMapData` to update the map with the same data.

```ts
// Update the the map with the same data
// Get the map (`OurMap`)
const cells = await myMap.updateAllMapData({foo: 'foo'});
```

<a id="update-cell-data-by-id"></a>
### Update cell data by identifier

You can use `updateCellDataById` to update cell data by id.

```ts
// Update cell data
const cell = await myMap.updateCellDataById('cell-id1', {foo: 'foo'});

// `cell` can be undefined if `cell-id` doesn't exist
if (cell) {
  // do something
}
```

<a id="update-multiple-cells-data-by-ids"></a>
### Update multiple cells data by identifiers

You can use `updateMultipleCellsDataByIds` to update with the same data multiple cells data.

```ts
// Update multiple cells data
// Get an array of `OurCell`
const cells = await myMap.updateMultipleCellsDataByIds(['cell-id1', 'cell-id2'], {foo: 'foo'});
```

<a id="update-cell-data-by-pos"></a>
### Update cell data by `x` and `y` position

You can use `updateCellDataByPos` to update cell data by position.

```ts
// Update cell data
const cell = await myMap.updateCellDataByPos(0, 0, {foo: 'foo'});

// `cell` can be undefined if `cell-id` doesn't exist
if (cell) {
  // do something
}
```

<a id="update-multiple-cells-data-by-pos"></a>
### Update multiple cells data by positions

You can use `updateMultipleCellsDataByPos` to update with the same data multiple cells data.

```ts
// Update multiple cells data
// Get an array of `OurCell`
const cells = await myMap.updateMultipleCellsDataByPos([{x: 0, y: 0}, {x: 1, y: 1}], {foo: 'foo'});
```