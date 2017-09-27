# d3-Graph-Api

Simple graph widget that can be embeded in html. 

It needs 5 parameters to draw graphs **:**
- graphType *i.e.*, type of graph we want to draw.
- graphId *i.e.*, HTML Id where we want to draw the graph.
- graphHeight *i.e.*, Height of the graph.
- graphWidth *i.e.*, Width of the graph.
- jsonData *i.e.*, JSON data, an array of objects with two keys, where *first key* denotes **abcissa** and *second key* denotes **ordinate**.

```javascript
let newGraphLayout = new graphController();
newGraphLayout.createGraph({
  graphType: "Bar",
  garphId: "htmlId",
  graphHeight: "auto",
  graphWidth: "auto",
  jsonData: [{key1: value1, key2: value2}, ...]
});
```
